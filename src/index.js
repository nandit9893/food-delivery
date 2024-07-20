import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config();

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port: http://localhost:${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed!!!", err);
  });


















/*
import express from "express";
import mongoose from "mongoose";
import { DB_NAME } from "./constants"
const app = express();



( async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("Error", (error)=>{
            console.log("ERROR", error);
            throw error;
        })
        app.listen(process.env.PORT, () =>{
            console.log(`App is listening on port ${process.env.PORT}`);

        })

    } catch (error) {
        console.log("Error: ",error);
        throw error;
    }
}) ()*/