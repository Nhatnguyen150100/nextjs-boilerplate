import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import HomeIcon from '@mui/icons-material/Home';

const NoInternet = () => {
  return (
    <Container className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <WifiOffIcon
        style={{ fontSize: 80, color: '#9ca3af', marginBottom: 16 }}
      />
      <Typography variant="h3" className="mb-4 text-center">
        No Internet Connection
      </Typography>
      <Typography variant="body1" className="mb-8 text-center text-gray-600">
        Please check your network settings and try again.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        href="/"
        startIcon={<HomeIcon />}
      >
        Back to Home
      </Button>
    </Container>
  );
};

export default NoInternet;
