"use client"
import React, { useState } from 'react'
import Link from "next/link";
import { useRouter } from 'next/navigation'



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
const expenses = {
    "maintance": 2000,
    "cleaning": 500,
    "electricity": 200,
    "water": 100,
    "sewage": 50,
    "food": 100,
    "Internet": 789,
    "phone": 200,
    "travel": 120,
    "snacks": 200
}

function page() {

    const [newExpense, setNewExpense] = useState("")
    const [newExpensePrice, setNewExpensePrice] = useState("")
    const [expenses, setExpenses] = useState({
        "maintance": 2000,
        "cleaning": 500,
        "electricity": 200,
        "water": 100,
        "sewage": 50,
        "food": 100,
        "Internet": 789,
        "phone": 200,
        "travel": 120,
        "snacks": 200
    });


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8080/expenses", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ expense: newExpense, costPerMonth: parseInt(newExpensePrice) }),
            });

            if (res.ok) {
                // Update expenses dictionary
                setExpenses(prevExpenses => ({
                    ...prevExpenses,
                    [newExpense]: parseInt(newExpensePrice)
                }));

                // Handle success (e.g., redirect to another page)
                router.push("/expenses/viewExpenses");

            } else {
                console.log("Error adding an expense");
            }
        } catch (error) {
            console.error(error);
        }
    };

  const router = useRouter();

  

  return (
    <div className='flex flex-col gap-7 justify-center items-center'>
        <h1 className='text-2xl font-medium'>Expenses</h1>
        <div>
                <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell align="right">Expenses</StyledTableCell>
                    <StyledTableCell align="right">Cost Per Month&nbsp;(g)</StyledTableCell>
                    <StyledTableCell align="right">Pay&nbsp;(g)</StyledTableCell>

                </TableRow>
                </TableHead>
                <TableBody>
                {Object.entries(expenses).map(([key, value]) => (
                    <StyledTableRow key={key}>
                    {/* <StyledTableCell component="th" scope="row">
                        {row.name}
                    </StyledTableCell> */}
                    <StyledTableCell align="right">{key}</StyledTableCell>
                    <StyledTableCell align="right">{value}</StyledTableCell>
                    <StyledTableCell align="right">
                    <form onSubmit={(e) => handleSubmit(e, key, value)}>
                        <input type="submit" className='px-5 py-4 bg-blue-500 rounded-xl text-white cursor-pointer' value={`Pay ${key}`} />
                        </form>
                    </StyledTableCell>

                    
                    </StyledTableRow>
                ))} 
                </TableBody>
            </Table>
            </TableContainer>
        </div>

        <div className='flex flex-row gap-6 items-center justify-center mb-7'>
            <div className='flex flex-col gap-4'>
                    <input type='text'
                        placeholder='Expense' 
                        className='px-8 py-4  w-[400px] border-solid border-2  border-gray-500 rounded-2xl ' 
                        maxLength="70"
                        onChange={(e) => setNewExpense(e.target.value)}

                        />
                    <input type='text'
                        placeholder='Cost Per Month'
                        className='px-8 py-4  w-[400px] border-solid border-2  border-gray-500 rounded-3xl ' 
                        maxLength="70"
                        onChange={(e) => setNewExpensePrice(e.target.value)}

                        />
            </div>

            <button className='w-[12rem] px-5 py-4 bg-blue-500 rounded-xl text-white cursor-pointer mb-7' onClick={handleSubmit}> 
                    Add Expense
            </button>
        </div>

   

   
    </div>
  )
}

export default page