import React from 'react'
import Link from "next/link";

const getEmployees = async () => {
    try{
        const res = await  fetch("http://localhost:8080/employees", {
            cache: "no-store"
        })
        if(!res.ok){
            throw new Error("failed to fetch employees")
        }
        console.log(res)
        return res.json()
    }catch(error){
        console.log("error loading employees: ", error)
    }
}

export default async function PayEmployee() {
    const employees = await getEmployees()

    return (

        <div className='flex flex-col gap-4 items-center'>
            <h1 className="text-3xl text-green-900 px-11 m-5 pt-5 font-bold">Employees</h1>
            <div className=''>
                {employees.map((em) => (
                        <div key={em.id} className='py-7 px-11 flex flex-col gap-2'>
                            <Link href={`/payEmployee/${em.id}`} className="px-5 py-4 bg-blue-500 text-white w-[15rem] rounded-lg hover:-translate-y-2 transition duration-300">
                                    {em.firstname} {em.lastname}
                            </Link>
                        </div>
                ))}
             </div>

        </div>
    )
}
