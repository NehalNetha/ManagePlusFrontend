"use client"
import React from "react";
import { useEffect, useState } from "react";







import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from "next/link";
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


const fetchVendors = async () => {
    try {
        const res = await fetch("http://localhost:8080/vendors", {
            cache: "no-store"
        });

        if (!res.ok) {
            throw new Error("Failed to fetch vendors");
        }

        // Call res.json() function to actually parse the response body as JSON
        return await res.json();
    } catch (error) {
        console.log("Failed to fetch vendors", error);
        return []; // Return an empty array in case of an error
    }
};

function page() {
    const [vendors, setVendors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchVendors();
                setVendors(data);
                console.log(data);
            } catch (error) {
                console.log("Error fetching vendors:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <ProtectRoute>
        <div className="flex flex-col items-center gap-6">
            <div className="text-[2rem] text-blueColor font-semibold mt-6">
                <h1>Vendors</h1>
            </div>
            <div className="m-5">  
                <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell align="right">Company</StyledTableCell>
                    <StyledTableCell align="right">Equipment&nbsp;(g)</StyledTableCell>
                    <StyledTableCell align="right">Price&nbsp;(g)</StyledTableCell>
                    <StyledTableCell align="right">AddressLine&nbsp;(g)</StyledTableCell>
                    <StyledTableCell align="right">City&nbsp;(g)</StyledTableCell>
                    <StyledTableCell align="right">State&nbsp;(g)</StyledTableCell>
                    <StyledTableCell align="right">Pin Code&nbsp;(g)</StyledTableCell>




                </TableRow>
                </TableHead>
                <TableBody>
                {vendors.map((pr) => (
                    <StyledTableRow key={pr._id}>
                    {/* <StyledTableCell component="th" scope="row">
                        {row.name}
                    </StyledTableCell> */}
                    <StyledTableCell align="right">{pr.company}</StyledTableCell>
                    <StyledTableCell align="right">{pr.equipment}</StyledTableCell>
                    <StyledTableCell align="right">{pr.price}</StyledTableCell>
                    <StyledTableCell align="right">{pr.addressLine}</StyledTableCell>
                    <StyledTableCell align="right">{pr.city}</StyledTableCell>
                    <StyledTableCell align="right">{pr.state}</StyledTableCell>
                    <StyledTableCell align="right">{pr.zip}</StyledTableCell>








                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            </div>
        </div>
        </ProtectRoute>
    );
}

export default page;
