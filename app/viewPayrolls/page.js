"use client"
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ProtectRoute from '@/components/ProtectedRoute';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'white',
    color: 'black',
    borderTop: '1px solid gray',
    borderBottom: '1px solid gray',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const getPayrolls = async () => {
  try {
    const res = await fetch('http://localhost:8080/payrolls', {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('failed to fetch payrolls');
    }
    return res.json();
  } catch (error) {
    console.log('error loading payrolls:', error);
  }
};

export default function PayrollView() {
  const [payrolls, setPayrolls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPayrolls();
      setPayrolls(data);
    };
    fetchData();
  }, []);

  return (
    <ProtectRoute>
    <div className='flex flex-col'>
    
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">Firstname</StyledTableCell>
            <StyledTableCell align="right">Lastname&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Disbursment&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Withholding&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Date Added&nbsp;(g)</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {payrolls.map((pr) => (
            <StyledTableRow key={pr._id}>
             
              <StyledTableCell align="right">{pr.firstname}</StyledTableCell>
              <StyledTableCell align="right">{pr.lastname}</StyledTableCell>
              <StyledTableCell align="right">{pr.salary}</StyledTableCell>
              <StyledTableCell align="right">{pr.withholding}</StyledTableCell>
              <StyledTableCell align="right">{pr.payrollDate}</StyledTableCell>


            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    </div>
    </ProtectRoute>
  );
}
