
import Link from "next/link";

const getCustomers = async () => {
    try{
        const res = await  fetch("http://localhost:8080/customers", {
            cache: "no-store"
        })
        if(!res.ok){
            throw new Error("failed to fetch customers")
        }
        return res.json()
    }catch(error){
        console.log("error loading customers: ", error)
    }
}

export default async function page() {
    const customers = await getCustomers()

    return (

        <div className='flex flex-col gap-4 items-center'>

            <h1 className="text-2xl text-green-900 px-11 m-5">Customers</h1>
            <div className="">

            {customers.map((em) => (
                 <div key={em.id} className='py-4 px-11 flex flex-col '>
                    <Link href={`/invoices/createInvoice/${em.id}`} className=" px-5 py-4 bg-blue-500 text-white w-[11rem] rounded-lg">
                         {em.company} 
                    </Link>
                 </div>
            ))}
            </div>
           
        </div>
    )
}
