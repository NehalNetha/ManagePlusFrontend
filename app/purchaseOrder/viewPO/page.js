"use client"
import React, { useEffect, useState } from 'react';
import ProtectRoute from '@/components/ProtectedRoute';


import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
    const res = await fetch('http://localhost:8080/purchase-order', {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('failed to fetch purchase orders');
    }
    return res.json();
  } catch (error) {
    console.log('error loading purchase orders:', error);
  }
};

export default function PoView() {
  const [po, setPos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPayrolls();
      setPos(data);
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
            <StyledTableCell align="right">Date</StyledTableCell>
            <StyledTableCell align="right">Supplier&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Part&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Quantity&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Price per Part&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">total&nbsp;(g)</StyledTableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {po.map((pr) => (
            <StyledTableRow key={pr._id}>
              {/* <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell> */}
              <StyledTableCell align="right">{pr.purchaseOrderDate}</StyledTableCell>
              <StyledTableCell align="right">{pr.vendor}</StyledTableCell>
              <StyledTableCell align="right">{pr.part}</StyledTableCell>
              <StyledTableCell align="right">{pr.quantity}</StyledTableCell>
              <StyledTableCell align="right">{pr.pricePerUnit}</StyledTableCell>
              <StyledTableCell align="right">{pr.total}</StyledTableCell>



            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </ProtectRoute>
  );
}
