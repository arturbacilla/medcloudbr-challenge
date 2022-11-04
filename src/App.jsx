import React, {
  Routes, Route, Navigate, BrowserRouter,
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Patient from './pages/Patient';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
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
  );
}

export default App;
