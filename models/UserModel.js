import mongoose, { Schema } from "mongoose";


const userSchema = new Schema (
    {
        email: {
            type: String,
            required: [true, "email already exists"],
            unique: [true, "email should be unique "]
        },
        name: {
            type: String,
            required: [true, "name is required"]
        },
        image: {
            type: String
        },
    }
)

const Users = mongoose.models.Users || mongoose.model("Users", userSchema)
export default Users