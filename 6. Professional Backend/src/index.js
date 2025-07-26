// require('dotenv').config({path: './env'})
// import mongoose from "mongoose"
// import { DB_NAME } from "./constants";

// --> In order to use import we have to set type="module" in package.json
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import app from "./app.js";

// --> .dotenv config to use import syntax rather than using require syntax
dotenv.config({
   path: './env'
})

connectDB()
.then(() => {
   app.on("Error", (error) => {
      console.error("Error : ", error);
      throw error;
   })

   app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT}`)
   })
})
.catch((error) => {
   console.error("An error Occurred : ", error)
})






/*
import express from "express"
const app = express();

// IIFE - Immediate Function Execution
;(async () => {
   try {
      await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
      app.on("error", (error) => {
         console.error("Error", error)
         throw error;
      })

      app.listen(`${process.env.PORT}`, ())
   } catch (error) {
      console.error("Error", error);
      throw error;
   }
})()

*/