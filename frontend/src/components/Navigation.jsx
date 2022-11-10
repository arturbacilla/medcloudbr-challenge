import React from 'react';
import Typography from '@mui/material/Typography';
import Home from '@mui/icons-material/Home';
import { Link } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <Box sx={{ mt: 12, bgcolor: 'none' }}>
      <List sx={{
        p: '10px', display: 'flex', gap: '5px', justifyContent: 'flex-start',
      }}
      >
        <ListItem sx={{ p: 0, width: 'fit-content' }}>
          <Typography
            sx={{
              bgcolor: 'none',
              textDecoration: isHome ? 'none' : 'underline',
              fontSize: '1.3rem',
            }}
            variant="caption"
            p={0}
            mb={0}
          >
            {
              isHome ? 'Patients' : (
                <Box sx={{ display: 'flex' }}>
                  <Home fontSize="small" />
                  <Link href="/" color="inherit" underline="none" sx={{ fontSize: '1.3rem' }}>
                    Patients
                  </Link>
                </Box>
              )
            }
          </Typography>
        </ListItem>
        {
          !isHome && (
            <>
              <ListItem sx={{
                p: 0, mb: '3px', width: 'fit-content', fontSize: '1rem',
              }}
              >
                {'>'}
              </ListItem>
              <ListItem sx={{ p: 0, mt: '2px', width: 'fit-content' }}>
                <Typography
                  sx={{
                    bgcolor: 'none',
                    textDecoration: 'none',
                    fontWeight: 800,
                    fontSize: '1rem',
                  }}
                  variant="caption"
                  p={0}
                  mb={0}
                >
                  {location.pathname.split('/').at(-1)}
                </Typography>
              </ListItem>
            </>
          )
        }
      </List>
    </Box>
  );
}

export default Navigation;
