"use client"
import ProtectRoute from '@/components/ProtectedRoute'
import React, { useEffect, useState } from 'react'


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

const getTotalInventory = async () => {
  try {
    const res = await fetch("http://localhost:8080/inventory/totalInventory", {
      cache: "no-store"
    })
    if (!res.ok) {
      throw new Error("failed to fetch total inventory")
    }
    return res.json();
  }catch(error){
    console.log("error loading total inventory:", error);
  }
}

const getTotalSalary = async () => {
  try {
    const res = await fetch("http://localhost:8080/payrolls/totalSalary", {
      cache: "no-store"
    })
    if (!res.ok) {
      throw new Error("failed to fetch total salary")
    }
    return res.json();
  }catch(error){
    console.log("error loading total salary:", error);
  }
}





function page() {

  const [totalOrders, setTotalOrders] = useState([])
  const [totalPurchases, setTotalPurchases] = useState([]) 
  const [totalInventory, setTotalInventory] = useState([])
  const [totalSalary, setTotalSalary] = useState([])

  const [cash, setCash] = useState(200000)

    useEffect(() => {
      const fetchOrders = async () =>{
        const data = await getTotalOrders();
        setTotalOrders(data)

      }
  
      const fetchPurchases = async () =>{
        const data = await getTotalPurchases();
        setTotalPurchases(data.totalPurchases)
        setCash((prevCash) => prevCash - data)
      }

      const fetchInventory = async () =>{
        const data = await getTotalInventory();
        setTotalInventory(data)
      }

      const fetchSalary = async () =>{
        const data = await getTotalSalary();
        setTotalSalary(data)
        // setCash((prevCash) => prevCash - data.totalDisbursment)
      }

      fetchInventory();
      fetchOrders();
      fetchPurchases();
      fetchSalary()
    }, [])

    return (
        <ProtectRoute>
        <div className='flex flex-row justify-evenly border-2 border-black w-[70rem] m-8 p-8'>
            <div className="flex flex-col gap-11 justify-center ml-11 mt-11">
                <h1 className="text-2xl font-semibold">Balance Sheet</h1>
                <div className="flex flex-col gap-2">
                    <h1 className="text-xl font-semibold">Assets</h1>
                    <hr  />

                    {renderRow("Cash", cash  )}
                    <hr />

                    {renderRow("Account Recievabale ", totalOrders)}
                    <hr  />


                    {renderRow("Inventory", Math.abs(totalInventory))}
                    <hr  />

                    <div className='font-semibold'>
                      {renderRow("Total Current Assets", cash+totalOrders+Math.abs(totalInventory))}
                      <hr />
                    </div>
                    {renderRow("Land Buildings", "-")}
                    <hr/>

                    {renderRow("Equipment", "-")}
                    <hr />

                    {renderRow("Furniture and Fixtures", "-")}
                    <hr  />

                    {renderRow("Total Fixed Assets", "-")}
                    <hr/>
                    <div className='font-semibold'>

                    {renderRow("Total Assets", cash+totalOrders+totalInventory)}
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-11 justify-center ml-11 mt-[7rem]">
                <div className="flex flex-col gap-2">
                    <h1 className="text-xl font-semibold">Liabilites & Net Worth</h1>
                    <hr  />

                    {renderRow("Accounts Payable", totalPurchases)}
                    <hr  />

                    {renderRow("Note Payable", "-")}
                    <hr/>

                    {renderRow("Inventory", "-")}
                    <hr  />

                    {renderRow("Accurate", "-")}
                    <hr  />

                    {renderRow("Total Current Liabilites", "0")}
                    <hr  />

                    {renderRow("Mortgage", "-")}
                    <hr  />

                    {renderRow("Total Long term Debt", "-")}
                    <hr  />

                    {renderRow("", "")}
                    <hr  />
                    <div className='font-semibold'>

                    {renderRow("Net Worth", (cash+totalOrders+totalInventory) - totalOrders)}
                    </div>
                </div>
            </div>
        </div>
        </ProtectRoute>
      );
    }
    
    // Helper function to render a row
    function renderRow(label, price) {

    //   const formattedPrice = price.toLocaleString('en-US', {
    //     style: 'currency',
    //     currency: 'USD',
    //   });

      return (
        <div className="flex flex-row gap-9">
          <p className="font-medium w-32">{label}</p>
          <p className='ml-11'>{price}</p>
        </div>
      );
}

export default page