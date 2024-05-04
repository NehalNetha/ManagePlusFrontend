import mongoose from "mongoose"

const connectMongoDB = async () => {
    try{
        await mongoose.connect("mongodb+srv://guitar:guitar249@cluster0.maflcid.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    }catch(error){
        console.log(error)
    }

}


export default connectMongoDB;