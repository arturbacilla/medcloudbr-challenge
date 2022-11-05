import React, {
  Routes, Route, Navigate, BrowserRouter,
} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import themeOptions from './theme/themeOptions';
import Home from './pages/Home';
import Login from './pages/Login';
import Patient from './pages/Patient';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={themeOptions}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/patient" element={<Navigate replace to="/" />} />
          <Route path="/patient/:id" element={<Patient />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
