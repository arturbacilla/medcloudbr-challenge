import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined';
import PatientsTableHeader from './PatientsTableHeader';
import PatientsTableToolbar from './PatientsTableToolbar';
import Navigation from '../Navigation';
import NewPatientRow from '../NewPatientRow';
import PatientsContext from '../../context/PatientsContext';
import headCells from './structure';

function createData(id, name, email, birthdate, address) {
  return {
    id,
    name,
    email,
    birthdate,
    address,
  };
}

const rows = [
  createData('id-adm', 'Admin', 'admin@admin.com', '17/09/1992', 'Rua dos Bobos, 0'),
  createData('id-2', 'Artur Bacilla', 'artur.bacilla1@gmail.com', '17/09/1992', 'Rua Parnaíba, 159, Curitiba, Paraná'),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function PatientsTable() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('email');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { isAddingNew, isEditing, setIsEditing } = useContext(PatientsContext);
  const Navigate = useNavigate();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{
      width: { xs: '100%', lg: '90%' },
      maxWidth: '1090px',
      marginInline: 'auto',
    }}
    >
      <Navigation />
      <Paper sx={{ width: '100%', mb: 5, mt: 0 }}>
        <PatientsTableToolbar numSelected={selected.length} />
        {
          isAddingNew && <NewPatientRow />
        }
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="small"
          >
            <PatientsTableHeader
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                      className="clicableRow"
                    >
                      <TableCell padding="none" sx={{ width: '5%' }}>
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                          onClick={(event) => handleClick(event, row.name)}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        align="left"
                        sx={{ p: '6px 0px', width: headCells[0].width }}
                        onClick={() => Navigate(`/patient/${row.id}`)}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ p: '6px 0px', width: headCells[1].width }}
                        onClick={() => Navigate(`/patient/${row.id}`)}
                      >
                        {row.email}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ p: '6px 0px', width: headCells[2].width }}
                        onClick={() => Navigate(`/patient/${row.id}`)}
                      >
                        {row.birthdate}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ p: '6px 0px', width: 'auto', overflowWrap: 'break-word' }}
                        onClick={() => Navigate(`/patient/${row.id}`)}
                      >
                        {row.address}
                      </TableCell>
                      <TableCell padding="none" sx={{ width: '5%' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 1 }}>
                          { !isEditing ? (
                            <IconButton sx={{ p: 1 }}>
                              <EditIcon sx={{ fontSize: '1.5rem' }} onClick={() => setIsEditing(true)} />
                            </IconButton>
                          ) : (
                            <>
                              <IconButton sx={{ p: 0 }}>
                                <CheckBoxOutlinedIcon sx={{ fontSize: '1.5rem' }} color="success" />
                              </IconButton>
                              <IconButton sx={{ p: 0 }} onClick={() => setIsEditing(false)}>
                                <DisabledByDefaultOutlinedIcon sx={{ fontSize: '1.5rem' }} color="error" />
                              </IconButton>
                            </>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (33 * emptyRows),
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
