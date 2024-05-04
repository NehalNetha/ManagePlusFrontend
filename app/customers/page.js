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
import ProtectRoute from "@/components/ProtectedRoute";

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
  


const fetchCustomers = async () => {
    try {
        const res = await fetch("http://localhost:8080/customers", {
            cache: "no-store"
        });

        if (!res.ok) {
            throw new Error("Failed to fetch customers");
        }

        // Call res.json() function to actually parse the response body as JSON
        return await res.json();
    } catch (error) {
        console.log("Failed to fetch employees", error);
        return []; // Return an empty array in case of an error
    }
};

function page() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchCustomers();
                setCustomers(data);
                console.log(data);
            } catch (error) {
                console.log("Error fetching employees:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <ProtectRoute>
        <div className="flex flex-col items-center gap-6">
            <div className="text-[2rem] text-blueColor font-semibold mt-6">
                <h1>Customers</h1>
            </div>
            <div className="m-5">  
                <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                <TableRow>
                <StyledTableCell align="right">Company</StyledTableCell>

                    <StyledTableCell align="right">First Name</StyledTableCell>
                    <StyledTableCell align="right">Last Name&nbsp;(g)</StyledTableCell>
                    <StyledTableCell align="right">Address Line One&nbsp;(g)</StyledTableCell>
                    <StyledTableCell align="right">Address Line Two&nbsp;(g)</StyledTableCell>
                    <StyledTableCell align="right">City&nbsp;(g)</StyledTableCell>
                    <StyledTableCell align="right">State&nbsp;(g)</StyledTableCell>
                    <StyledTableCell align="right">zip&nbsp;(g)</StyledTableCell>

                    <StyledTableCell align="right">Price&nbsp;(g)</StyledTableCell>




                </TableRow>
                </TableHead>
                <TableBody>
                {customers.map((pr) => (
                    <StyledTableRow key={pr._id}>
                    {/* <StyledTableCell component="th" scope="row">
                        {row.name}
                    </StyledTableCell> */}
                    <StyledTableCell align="right">{pr.company}</StyledTableCell>

                    <StyledTableCell align="right">{pr.firstname}</StyledTableCell>
                    <StyledTableCell align="right">{pr.lastname}</StyledTableCell>
                    <StyledTableCell align="right">{pr.addressLineOne}</StyledTableCell>
                    <StyledTableCell align="right">{pr.addressLineTwo}</StyledTableCell>
                    <StyledTableCell align="right">{pr.city}</StyledTableCell>
                    <StyledTableCell align="right">{pr.state}</StyledTableCell>
                    <StyledTableCell align="right">{pr.zip}</StyledTableCell>

                    <StyledTableCell align="right">{pr.price}</StyledTableCell>







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
