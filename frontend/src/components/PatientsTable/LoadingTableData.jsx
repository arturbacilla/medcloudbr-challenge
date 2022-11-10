import React from 'react';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

function LoadingTableData() {
  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={12} sx={{ textAlign: 'center' }}>
          Loading data...
        </TableCell>
      </TableRow>
    </TableBody>
  );
}

export default LoadingTableData;
