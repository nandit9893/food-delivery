import { UserModel } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// generate token
const createToken = (id) => {
    return jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET)
}



// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await UserModel.findOne({email});
        if(!user){
            return res.json({success:false, message:"User doesn't exist"})
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.json({success:false, message:"Password doesn't match"});
        }


        const token = createToken(user._id);
        return res.json({success:true, token})
    } catch (error) {
        console.error(error);
        res.json({success:false, message:"error" })
    }
}


// register user 
const registerUser = async (req, res) => {
    const {name, password, email} = req.body;

    try {
        if([name, email, password].some((field)=>field?.trim()===""))
        {
            throw new ApiError(400, "All fields are required")
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            throw new ApiError(406, "Email is not in correct format")
        }

        if(password.length<8) {
            throw new ApiError(406, "Passoword length is short")
        }

        // checking is user already exists
        const existedUser = await UserModel.findOne({email})
        if(existedUser){
            throw new ApiError(409, "User with email or username already existed")
        }


        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            name: name,
            email: email,
            password: hashPassword,
        })

        const user = await newUser.save();
        const token = createToken(user._id)
        return res.json({success:true, token})

    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Error"});
    }



}



export {
    loginUser, 
    registerUser
}