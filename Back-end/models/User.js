const mongoose = require("mongoose");

//Setting up the schema and the model to perform CRUD operations:-

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});


//now creating a model using the userSchema which will be used to perform the CRUD operations :

const User = mongoose.model("User",userSchema);


module.exports = User ;