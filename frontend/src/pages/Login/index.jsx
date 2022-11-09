import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';

import './login.css';
import { Typography } from '@mui/material';

function Login() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  });

  useEffect(() => {
    const { email, password } = values;
    return email.length > 6 && password.length > 2 ? setIsDisabled(false) : setIsDisabled(true);
  }, [values]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container sx={{
      width: '100vw',
      height: '90vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    >
      <Paper
        elevation={3}
        sx={{
          height: { xs: '90%', md: '50%' },
          width: { xs: '90%', md: '50%' },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'center', md: 'space-evenly' },
          justifyContent: { xs: 'space-evenly', md: 'center' },
          gap: '25px',
        }}
      >
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: { xs: '90%', md: '40%' },
          alignItems: 'center',
        }}
        >
          <Box
            component="img"
            sx={{
              height: '5rem',
              width: '15rem',

            }}
            alt="Logo"
            src="https://medcloud.link/svgs/medcloud.svg"
          />
          <Typography variant="caption" textAlign="center" sx={{ width: { xs: '70%', md: '90%' } }}>
            Esta aplicação é uma demonstração desenvolvida por
            <Link href="https://www.linkedin.com/in/arturbacilla/" color="inherit">
              <span> Artur Bacilla</span>
            </Link>
          </Typography>

        </Box>
        <Box sx={{
          width: { xs: '90%', md: '50%' },
          height: { xs: '50%', md: '90%' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-end', minWidth: '80%' }}>
            <Tooltip title="Para esta demonstração use 'admin@admin.com'." placement="top" arrow>
              <Input
                id="email"
                type="text"
                placeholder="Email"
                value={values.email}
                onChange={handleChange('email')}
                startAdornment={(
                  <InputAdornment position="start">
                    <AccountCircle sx={{ color: 'action.active' }} />
                  </InputAdornment>
            )}
                label="Email"
              />
            </Tooltip>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', minWidth: '80%' }}>
            <Tooltip title="Para esta demonstração use 'admin12345'." placement="bottom" arrow>
              <Input
                id="password"
                placeholder="Password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                startAdornment={(
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      sx={{ p: 0 }}
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
            )}
                label="Password"
              />
            </Tooltip>
          </Box>
          <Button variant="contained" size="small" disabled={isDisabled}>Login</Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
