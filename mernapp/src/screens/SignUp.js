import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
    const navigateTo = useNavigate();

    //STATE VARIABLES:-
    //since the form data entere by the user is dynamic on our react app
    //we ned to create a state variable for the same:-
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });

    //FUNCTIONS :-
    function handleChange(e) {
        setCredentials((prevCredentials) => {
            return ({ ...prevCredentials, [e.target.name]: e.target.value });
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        //MEHTOD-1:-
        //USING AXIOS LIBRARY
        //LATEST,QUICK,EASY,BEST !!:-
        axios.post("https://snapsnacks-server.onrender.com/api/createuser", {
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
            location: credentials.geolocation
        })
            .then((res) => {
                console.log("Successfully added a new user!!");
                navigateTo("/login");
            })
            .catch((err) => {
                alert("Enter Valid Credentials !!")
                console.log(err);
            });





        // try {
        //     //we make a post request to the '/createuser' route on our backend to add a new user to the database:-
        //     //we use the fetch api to make http requests to our server at "http://localhost:5000/"
        //     let response;
        //     response = await fetch("http://localhost:5000/api/createuser", {
        //         method: "POST",
        //         headers:{
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify({
        //             name: credentials.name,
        //             email: credentials.email,
        //             password: credentials.password,
        //             location: credentials.geolocation
        //         })
        //     })

        //     //the response variable here is a javascript object with multiple properties(key:value pairs)
        //     //and one property we can use to validate
        //     //whether the request made to our server using this fetch api was successfull or not is:-
        //     //'ok' property or key which stores a boolean 'true/false' or we can use 'status' which stores 
        //     //the status number such as '200'(if all went good) '400'(server error) '404'(not found error)

        //     if(response.ok){
        //         navigateTo("/login");
        //     }
        //     else{
        //         return response ;
        //     }


        // } catch (error) {
        //     console.log(error);
        // }


    }


    return (
        <div className='container m-4'>
            <h3 className='ml-0'>SignUp</h3>
            <form onSubmit={handleSubmit} className='mt-4'>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input name="name" value={credentials.name} onChange={handleChange} type="text" className="form-control" id="name" placeholder="name should contain atleast 3 characters" />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input name="email" value={credentials.email} onChange={handleChange} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="example@email.com" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input name="password" value={credentials.password} onChange={handleChange} type="password" className="form-control" id="password" placeholder="Password must contain atleast 7 characters" />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input name="geolocation" value={credentials.geolocation} onChange={handleChange} type="text" className="form-control" id="address" placeholder="Enter Address.." />
                </div>
                <button name="submitButton" type="submit" className="mt-3 btn btn-outline-success">SignUp</button>
                <NavLink to="/login"><button type="button" className="mt-3 btn btn-outline-info" style={{ "marginLeft": "7px" }}>Already a user ?</button></NavLink>
            </form>

        </div>
    );
}

export default SignUp;