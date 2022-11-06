import React, { useContext } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import FiberNewOutlinedIcon from '@mui/icons-material/FiberNewOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined';
import IconButton from '@mui/material/IconButton';
import headCells from './PatientsTable/structure';
import PatientsContext from '../context/PatientsContext';

function NewPatientRow() {
  const { setIsAddingNew } = useContext(PatientsContext);

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
    >
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size="small"
        >
          <TableBody>
            <TableRow tabIndex={-1}>
              <TableCell padding="none" sx={{ width: '5%', display: 'flex', alignItems: 'center' }}>
                <FiberNewOutlinedIcon sx={{ fontSize: '2rem', p: 0.5 }} />
              </TableCell>
              <TableCell
                component="th"
                id="add_name"
                scope="row"
                align="center"
                sx={{ p: '6px 0px', width: headCells[0].width }}
              >
                <Input
                  required
                  id="new-name"
                  label="Name"
                  placeholder="Name"
                  variant="standard"
                  size="small"
                  margin="none"
                  sx={{ width: '90%', pl: 0.5 }}
                />
              </TableCell>
              <TableCell
                align="center"
                sx={{ p: '6px 0px', width: headCells[1].width }}
              >
                <Input
                  required
                  id="new-email"
                  label="Email"
                  placeholder="Email"
                  variant="standard"
                  size="small"
                  margin="none"
                  sx={{ width: '90%' }}
                />
              </TableCell>
              <TableCell
                align="center"
                sx={{ p: '6px 0px', width: headCells[2].width }}
              >
                <Input
                  required
                  id="new-birthdate"
                  label="Birthdate"
                  placeholder="Birthdate"
                  variant="standard"
                  size="small"
                  margin="none"
                  sx={{ width: '90%' }}
                />
              </TableCell>
              <TableCell
                align="center"
                sx={{ p: '6px 0px', width: '37.5%' }}
              >
                <Input
                  required
                  id="new-address"
                  label="Address"
                  placeholder="Address"
                  variant="standard"
                  size="small"
                  margin="none"
                  sx={{ width: '95%' }}
                />
              </TableCell>
              <TableCell padding="none" sx={{ width: '2.5%' }}>
                <IconButton color="success" sx={{ p: 0 }} aria-label="add new patient">
                  <CheckBoxOutlinedIcon />
                </IconButton>
              </TableCell>
              <TableCell padding="none" margin="none" sx={{ width: '2.5%' }}>
                <IconButton
                  color="error"
                  sx={{ p: 0 }}
                  aria-label="add new patient"
                  onClick={() => setIsAddingNew(false)}
                >
                  <DisabledByDefaultOutlinedIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default NewPatientRow;
