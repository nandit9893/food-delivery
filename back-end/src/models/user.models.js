import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        cart: {
            type: Object,
            default: {}
        }
    },
    {
        minimize: false
    }
)
const UserModel = mongoose.model("UserModel", userSchema)

export { UserModel }