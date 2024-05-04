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
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
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

const getInventory = async () => {
    try {
      const res = await fetch('http://localhost:8080/inventory', {
        cache: 'no-store',
      });
      if (!res.ok) {
        throw new Error('failed to fetch inventory');
      }
      return res.json();
    } catch (error) {
      console.log('error loading inventory:', error);
    }
  };

function page() {
    const [inventory, setInventory] = useState([])

    useEffect(() =>{
        const fetchData = async () =>{
            const data = await getInventory()
            setInventory(data)

        }

        fetchData()
    }, [])

  return (
    <div>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">Part</StyledTableCell>
            <StyledTableCell align="right">Price Per Unit&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Quantity&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Total&nbsp;(g)</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {inventory.map((pr) => (
            <StyledTableRow key={pr._id}>
              {/* <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell> */}
              <StyledTableCell align="right">{pr.part}</StyledTableCell>
              <StyledTableCell align="right">{pr.pricePerUnit}</StyledTableCell>
              <StyledTableCell align="right">{pr.quantity}</StyledTableCell>
              <StyledTableCell align="right">{pr.total}</StyledTableCell>


            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default page