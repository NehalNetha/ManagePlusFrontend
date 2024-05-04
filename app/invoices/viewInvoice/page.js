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
    const res = await fetch('http://localhost:8080/invoice', {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('failed to fetch invoices');
    }
    return res.json();
  } catch (error) {
    console.log('error loading invoices:', error);
  }
};

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPayrolls();
      setInvoices(data);
    };

    fetchData();
  }, []);

  return (
    <div className='flex flex-col'>
      {/* <h1 className='text-3xl text-green-900 font-semibold p-11'>History of Payrolls</h1>
      <table className='flex flex-col  mt-11'>
        <thead>
          <tr className='flex flex-row justify-evenly'>
            <th>Company</th>
            <th>Date</th>
            <th>Quantity</th>
            <th>Price Per Unit</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv._id} className='flex flex-row gap-11 justify-evenly'>
              <td className='ml-[5rem]'>{inv.customer}</td>
              <td className='pl-[3rem]'>{inv.dateAdded}</td>
              <td className='pl-[3rem]'>{inv.quantity}</td>
              <td className='pl-[4rem]'>{inv.price_per_unit}</td>
              <td>{inv.total}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
       <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">Company</StyledTableCell>
            <StyledTableCell align="right">Date&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Quantity&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Price Per Unit&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Total&nbsp;(g)</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((pr) => (
            <StyledTableRow key={pr._id}>
              {/* <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell> */}
              <StyledTableCell align="right">{pr.customer}</StyledTableCell>
              <StyledTableCell align="right">{pr.invoiceDate}</StyledTableCell>
              <StyledTableCell align="right">{pr.quantity}</StyledTableCell>
              <StyledTableCell align="right">{pr.pricePerUnit}</StyledTableCell>
              <StyledTableCell align="right">{pr.total}</StyledTableCell>


            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
