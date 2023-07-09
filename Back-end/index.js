//SETTING UP THE SERVER:-
const express = require("express");
const connectToDB = require("./db.js");
const app=express();
const port =5000;
const cors = require("cors");
const router1 = require("./Routes/CreateUser.js");
const router2 = require("./Routes/DisplayData.js");
const router3 = require("./Routes/OrderData.js");
//connecting to the database:-
connectToDB();

//USING MIDDLEWARES:-

//to validate/allow the http requests to be made to our server we need to :-
app.use(cors());


//this line of code tells the server which type of data the server will be recieving and 
//the type of responses the server needs to make to the http requests:-
app.use(express.json());

//for any url comprising of root:- "http://localhost:5000/api" we use another middleware and pass the router corresponding to it:-
app.use("/api",router1); 
app.use("/api",router2);
app.use("/api",router3);




app.get("/",(req,res)=>{
    res.send("<h1>You are on the home route of my server !!</h1>");
})


app.listen(port,()=>{
    console.log("Server started on port 5000 !!");
})