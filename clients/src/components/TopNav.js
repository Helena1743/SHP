import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Stack } from '@mui/material';

const TopNav = ({ rightAction }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '70px',
        bgcolor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 4,                      // normal container padding
        zIndex: 1200,
        borderBottom: '1px solid rgba(224, 224, 224, 0.6)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      }}
    >
      {/* LEFT SIDE (reserved for future use) */}
      <Box />

      {/* RIGHT ACTIONS */}
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{
          mr: 4,                   // ✅ THIS pulls buttons away from scrollbar
        }}
      >
        {/* Optional page-specific action (Download) */}
        {rightAction}

        <Button
          variant="contained"
          onClick={() => navigate(-1)}
          sx={{
            bgcolor: '#00796b',
            color: 'white',
            fontWeight: 'bold',
            minWidth: 110,
            textTransform: 'none',
            '&:hover': {
              bgcolor: '#004d40',
            },
          }}
        >
          BACK
        </Button>

        <Button
          variant="contained"
          onClick={() => navigate('/user-landing')}
          sx={{
            bgcolor: '#9c27b0',
            color: 'white',
            fontWeight: 'bold',
            minWidth: 110,
            textTransform: 'none',
            '&:hover': {
              bgcolor: '#7b1fa2',
            },
          }}
        >
          HOME
        </Button>
      </Stack>
    </Box>
  );
};

export default TopNav;

