import Link from "next/link";
import ProtectRoute from '@/components/ProtectedRoute';

const getVendors = async () => {
    try{
        const res = await  fetch("http://localhost:8080/vendors", {
            cache: "no-store"
        })
        if(!res.ok){
            throw new Error("failed to fetch vendors")
        }
        return res.json()
    }catch(error){
        console.log("error loading vendors: ", error)
    }
}

export default async function page() {
    const vendors = await getVendors()

    return (
        <ProtectRoute>
        <div className="flex flex-col gap-4 items-center">
            <h1 className="text-2xl text-green-900 px-11 m-5">Vendors</h1>
            <div className="">
                {vendors.map((ven) => (
                    <div key={ven.id} className='py-4 px-11 flex flex-col gap-2'>
                        <Link href={`/purchaseOrder/createPO/${ven.id}`} className="px-5 py-4 bg-blue-500 text-white w-[15rem] rounded-lg hover:-translate-y-2 transition duration-300">
                            {ven.company} 
                        </Link>
                    </div>

                ))}
            </div>
           
        </div>
        </ProtectRoute>
    )
}
