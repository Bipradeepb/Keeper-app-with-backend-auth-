import express from "express";
import mongoose from "mongoose";
import User from "../Models/userModels.js";

const router=express.Router();

//API is created 

//Get all the data in the database
router.get("/",async(req,res)=>{

    try {
        
        const allData=await User.find();
        // console.log("Displaying all data...");
        // console.log(allData);
        res.status(201).json(allData);

    } catch (error) {
        
        console.log(error);
        res.status(404).json(error);
    }

});

//Post new data in the database
router.post("/",async(req,res)=>{

    console.log(req.body);

    try {
        
        const userAdded=await User.create({
            title:req.body["title"],
            description:req.body["description"]
        });

        // console.log("User added successfully.");
        // console.log(userAdded);
        res.status(201).json(userAdded);

    } catch (error) {

        console.log(error);
        res.status(404).json(error);
    }

});


//Delete existing data in the database
router.delete("/:id",async(req,res)=>{

   const {id}=req.params;

   try {
       
       const userDeleted=await User.findByIdAndDelete({_id:id});

    //    console.log("User deleted");
    //    console.log(userDeleted);

       res.status(200).json(userDeleted);

   } catch (error) {

        console.log(error);
        res.status(404).json(error);
   }

});


export default router;
