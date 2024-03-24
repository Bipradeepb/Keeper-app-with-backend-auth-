import express from "express";
import bodyParser from "body-parser";
import router from "./Routes/userRoutes.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

const PORT=5000;
const app=express();
dotenv.config();

app.use(cors());//always place above the routes to allow cross-origin requests
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(router);


const connectDB=async()=>{

    try {
        const resp=await mongoose.connect(process.env.URI);

        console.log("Connected successfully");
        //console.log(resp);

    } catch (error) {

        console.log(error);
    }
}

//CREATE a DATABASE
connectDB();

app.listen(process.env.PORT,(err)=>{

    if(err)
    {
        console.log(err);
    }

    console.log(`Server is listening at port ${PORT}.`);
});
