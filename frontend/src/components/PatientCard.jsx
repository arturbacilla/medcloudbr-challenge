import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Navigation from './Navigation';

export default function PatientCard() {
  return (
    <Box sx={{
      width: { xs: '100%', lg: '90%' },
      maxWidth: '1090px',
      marginInline: 'auto',
    }}
    >
      <Navigation />
      <Paper sx={{
        height: '70vh', width: '100%', mb: 5, mt: 0,
      }}
      />
    </Box>
  );
}
