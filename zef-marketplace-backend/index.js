import express from "express";
import path from "path";
import dotenv from "dotenv";
import connectDb from "./config/connectDb.js";
dotenv.config({path : "./config.env"});
const app = express();

connectDb();
const port = process.env.PORT || 5000 ;

app.listen(port , () => {
  console.log(`app is running on port ${port}`);
})

