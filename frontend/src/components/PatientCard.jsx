import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Typography } from '@mui/material';
import Navigation from './Navigation';
import parseResult from '../helpers/parseResult';
import { requestGet } from '../services/api';

export default function PatientCard() {
  const location = useLocation();
  const patientId = location.pathname.split('/').at(-1);
  const [patient, setPatient] = useState({});
  const [mapsLink, setMapsLink] = useState('');
  const [calendarBirth, setCalendarBirth] = useState();

  const getBirthDate = (dateString) => {
    const dateParts = dateString.split('/');
    return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
  };

  const fetchPatient = async () => {
    const token = localStorage.getItem('token');
    const patientInfo = await requestGet(`/patients/${patientId}`, token);
    if (!Object.values(patientInfo).some((key) => key === 'AxiosError')) {
      const { body } = parseResult(patientInfo);
      return body;
    }
    return false;
  };

  useEffect(() => {
    fetchPatient().then((data) => {
      if (data) {
        setPatient(data);
        const link = `https://maps.google.com/maps?q=${data.address}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
        setMapsLink(encodeURI(link));
        setCalendarBirth(getBirthDate(data.birthdate));
      }
    });
  }, []);

  return (
    <Box sx={{
      width: { xs: '100%', lg: '90%' },
      maxWidth: '1090px',
      marginInline: 'auto',
    }}
    >
      <Navigation />
      <Paper sx={{ height: '70vh', width: '100%', mb: 5, mt: 0, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{
          height: '50%',
          width: '100%',
          borderBottom: '2px solid black',
        }}
        >
          <CardMedia
            component="iframe"
            image={mapsLink}
            width="100%"
            height="100%"
          />
        </Box>
        <Box
          sx={{
            width: '100%',
            height: '50%',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0px -10px 10px -5px rgba(0, 0, 0, 0.4)' }}
        >
          <Typography>{patient.name}</Typography>
          <Calendar
            defaultActiveStartDate={calendarBirth}
            value={calendarBirth}
            calendarType="US"
          />
        </Box>
      </Paper>
    </Box>
  );
}
