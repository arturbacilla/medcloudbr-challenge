import React, { useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PatientsTableHeader from './PatientsTableHeader';
import PatientsTableToolbar from './PatientsTableToolbar';
import LoadingTableData from './LoadingTableData';
import NewPatientRow from '../NewPatientRow';
import PatientsContext from '../../context/PatientsContext';
import Navigation from '../Navigation';
import PatientRow from './PatientRow';
import { requestGet } from '../../services/api';
import parseResult from '../../helpers/parseResult';

const toTimestamp = (dateString) => {
  // ref https://stackoverflow.com/a/33299764/12763774
  const dateParts = dateString.split('/');
  const date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
  return Date.parse(date) / 1000;
};

function descendingComparator(a, b, orderBy) {
  if (orderBy === 'birthdate') {
    if (toTimestamp(b[orderBy]) < toTimestamp(a[orderBy])) return -1;
    if (toTimestamp(b[orderBy]) > toTimestamp(a[orderBy])) return 1;
  } else {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const {
    isAddingNew,
    shouldUpdate,
    setShouldUpdate,
    selected,
    setSelected,
    search,
  } = useContext(PatientsContext);
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPatients = async () => {
    const token = localStorage.getItem('token');
    const patientsList = await requestGet('/patients', token);
    if (!Object.values(patientsList).some((key) => key === 'AxiosError')) {
      const { body } = parseResult(patientsList);
      return body;
    }
    return false;
  };

  useEffect(() => {
    fetchPatients().then((data) => {
      if (data) {
        const noAdmin = data
          .filter((patient) => !patient.admin)
          .map(({ id, email, name, birthdate, address }) => ({ id, email, name, birthdate, address }));
        setRows(noAdmin);
        setIsLoading(false);
        setShouldUpdate(false);
      }
    });
  }, [shouldUpdate]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  const isSelected = (id) => selected.indexOf(id) !== -1;

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
            {
              isLoading ? <LoadingTableData /> : (
                <TableBody>
                  {
                    rows.filter((row) => Object.values(row).slice(1).some((value) => value.includes(search)))
                      .sort(getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.id);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <PatientRow
                            row={row}
                            key={row.id}
                            isItemSelected={isItemSelected}
                            labelId={labelId}
                            handleClick={handleClick}
                          />
                        );
                      })
                  }
                  {emptyRows > 0 && (
                  <TableRow style={{ height: (33 * emptyRows) }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                  )}
                </TableBody>
              )
            }
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
