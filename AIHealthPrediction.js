import React, { useState, useEffect } from 'react';
import ReportTemplate from "../components/ReportTemplate";
import DownloadReportButton from "../components/DownloadReportButton";
import ConfirmationDialog from '../components/confirmationDialog';
import TopNav from '../components/TopNav';

import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

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
  const [selectedDate, setSelectedDate] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(true);

  const toggleSidebar = () => setOpenSideBar(prev => !prev);

  const fetchReportDates = () => {
    fetch(`${API_BASE}/getHealthDataDates`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setReportDates(data);
        if (data.length > 0 && !selectedDate) {
          setSelectedDate(data[0]);
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchReportDates();
  }, []);

  useEffect(() => {
    if (!selectedDate) return;

    fetch(`${API_BASE}/reportData/${selectedDate.healthDataID}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setReportData(data))
      .catch(err => console.log(err));
  }, [selectedDate]);

  const deleteReport = async () => {
    if (!selectedDate) return;

    try {
      await fetch(`${API_BASE}/reportData/${selectedDate.healthDataID}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: 'include'
      });

      setReportData(null);
      setSelectedDate(null);
      fetchReportDates();
    } catch (err) {
      console.log(err);
    }

    setDeleteDialogOpen(false);
  };

  /* ---------- EMPTY / LOADING STATE ---------- */
  if (reportDates.length === 0 || !reportData) {
    return (
      <>
        <TopNav />
        <Box
          sx={{
            minHeight: '100vh',
            pt: '90px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'background.default',
          }}
        >
          <Typography variant="h4" color="text.secondary">
            {reportDates.length === 0
              ? 'User has no Health Prediction Reports'
              : 'Loading report...'}
          </Typography>
        </Box>
      </>
    );
  }

  /* ---------- MAIN PAGE ---------- */
  return (
    <>
      {/* TOP NAV WITH DOWNLOAD */}
      <TopNav
        rightAction={
          <DownloadReportButton
            healthDataId={selectedDate?.healthDataID}
            flatReportData={reportData}
            meta={{
              date: selectedDate?.date,
              healthDataID: selectedDate?.healthDataID,
            }}
          />
        }
      />

      {/* PAGE BODY */}
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          bgcolor: 'background.default',
          pt: '90px', // space for fixed TopNav
        }}
      >
        {/* SIDEBAR */}
        {openSideBar && (
          <Box
            sx={{
              width: { xs: 300, md: 400 },
              bgcolor: 'background.paper',
              borderRight: '1px solid #e0e0e0',
            }}
          >
            <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Report History
                </Typography>
                <IconButton onClick={toggleSidebar}>
                  <MenuIcon fontSize="large" />
                </IconButton>
              </Stack>
            </Box>

            <List component="nav" sx={{ p: 0 }}>
              {reportDates.map(item => (
                <ListItem
                  key={item.healthDataID || item.id}
                  selected={selectedDate.healthDataID === item.healthDataID}
                  onClick={() => setSelectedDate(item)}
                  button
                  sx={{
                    py: 2,
                    px: 3,
                    borderLeft:
                      selectedDate.healthDataID === item.healthDataID
                        ? '4px solid'
                        : '4px solid transparent',
                    borderLeftColor: 'primary.main',
                    bgcolor:
                      selectedDate.healthDataID === item.healthDataID
                        ? 'action.selected'
                        : 'transparent',
                  }}
                >
                  <ListItemText
                    primary={`Report: ${new Date(item.date).toLocaleDateString('en-AU')}`}
                    primaryTypographyProps={{
                      fontWeight:
                        selectedDate.healthDataID === item.healthDataID ? 600 : 400,
                    }}
                  />

                  {selectedDate.healthDataID === item.healthDataID && (
                    <IconButton
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  )}
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* MAIN CONTENT */}
        <Box sx={{ flex: 1, p: 3 }}>
          {!openSideBar && (
            <IconButton onClick={toggleSidebar} sx={{ mb: 2 }}>
              <MenuIcon fontSize="large" />
            </IconButton>
          )}

          <ReportTemplate
            report={reportData}
            date={selectedDate.date}
          />
        </Box>
      </Box>

      {/* DELETE CONFIRMATION */}
      <ConfirmationDialog
        open={deleteDialogOpen}
        title="Delete Report"
        message="This action will permanently delete the selected health report and all related health data. Are you sure?"
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="error"
        cancelColor="primary"
        confirm={deleteReport}
        cancel={() => setDeleteDialogOpen(false)}
      />
    </>
  );
};

export default AIHealthPrediction;
