const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//importing the model :-
const Order = require("../models/Order");




router.post("/orderData", async (req, res) => {
    //destructuring the data:-
    const { email, order_data } = req.body;
    //we first check if the user already exists in the databse or not 
    //i.e if the user has already made some order in the past then we simply push the new order
    // in the order_data array:-
    let already = [];
    try {
        already = await Order.find({ email: email })
        console.log(already);
        //manipulating the order_data array before adding it tot hte database:-
        order_data.unshift({order_date:new Date().toLocaleString()});

        if (already.length === 0) {
            //mean the user doesnot already exists .i.e it is the users first order so we simply 
            //create a new document and save it in the database:
            try {
                //method-1: using the model.create() function:-
                let response = await Order.create({
                    email: email,
                    order_data: [order_data]
                });

                if (response) {
                    return res.status(200).json({ success: true, messsage: "Order Placed Sucessfully !!" });
                }

                // //method-2:-
                // const newUserOrder = new Order({
                //     email:email,
                //     order_data:order_data
                // });
                // newUserOrder.save().then((response)=>{
                //     res.send({success:true,messsage:"Order Placed Sucessfully !!"})
                // }).catch((err)=>{console.log(err)});

            } catch (error) {
                console.log(error);
                return res.status(400).json({ success: false, message: "Error in placing the order!!" });
            }

        }

        else {
            //if the user already exist in the database then we simply push into the 
            //existing 'order_data' array of the user to mark it as a new order :-
            let updatedUser = already[0];
            updatedUser.order_data.unshift(order_data);

            //now to save it in the document we update it at its position :-
            Order.findOneAndUpdate({ email: email }, updatedUser)
                .then((response) => {
                    res.send({ success: true, message: "Successfully Updated a new order !!" })
                })
                .catch((err) => {
                    console.log(err);
                })
        }

    } 
    catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: "Error in placing the order!!" });
    }



});



router.post("/getOrders",async(req,res)=>{
    const {email} = req.body;

    //now we have to find the user with the mail passed from the front-end through the req.body
    //inside the database an return all the data after manipulations in a structured and easy to use
    //way:-

    Order.findOne({email:email})
    .then((dataFound)=>{
        res.send({ordersArr : dataFound.order_data});
    })
    .catch((err)=>{console.log(err)});



});








module.exports = router;