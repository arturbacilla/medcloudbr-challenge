import React, { useContext, useState } from 'react';
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
import Tooltip from '@mui/material/Tooltip';
import headCells from './PatientsTable/structure';
import PatientsContext from '../context/PatientsContext';
import newPatientSchema from '../schema/newPatientSchema';
import { requestPost } from '../services/api';

function NewPatientRow() {
  const token = localStorage.getItem('token');

  const {
    setIsAddingNew, newPatientInfo, setNewPatientInfo,
  } = useContext(PatientsContext);
  const [fieldIsValid, setFieldIsValid] = useState({
    name: false, email: false, birthdate: false, address: false,
  });
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleChange = ({ target }) => {
    const { id, value } = target;
    setNewPatientInfo({
      ...newPatientInfo,
      [id]: value,
    });
    const schemaValidate = newPatientSchema[id].validate(value);
    if (schemaValidate.error) return setFieldIsValid({ ...fieldIsValid, [id]: false });
    return setFieldIsValid({ ...fieldIsValid, [id]: true });
  };

  const handleCancelAdd = () => {
    setNewPatientInfo({});
    setIsAddingNew(false);
  };

  const submitAddNew = async () => {
    const allValid = Object.values(fieldIsValid).every((key) => key === true);
    if (!allValid) return setTooltipOpen(true);
    const { statusCode } = await requestPost('/patients', { ...newPatientInfo, password: '' }, token);
    if (statusCode !== 200) return setTooltipOpen(true);
    setNewPatientInfo({});
    return setIsAddingNew(false);
  };

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
                <Tooltip title="Min 2 characters." placement="top" followCursor arrow>
                  <Input
                    required
                    id="name"
                    label="Name"
                    placeholder="Name"
                    variant="standard"
                    size="small"
                    margin="none"
                    sx={{ width: '90%', pl: 0.5 }}
                    onChange={handleChange}
                    error={!fieldIsValid.name}
                  />
                </Tooltip>
              </TableCell>
              <TableCell
                align="center"
                sx={{ p: '6px 0px', width: headCells[1].width }}
              >
                <Tooltip title="Should be valid .net, .com or .br" placement="top" followCursor arrow>
                  <Input
                    required
                    id="email"
                    label="Email"
                    placeholder="Email"
                    variant="standard"
                    size="small"
                    margin="none"
                    sx={{ width: '90%' }}
                    onChange={handleChange}
                    error={!fieldIsValid.email}
                  />
                </Tooltip>
              </TableCell>
              <TableCell
                align="center"
                sx={{ p: '6px 0px', width: headCells[2].width }}
              >
                <Tooltip title="Format: DD/MM/YYYY." placement="top" followCursor arrow>
                  <Input
                    required
                    id="birthdate"
                    label="Birthdate"
                    placeholder="Birthdate"
                    variant="standard"
                    size="small"
                    margin="none"
                    sx={{ width: '90%' }}
                    onChange={handleChange}
                    error={!fieldIsValid.birthdate}
                  />
                </Tooltip>
              </TableCell>
              <TableCell
                align="center"
                sx={{ p: '6px 0px', width: '37.5%' }}
              >
                <Tooltip title="Min 2 characters." placement="top" followCursor arrow>
                  <Input
                    required
                    id="address"
                    label="Address"
                    placeholder="Address"
                    variant="standard"
                    size="small"
                    margin="none"
                    sx={{ width: '95%' }}
                    onChange={handleChange}
                    error={!fieldIsValid.address}
                  />
                </Tooltip>
              </TableCell>
              <TableCell padding="none" sx={{ width: '2.5%' }}>
                <Tooltip
                  open={tooltipOpen}
                  onClose={() => setTooltipOpen(false)}
                  title="Something wrong happened."
                  placement="top"
                  arrow
                >
                  <IconButton
                    color="success"
                    sx={{ p: 0 }}
                    aria-label="add new patient"
                    onClick={() => submitAddNew()}
                  >
                    <CheckBoxOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell padding="none" margin="none" sx={{ width: '2.5%' }}>
                <IconButton
                  color="error"
                  sx={{ p: 0 }}
                  aria-label="add new patient"
                  onClick={() => handleCancelAdd()}
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
