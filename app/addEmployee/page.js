"use client";
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import ProtectRoute from '@/components/ProtectedRoute';


export default function addEmployee() {

  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
  const [addressLineOne, setAddressLineOne] = useState("")
  const [addressLineTwo, setAddressLineTwo] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zip, setZip] = useState(0)
  const [numberOfWithholdings, setNumberOfWithholdings] = useState(0)
  const [salary, setSalary] = useState(0)

  const router = useRouter();


  const handleSubmit = async(e) => {
     e.preventDefault();

     if(!firstname || !lastname || !addressLineOne || !addressLineTwo || !city || !state || !zip || !numberOfWithholdings || !salary) {
       alert("fill out all the required fields")
     }

     try{
        const res = await fetch("http://localhost:8080/employees", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({firstname, lastname, addressLineOne, addressLineTwo, city, state, zip, numberOfWithholdings, salary})
        })

        if(res.ok){
          router.push("/employees")
        }else{
          console.log("error adding an employee")
        }
     }catch(error){
      console.log(error);

     }
      
  }
 



  return (
    <ProtectRoute>
    <div className='bg-cream h-[100vh]'>
      <h1 className='text-green-900 text-[4rem] pl-[5rem] py-5'> Add Employee</h1>
        <form className='flex flex-col gap-5 pl-[5rem] pt-4' onSubmit={handleSubmit} >
            <input type='text'
                   placeholder='First Name' 
                   className='px-8 py-4 w-[400px] border-solid border-2  border-gray-500 rounded-2xl ' 
                   maxLength="20"
                   onChange={(e) => setFirstName(e.target.value)}
                   />
            <input type='text' 
                   placeholder='Last Name'
                   className='px-8 py-4  w-[400px]  border-solid border-2  border-gray-500 rounded-2xl ' 
                   maxLength="20"
                   onChange={(e) => setLastName(e.target.value)}

                   />

            <input type='text'
                   placeholder='Address Line 1' 
                   className='px-8 py-4  w-[400px] border-solid border-2  border-gray-500 rounded-2xl ' 
                   maxLength="70"
                   onChange={(e) => setAddressLineOne(e.target.value)}

                   />
            <input type='text'
                   placeholder='Address Line 2'
                   className='px-8 py-4  w-[400px] border-solid border-2  border-gray-500 rounded-3xl ' 
                   maxLength="70"
                   onChange={(e) => setAddressLineTwo(e.target.value)}

                   />
            <input type="text"
                   placeholder='City' 
                   className='px-8 py-4  w-[400px] border-solid border-2  border-gray-500 rounded-2xl ' 
                   maxLength="20"
                   onChange={(e) => setCity(e.target.value)}

                   />

            <div className='flex flex-row gap-5 '>
              <input placeholder='State'
                     className='px-8 py-4 w-[400px] border-solid border-2  rounded-2xl  border-gray-500'  
                     maxLength="20"
                     onChange={(e) => setState(e.target.value)}

                     />

              <input type='number' 
                     placeholder='Zip code' 
                     className='px-8 py-4 w-[400px] border-solid border-2   rounded-2xl  border-gray-500'
                     onChange={(e) => setZip(e.target.value)}

                     />

            </div>
              <input type='number'
                    className='px-8 py-4 w-[400px]  border-solid border-2  border-gray-500 rounded-2xl ' 
                    placeholder='Number of Withholdings' 
                    maxLength="20"
                    onChange={(e) => setNumberOfWithholdings(e.target.value)}

                    />
              <input type='number'
                    className='px-8 py-4 w-[400px]  border-solid border-2  border-gray-500 rounded-2xl ' 
                    placeholder="salary" 
                    maxLength="20"
                    onChange={(e) => setSalary(e.target.value)}

                    />
              <button type='submit' className='bg-blue-500 px-9 py-4 rounded-lg w-[200px] ml-[9rem] text-white'>
                  Add Employee
              </button>
        </form>
    </div>
    </ProtectRoute>
  )
}
