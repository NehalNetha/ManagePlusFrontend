import NextAuth from "next-auth/next"
import GoogleProvider from 'next-auth/providers/google'
import mongoose from "mongoose"

import Users from "@/models/UserModel"
import connectMongoDB from "@/libs/mongodb"

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_SECRET =  process.env.GOOGLE_SECRET
const NEXTAUTH_SECRET = process.env.NEXT_SECRET


const authOption = {
    secret: NEXTAUTH_SECRET,

    session: {
        strategy: 'jwt',
    },
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_SECRET,
        }),
    ],
    callbacks: {
     

        async session({session}){
            try{
                await connectMongoDB()
                const user = await Users.findOne({email: session.user.email})

                const sessionUser = await Users.findOne({email: session.user.email})
                if (sessionUser){
                    session.user.id = sessionUser._id
                }

                console.log(session.user.id)
                console.log(sessionUser)

                return session
            }catch(error){
                console.log(error)
                throw error
            }
        },
        async signIn({profile}){
            console.log(profile)
            try{
                await connectMongoDB()

                if (profile){

                    const userExist = await Users.findOne({email: profile.email})

                    if (!userExist) {
                        const user = await Users.create({
                            email: profile.email,
                            name: profile.name,
                            image: profile.picture
                        })
                }
                }


                return true 
            }catch(error){

                console.log(error)
                return false

            }
        }
    },
}




const handler = NextAuth(authOption)
export { handler as GET, handler as POST }