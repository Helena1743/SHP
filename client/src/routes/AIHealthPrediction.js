import ReportTemplate from "../components/ReportTemplate";
import DownloadReportButton from "../components/DownloadReportButton";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ConfirmationDialog from '../components/confirmationDialog';
import Stack from '@mui/material/Stack';
import React, { useState, useEffect } from 'react';

import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const AIHealthPrediction = () => {
  const [reportDates, setReportDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true); // <-- loading state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(true);

  const openBar = () => setOpenSideBar(!openSideBar);

  const fetchReportDates = () => {
    fetch(`${API_BASE}/getHealthDataDates`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        setReportDates(data);
        if (data.length > 0) {
          setSelectedDate(data[0]);
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchReportDates();
  }, []);

  // Fetch report data when selectedDate changes
  useEffect(() => {
    if (!selectedDate) return;

    setLoading(true); // <-- start loading
    fetch(`${API_BASE}/reportData/${selectedDate.healthDataID}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(data => setReportData(data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false)); // <-- stop loading
  }, [selectedDate]);

  const deleteReport = async () => {
    if (!selectedDate) return;

    try {
      await fetch(`${API_BASE}/reportData/${selectedDate.healthDataID}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
    } catch (err) {
      console.log(err);
    }

    fetchReportDates();
    setDeleteDialogOpen(false);
  };

  // Loading / empty state handling
  if (loading) {
    return <h1>Loading Health Prediction Reports...</h1>;
  }

  if (!reportData || reportDates.length === 0) {
    return <h1>User has no Health Prediction Reports</h1>;
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Sidebar */}
      {openSideBar && (
        <Box sx={{ width: { xs: 300, md: 400 }, bgcolor: 'background.paper', borderRight: '1px solid #e0e0e0' }}>
          <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Report History
              </Typography>
              <IconButton aria-label="menu" onClick={openBar}>
                <MenuIcon fontSize="large" />
              </IconButton>
            </Stack>
          </Box>
          <List component="nav" sx={{ p: 0 }}>
            {reportDates.map((item) =>
              <ListItem key={item.id} selected={selectedDate.healthDataID === item.healthDataID}
                onClick={() => setSelectedDate(item)}
                button
                sx={{
                  py: 2,
                  px: 3,
                  borderLeft:
                    selectedDate.healthDataID === item.healthDataID ? '4px solid' : '4px solid transparent',
                  borderLeftColor: 'primary.main',
                  bgcolor: selectedDate.healthDataID === item.healthDataID ? 'action.selected' : 'transparent',
                }}
              >
                <ListItemText
                  primary={`Report: ${new Date(item.date).toLocaleDateString('en-AU')}`}
                  slotProps={{
                    primary: {
                      style: {
                        fontWeight: selectedDate.healthDataID === item.healthDataID ? 600 : 400,
                      },
                    },
                  }}
                />
                {selectedDate.healthDataID === item.healthDataID &&
                  <IconButton aria-label="delete" color="error" onClick={() => setDeleteDialogOpen(true)}>
                    <CloseIcon />
                  </IconButton>
                }
              </ListItem>
            )}
          </List>
        </Box>
      )}

      {/* Menu and Download Buttons */}
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          {!openSideBar && (
            <IconButton aria-label="menu" onClick={openBar}>
              <MenuIcon fontSize="large" />
            </IconButton>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <DownloadReportButton
            healthDataId={selectedDate?.healthDataID}
            flatReportData={reportData}
            meta={{ date: selectedDate?.date, healthDataID: selectedDate?.healthDataID }}
          />
        </Box>

        {/* Report Content */}
        <ReportTemplate report={reportData} date={selectedDate.date} />
      </Box>

      <ConfirmationDialog
        open={deleteDialogOpen}
        title="Delete Report"
        message={
          <>
            This action will permanently delete the selected health report and all related health data.
            Are you sure you want to delete this health report?
          </>
        }
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="error"
        cancelColor="primary"
        confirm={deleteReport}
        cancel={() => setDeleteDialogOpen(false)}
      />
    </Box>
  );
};

export default AIHealthPrediction;
