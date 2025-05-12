'use client';
import HomeIcon from '@mui/icons-material/Home';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import { Button, Container, Typography } from '@mui/material';
import React from 'react';

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
