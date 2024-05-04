"use client"
import { LineChart } from '@mui/x-charts';
import React, { useEffect, useState } from 'react'

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

function page() {

  const [payrolls, setPayrolls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPayrolls();
      setPayrolls(data);
    };
    fetchData();

  
  }, []);


  // Destructuring salaries and dates
  const salaries = payrolls.map(payroll => payroll.salary);
  const dates = payrolls.map(payroll => new Date(payroll.payrollDate));


  console.log(salaries)
  console.log(dates)

  


  return (
    <div>
       <LineChart
            xAxis={[{ data: dates }]}
            series={[
                {
                data: salaries,
                },
            ]}
            width={500}
            height={300}
        />
    </div>
  )
}

export default page