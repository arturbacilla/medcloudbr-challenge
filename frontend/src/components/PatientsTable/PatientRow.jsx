import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import { useNavigate } from 'react-router-dom';
import newPatientSchema from '../../schema/newPatientSchema';
import headCells from './structure';

const initialValidation = {
  name: true, email: true, birthdate: true, address: true,
};

// eslint-disable-next-line object-curly-newline
function PatientRow({ row, isItemSelected, labelId, handleClick }) {
  const Navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [newPatientInfo, setNewPatientInfo] = useState({});
  const [editFieldIsValid, setEditFieldIsValid] = useState(initialValidation);
  const [showEditButton, setShowEditButton] = useState(false);

  const checkSchema = (id, value) => {
    const schemaValidate = newPatientSchema[id].validate(value);
    if (schemaValidate.error) return setEditFieldIsValid({ ...editFieldIsValid, [id]: false });
    return setEditFieldIsValid({ ...editFieldIsValid, [id]: true });
  };

  const handleChange = ({ target }) => {
    const { id, value } = target;
    setNewPatientInfo({
      ...newPatientInfo,
      [id]: value,
    });
    return checkSchema(id, value);
  };

  useEffect(() => {
    setNewPatientInfo({
      name: row.name,
      email: row.email,
      birthdate: row.birthdate,
      address: row.address,
    });
  }, [isEditing]);

  const handleDiscard = () => {
    setIsEditing(false);
    setEditFieldIsValid(initialValidation);
  };

  return (
    <TableRow
      hover
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.name}
      selected={isItemSelected}
      className="clicableRow"
      onMouseEnter={() => setShowEditButton(true)}
      onMouseLeave={() => setShowEditButton(false)}
    >
      <TableCell padding="none" sx={{ width: '5%' }}>
        <Checkbox
          color="primary"
          checked={isItemSelected}
          inputProps={{
            'aria-labelledby': labelId,
          }}
          onClick={(event) => handleClick(event, row.id)}
        />
      </TableCell>
      <TableCell
        component="th"
        id={labelId}
        scope="row"
        align="left"
        sx={{ p: '6px 0px', width: headCells[0].width }}
        onClick={isEditing ? null : () => Navigate(`/patient/${row.id}`)}
      >
        {!isEditing ? row.name : (
          <Input
            required
            id="name"
            label="Name"
            placeholder="Name"
            variant="standard"
            size="small"
            margin="none"
            sx={{ width: '90%' }}
            onChange={handleChange}
            value={newPatientInfo.name}
            error={!editFieldIsValid.name}
          />
        )}
      </TableCell>
      <TableCell
        align="left"
        sx={{ p: '6px 0px', width: headCells[1].width }}
        onClick={isEditing ? null : () => Navigate(`/patient/${row.id}`)}
      >
        {!isEditing ? row.email : (
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
            value={newPatientInfo.email}
            error={!editFieldIsValid.email}
          />
        )}
      </TableCell>
      <TableCell
        align="left"
        sx={{ p: '6px 0px', width: headCells[2].width }}
        onClick={isEditing ? null : () => Navigate(`/patient/${row.id}`)}
      >
        {!isEditing ? row.birthdate : (
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
            value={newPatientInfo.birthdate}
            error={!editFieldIsValid.birthdate}
          />
        )}
      </TableCell>
      <TableCell
        align="left"
        sx={{ p: '6px 0px', width: headCells[3].width, overflowWrap: 'break-word' }}
        onClick={isEditing ? null : () => Navigate(`/patient/${row.id}`)}
      >
        {!isEditing ? row.address : (
          <Input
            required
            id="address"
            label="Address"
            placeholder="Address"
            variant="standard"
            size="small"
            margin="none"
            sx={{ width: '90%' }}
            onChange={handleChange}
            value={newPatientInfo.address}
            error={!editFieldIsValid.address}
          />
        )}
      </TableCell>
      <TableCell padding="none" sx={{ width: '5%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 1 }}>
          { !isEditing && showEditButton ? (
            <IconButton sx={{ p: 1 }} onClick={() => setIsEditing(true)}>
              <EditIcon sx={{ fontSize: '1.5rem' }} />
            </IconButton>
          ) : (
            isEditing && (
            <>
              <IconButton sx={{ p: 0 }}>
                <CheckBoxOutlinedIcon sx={{ fontSize: '1.5rem' }} color="success" />
              </IconButton>
              <IconButton sx={{ p: 0 }} onClick={() => handleDiscard()}>
                <DisabledByDefaultOutlinedIcon sx={{ fontSize: '1.5rem' }} color="error" />
              </IconButton>
            </>
            )
          )}
        </Box>
      </TableCell>
    </TableRow>
  );
}

PatientRow.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isItemSelected: PropTypes.bool.isRequired,
  labelId: PropTypes.string.isRequired,
  row: PropTypes.shape({
    address: PropTypes.string.isRequired,
    birthdate: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default PatientRow;
