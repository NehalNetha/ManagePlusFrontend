"use client";
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'


export default function page() {

  const [part, setPart] = useState("")
  const [pricePerUnit, setPricePerUnit] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [total, setTotal] = useState(0)
  

  const router = useRouter();


  const handleSubmit = async(e) => {
     e.preventDefault();

     if(!part || !pricePerUnit || !quantity || !total ) {
       alert("fill out all the required fields")
     }

     try{
        const res = await fetch("http://localhost:8080/inventory", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({part, pricePerUnit,  quantity, total})
        })

        if(res.ok){
          router.push("/inventory/viewInventory")
        }else{
          console.log("error adding an inventory")
        }
     }catch(error){
      console.log(error);

     }
      
  }
 



  return (
    <div className='bg-cream h-[100vh]'>
      <h1 className='text-green-900 text-[4rem] pl-[5rem] py-5'> Add Inventory</h1>
        <form className='flex flex-col gap-5 pl-[5rem] pt-4' onSubmit={handleSubmit} >
            <input type='text'
                   placeholder='Part' 
                   className='px-8 py-4 w-[400px] border-solid border-2  border-gray-500 rounded-3xl ' 
                   maxLength="40"
                   onChange={(e) => setPart(e.target.value)}
                   />
            <input type='text' 
                   placeholder='cost per unit'
                   className='px-8 py-4  w-[400px]  border-solid border-2  border-gray-500 rounded-3xl ' 
                   maxLength="20"
                   onChange={(e) => setPricePerUnit(e.target.value)}

                   />
            <input type="text"
                placeholder='quantity' 
                className='px-8 py-4  w-[400px] border-solid border-2  border-gray-500 rounded-3xl ' 
                maxLength="20"
                onChange={(e) => setQuantity(e.target.value)}

                />

            <input type='text'
                   placeholder='total' 
                   className='px-8 py-4  w-[400px] border-solid border-2  border-gray-500 rounded-3xl ' 
                   maxLength="70"
                   onChange={(e) => setTotal(e.target.value)}

                   />
             
           
             
              <button type='submit' className='bg-blue-500 px-9 py-4 rounded-lg w-[200px] ml-[9rem]'>
                  Add Vendor
              </button>
        </form>
    </div>
  )
}
