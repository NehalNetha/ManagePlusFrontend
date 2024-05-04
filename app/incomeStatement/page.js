
"use client"
import React from 'react'
import { useEffect, useState } from 'react';

const getTotalSalary = async () => {
  try {
    const res = await fetch('http://localhost:8080/payrolls/totalSalary', {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('failed to fetch total salary');
    }
    return res.json();
  } catch (error) {
    console.log('error loading total salary:', error);
  }
};

const getTotalWithholding = async () => {
  try {
    const res = await fetch('http://localhost:8080/payrolls/totalWithholding', {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('failed to fetch total withholding');
    }
    return res.json();
  } catch (error) {
    console.log('error loading total withholding: ', error);
  }
};


const getTotalExpenses = async () => {
  try{
    const res = await fetch("http://localhost:8080/expenses/totalExpenses", {
      cache: "no-store"
    })

    if(!res.ok){
      throw new Error("failed to fetch total expenses")
    }
    return res.json();
  }catch(error){
    console.log("error loading total expenses:", error);
  }
}

const getTotalOrders = async () => {
  try {
    const res = await fetch("http://localhost:8080/invoice/totalOrders", {
      cache: "no-store"
    })
    if (!res.ok) {
      throw new Error("failed to fetch total orders")
    }
    return res.json();
  }catch(error){
    console.log("error loading total orders:", error);
  }
}

const getTotalPurchases = async () => {
  try {
    const res = await fetch("http://localhost:8080/purchase-order/totalPurchases", {
      cache: "no-store"
    })
    if (!res.ok) {
      throw new Error("failed to fetch total purchases")
    }
    return res.json();
  }catch(error){
    console.log("error loading total purchases:", error);
  }
}




function page() {

  const [totalSalary, setTotalSalary] = useState([]);
  const [totalWithholding, setTotalWithholding] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState([]);
  const [totalOrders, setTotalOrders] = useState([]);
  const [totalPurchases, setTotalPurchases] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTotalSalary();
      setTotalSalary(data);
    };

    const fetchWitholding = async () => {
      const data = await getTotalWithholding();
      setTotalWithholding(data);
    };

    const fetchExpenses = async () =>{
      const data = await getTotalExpenses();
      setTotalExpenses(data)
    }

    const fetchOrders = async () =>{
      const data = await getTotalOrders();
      setTotalOrders(data)
    }

    const fetchPurchases = async () =>{
      const data = await getTotalPurchases();
      setTotalPurchases(data)
    }
    

    fetchData();
    fetchWitholding();
    fetchExpenses();
    fetchOrders();
    fetchPurchases();
  }, []);

    return (
        <ProtectRoute>

      <div className="border-2 border-black  w-[30rem] py-9 flex flex-col gap-5 justify-evenly items-center ml-11 mt-11 ">
        <h1 className="text-2xl font-semibold">Income Statement</h1>
        <hr />
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold">Sales</h1>
          <hr />

          {renderRow("Sales", totalOrders)}
          <hr />

          {renderRow("COGS", totalPurchases)}
          <hr />

          {renderRow("Gross Profit", totalOrders - totalPurchases)}
          <hr/>

        </div>
  
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold">Expenses</h1>
          {renderRow("Payroll", totalSalary)}
          <hr  />

          {renderRow("Payroll Withholding", totalWithholding)}
          <hr />

          {renderRow("Bills", totalExpenses)}
          <hr  />

          {renderRow("Annual Expenses", "-")}
          <hr />

          {renderRow("Total Expenses", totalExpenses+totalSalary+totalWithholding)}
          <hr />

        </div>

        <div className="flex flex-col gap-2">
          {renderRow("Other Income", "-")}
          <hr  />

          {renderRow("Operating Income", "-")}
          <hr />

          {renderRow("Income Taxes", "-")}
          <hr  />


          {renderRow("NetIncome",(totalOrders - totalPurchases) - (totalExpenses+totalSalary+totalWithholding) )}
          <hr />

        </div>
      </div>
      </ProtectRoute>

    );
  }
  
  // Helper function to render a row
  function renderRow(label, price) {
    
    const formattedPrice = price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    return (
      <div className="flex flex-row gap-5">
        <p className="font-medium w-80">{label}</p>
        <p>{formattedPrice}</p>
      </div>
    );
  }

  export default page;