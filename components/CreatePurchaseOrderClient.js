"use client"
import { useState } from "react"  
import { useRouter } from 'next/navigation'




const CreatePOClient = (props) => {
    const [part, setPart] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [pricePerUnit, SetPricePerPart] = useState(0.0)
    const [total, setTotal] = useState(0)


    const vendor = props.vendor
    const router = useRouter();

    

    const handleSubmit = async(e) => {
        e.preventDefault();
   
        if(!part || !quantity || !pricePerUnit || !total) {
          alert("fill out all the required fields")
        }
   
        try{
           const res = await fetch(`http://localhost:3000/api/createPO`, {
             method: "POST",
             headers: {
               "Content-type": "application/json",
             },
             body: JSON.stringify({vendor, part, quantity, pricePerUnit, total})
           })

           if (res.ok){
            router.push()
           }


           if (!res.ok){
            console.log("Error creating an invoice");
            return;
           }
           

           

           

           
        
           
        }catch(error){
         console.log(error);
   
        }
     }

    return (
    <div>
        <form className="flex flex-col gap-8 pt-11" onSubmit={handleSubmit}>
            <input type='text'
                     placeholder='Equipment' 
                     className='px-8 py-4 w-[400px] border-solid border-2  border-gray-500 rounded-3xl ' 
                     onChange={(e) => setPart(e.target.value)}
                     />
            <input type='number'
                     placeholder='Quantity' 
                     className='px-8 py-4 w-[400px] border-solid border-2  border-gray-500 rounded-3xl ' 
                     onChange={(e) => setQuantity(e.target.value)}
                     />
            <input type='number'  step="any"
                     placeholder='Price Per Unit'
                     className='px-8 py-4  w-[400px]  border-solid border-2  border-gray-500 rounded-3xl ' 
                     onChange={(e) => SetPricePerPart(e.target.value)}
  
            />
             <input type='number'  step="any"
                     placeholder='Total'
                     className='px-8 py-4  w-[400px]  border-solid border-2  border-gray-500 rounded-3xl ' 
                     onChange={(e) => setTotal(e.target.value)}
  
             />
  
                 <button type='submit' className='bg-blue-500 px-9 py-4 mt-7 rounded-lg w-[200px] ml-[6rem] text-white'>
                        Create PO
                </button>
            </form>
            
  
    </div>

    )


}

export default CreatePOClient;