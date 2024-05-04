"use client"
import { useState } from "react"  
import { useRouter } from 'next/navigation'

const CreateInvoiceCleint = (props) => {
    const [quantity, setQuantity] = useState(0)
    const [pricePerUnit, SetPricePerUnit] = useState(0.0)
    const [total, setTotal] = useState(0)


    const customer = props.company
    const router = useRouter();

    

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (!quantity || !pricePerUnit || !total) {
        alert("Fill out all the required fields");
        return;
      }
    
      try {
        // Create Invoice
        const invoiceRes = await fetch(`http://localhost:8080/invoice`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ customer, quantity, pricePerUnit, total }),
        });
    
        if (invoiceRes.ok){
            router.push("/invoices/viewInvoice")

        }

        if (!invoiceRes.ok) {
          console.log("Error creating an invoice");
          return;
        }
    
        // Redirect to viewInvoices page
      } catch (error) {
        console.log(error);
      }
    };

    return (
    <div>
        <form className="flex flex-col gap-8 pt-11" onSubmit={handleSubmit}>
            
            <input type='number'
                     placeholder='Quantity' 
                     className='px-8 py-4 w-[400px] border-solid border-2  border-gray-500 rounded-3xl ' 
                     onChange={(e) => setQuantity(e.target.value)}
                     />
            <input type='number'  step="any"
                     placeholder='Price Per Unit'
                     className='px-8 py-4  w-[400px]  border-solid border-2  border-gray-500 rounded-3xl ' 
                     onChange={(e) => SetPricePerUnit(e.target.value)}
  
            />
             <input type='number'  step="any"
                     placeholder='Total'
                     className='px-8 py-4  w-[400px]  border-solid border-2  border-gray-500 rounded-3xl ' 
                     onChange={(e) => setTotal(e.target.value)}
  
             />
  
                 <button type='submit' className='bg-blue-500 px-9 py-4 mt-7 rounded-lg w-[200px] ml-[6rem] text-white'>
                        Create Invoice
                </button>
            </form>
            
  
    </div>

    )


}

export default CreateInvoiceCleint;


