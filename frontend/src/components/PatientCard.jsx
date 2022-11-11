import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import FaceIcon from '@mui/icons-material/Face';
import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import MapIcon from '@mui/icons-material/Map';
import Calendar from 'react-calendar';
import './Calendar.css';
import Leaflet from 'leaflet';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import Navigation from './Navigation';
import parseResult from '../helpers/parseResult';
import { requestGet } from '../services/api';
import { getGeoFromAddress } from '../services/map';

const DefaultIcon = Leaflet.icon({
  ...Leaflet.Icon.Default.prototype.options,
  iconUrl: icon,
  iconRetinaUrl: iconRetina,
  shadowUrl: iconShadow,
});
Leaflet.Marker.prototype.options.icon = DefaultIcon;

export default function PatientCard() {
  const location = useLocation();
  const patientId = location.pathname.split('/').at(-1);
  const [patient, setPatient] = useState({});
  const [mapsCoords, setMapsCoords] = useState(null);
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
        getGeoFromAddress(data.address).then((coords) => setMapsCoords([coords[1], coords[0]]));
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
          { mapsCoords
          && (
          <MapContainer
            center={mapsCoords}
            zoom={3}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={mapsCoords} />
          </MapContainer>
          )}
        </Box>
        <Box
          sx={{
            width: '100%',
            height: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            boxShadow: '0px -10px 10px -5px rgba(0, 0, 0, 0.4)' }}
        >
          {
            patient
          && (
          <Box sx={{
            width: { xs: '90%', lg: 'fit-content' },
            minWidth: '40%',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px' }}
          >
            <TextField
              id="patient-name"
              size="normal"
              sx={{ width: '100%' }}
              value={patient.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaceIcon />
                  </InputAdornment>
                ),
                readOnly: true,
              }}
              variant="standard"
            />
            <TextField
              id="patient-email"
              size="normal"
              sx={{ width: '100%' }}
              value={patient.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
                readOnly: true,
              }}
              variant="standard"
            />

            <TextField
              id="patient-email"
              size="normal"
              sx={{ width: '100%' }}
              value={patient.address}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MapIcon />
                  </InputAdornment>
                ),
                readOnly: true,
              }}
              variant="standard"
            />
            <TextField
              id="patient-birthdate"
              size="normal"
              sx={{ width: '100%' }}
              value={patient.birthdate}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CakeIcon />
                  </InputAdornment>
                ),
                readOnly: true,
              }}
              variant="standard"
            />
          </Box>
          )
            }
          <Box sx={{ width: '50%', display: { xs: 'none', lg: 'flex' } }}>
            <Calendar
              defaultActiveStartDate={calendarBirth}
              value={calendarBirth}
              calendarType="US"
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
