"use client"
import { Logout } from '@mui/icons-material'
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import Image from 'next/image'


export default function Navbar() {



  const {data: session} = useSession()

  return (
    <div className=' flex flex-row justify-between p-3'>
        <div>

            <form class="max-w-md mx-auto w-[30rem]">   
                <label for="default-search" class="mb-2 text-sm font-medium sr-only dark:text-white">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm  border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-300 " placeholder="Search Pages, companies, vendors" required />
                    <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>

        </div>
        {/* <div className='h-[2.9rem] border-2 border-gray-100 items-center hover:bg-gray-200 text-black font-medium py-2 px-4 rounded-lg ' onClick={() => signIn("google")}>
            Sign In
        </div> */}
         {session ? (
                <div onClick={() => signOut()} className='pr-9 cursor-pointer  flex flex-row gap-5 mt-4' >
                    <Image src= {session.user.image} className='w-[1.8rem] h-[1.8rem] rounded-full mt-1'
                      alt = "account image"
                      width={200}
                      height={200}

                    />
                    <div className=' cursor-pointer flex flex-row gap-4 h-[2.9rem] border-2 border-gray-100 items-center hover:bg-gray-200 text-black font-medium py-2 px-4 rounded-lg ' onClick={() => signOut()}>
                        <Logout className='text-[1.4rem] '/>
                        Sign out
                    </div>
                    

                    
                </div>
              ) : ( 
                <div onClick={() => signIn("google")} className='p-3'>

                   <div className='h-[2.9rem] border-2 border-gray-100 items-center hover:bg-gray-200 text-black font-medium py-2 px-4 rounded-lg ' onClick={() => signIn("google")}>
                        Sign In
                    </div>
                
                </div>
              )}
    </div>
  )
}
