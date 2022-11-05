import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useLocation } from 'react-router-dom';
import { Link } from '@mui/material';

function Navigation() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <Container sx={{ mt: 10, display: 'flex', gap: '5px' }}>
      <Typography
        sx={{
          backgroundColor: 'rgba(255,255,255,0)',
          textDecoration: isHome ? 'underline' : 'none',
        }}
        variant="caption"
        display="block"
        p={0}
      >
        {
          isHome ? 'Patients' : (
            <Link href="/" color="inherit" underline="none">Patients</Link>
          )
        }
      </Typography>
      { isHome
      || (
        <>
          <Typography
            sx={{
              backgroundColor: 'rgba(255,255,255,0)',
            }}
            variant="caption"
            display="block"
            p={0}
          >
            {'>'}
          </Typography>
          <Typography
            sx={{
              backgroundColor: 'rgba(255,255,255,0)',
              textDecoration: 'underline',
            }}
            variant="caption"
            display="block"
            p={0}
          >
            {location.pathname.split('/').at(-1)}
          </Typography>
        </>
      )}
    </Container>
  );
}

export default Navigation;
