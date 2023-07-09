const express = require("express");
const router = express.Router();
const {body,validationResult} = require("express-validator");
// to securely save passwords in our database we install and use the 'bcryptjs' npm module:-
const bcrypt = require("bcryptjs");

//and to save our user login status and store it into cache in our browser and validate requests
const jwt = require("jsonwebtoken");
const secretKey = "My_Name_Is_HarmanSinghSuri_!!";

//importing the mongodb model:-
const User = require("../models/User");



//Handling post request to create a new user document and add it into the database:-

//first way:-
router.post("/createuser",[
body("name","Enter name with minimum 3 characters!!").isLength({min:3}),
body("password","Enter password with minimum 7 cahracters!!").isLength({min:7}),
body("email","Enter email is not a valid format !!").isEmail()
],async(req,res)=>{
    //firs twe will check the validation result of the above validation checks 
    //applied on the req.body being pssed through the post request:-
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        //means there are some errors as some of the validation checks did not pass:-
        return res.status(400).json({errors:errors.array()});
    }

    //otherwise it means the data has pased all validation checks and we can simply 
    //use the data to do operations as required as the data is according to our
    //required format and structure:-


    const { name,email,password,location,date } = req.body ;
    try {

        //before storing the data in our database we secure the password entered by the user :-
        //by hashing the password using the bcrypt npm module and its functionality:-
        //STEPS TO HASH THE PASSWORD:-
        //Step-1:- Create salt:-
        const salt = await bcrypt.genSalt(10);
        //Step-2:-Create a hash by combining both the password text and the salt :-
        const hashedPassword = await  bcrypt.hash(password,salt);
        //Now we store this hashedPassword in our database so that even if our dataabse got hacked/compromised:
        //even then the hacker will not be able to crack the password since re-hashing the hashedPassword
        //takes a very very  long time ...

        User.create({
            name:name,
            email:email,
            password:hashedPassword,
            location:location,
            date:date
        })
        .then((response)=>{ res.send({"success":true})})
        .catch((err)=>{
            console.log(err);
            res.send(err);
        });

        
    } catch (error){
        console.log(error);
    }
    
    
    
    
    //Method-1:-
    // let response;
    // try {
    //     response = await User.create({
    //         name,
    //         email,
    //         password,
    //         location,
    //         date
    //     });

    //     //validation code:-
    //     if(response){
    //         res.status(200).json({message:"Successfully added a new document !!"});
    //     }
    //     else{
    //         res.status(500).json({message:"Oops, Could'nt add new user !!"});
    //     }
        
    // } catch (error){
    //     console.log(error);
    // }
    
    //METHOD -2 :-
    // //creating a new document :-
    // const newUser = new User({name,email,password,location,date});
    // //saving that document in the database:-
    // newUser.save()
    // .then((response)=>{
    //     console.log(response);
    //     res.send("Successfully added the new Document !!");
    // })
    // .catch((err)=>{
    //     console.log(err);
    //     res.send(err);
    // })
})


///HANDLING THE LOGIN DATA AND VALIDATING THE USER ENTERED DETAILS BY COMPARING IT WITH
// DATA STORED IN TEH DATABASE:-

router.post("/login",[body("email","Enter valid email(like:- example@email.com)").isEmail(),
body("password","Enter password with minimum 7 characters!!").isLength({min:7})
],async (req,res)=>{
    //first we check the validation result of our data being validated through the validatore:-
    const error = await validationResult(req);
    if(error.isEmpty()){
        //if there are no errors:-
        User.findOne({email:req.body.email})
        .then(async(userFound)=>{
            //now if there is a user document corresponding to the email entered by the user
            //then we compare the password enetered by using bcrypt to compare or to check:
            //whether the hash code stored in database corresponding to that user matches
            //the password enetered by the user as text as (hash_code_body = salt + password_text)
            const matched = await bcrypt.compare(req.body.password,userFound.password);
            if(matched){
                //means user has enetered all correct credentials:-
                console.log("User data matches the database data !!");
                //now we create a authToken using the jsonwebtoken module to uniquely identify user login seesions:-
                const data = {
                    user:{
                        id:userFound._id
                    }
                }
                const auth_token = jwt.sign(data,secretKey);
                console.log(auth_token);
                res.send({success:true,authToken:auth_token});
            }
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    else{
        res.send("Please Enter Valid Credentials !!");
    }
})








module.exports = router;