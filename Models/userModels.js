
//BUILD A SCHEMA FOR OUR DATABASE

import mongoose from "mongoose";

const userSchema=new mongoose.Schema({

    title:{
        type:String
    },
    description:{
        type:String
    }
});

//BUILD A MODEL FOR THE SCHEMA

const User=mongoose.model('User',userSchema);

export default User;