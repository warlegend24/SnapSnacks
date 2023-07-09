// ths is a new collection to store the orders of the users in a seperate collectio
// storng their email and their orders array in the collection called 'orders':
const mongoose = require("mongoose");

//creating a new schema:-
const orderSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    order_data:{
        type:Array,
        required:true
    }
});

//now creating  model using this schema:-

const Order = mongoose.model("Order",orderSchema);



//exporting the model which can be used by importing elsewhere in the server
module.exports = Order ;