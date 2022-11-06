import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import PatientsContext from '../../context/PatientsContext';

export default function PatientsTableToolbar(props) {
  const { numSelected } = props;
  const { isAddingNew, setIsAddingNew } = useContext(PatientsContext);

  return (
    <Toolbar
      variant="dense"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        minHeight: '55px',
        pl: { xs: 1 },
        pr: { xs: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected}
          selected
        </Typography>
      ) : (
        <TextField
          id="outlined-helperText"
          size="small"
          margin="dense"
          label="Search"
          placeholder="Name"
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        isAddingNew || (
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          onClick={() => setIsAddingNew(true)}
        >
          New
        </Button>
        )
      )}
    </Toolbar>
  );
}

PatientsTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
