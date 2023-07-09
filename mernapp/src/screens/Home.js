import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousel from '../components/Carousel'
import axios from "axios";





const Home = () => {
    //whenever our home page first renders we want to fetch the data from the server stored in the
    //'food_items' and 'food_category' collections in our mongodb using useEffect hook and axios as a medium:-
    useEffect(()=>{
        axios.post("https://snapsnacks-server.onrender.com/api/foodData",{})
        .then((res)=>{
            //now this response will be an array with 2 nested array elements
            //first element array stores all the food_items documents
            //second element array stores all the food_category documents:
            setFoodItems(res.data[0]);
            setfoodCat(res.data[1]); 
        })
        .catch((err)=>{console.log(err)});
    },[]);
    
    
    //STATE VARIABLES:-
    const [foodCat, setfoodCat] = useState([]);
    const [foodItems, setFoodItems] = useState([]);
    const [search, setSearch] = useState("");

    //FUNCTIONS:-
    function handleSearch(searchText){
        setSearch(searchText);
    }



    return (
        <div>
            <div><Navbar /></div>
            <div><Carousel Search={handleSearch} /></div>
            <div className='text-center justifyContent-center m-auto'><h1 className='mt-4'><strong><img src="https://media.giphy.com/media/uCj0XRIzYRUTan5rBe/giphy.gif" style={{"height":"77px"}} alt='MENU' className='d-inline'/><img src="https://media.giphy.com/media/lOrwtrEN8S0DfVI8Bz/giphy.gif" style={{"height":"77px"}} alt='MENU' className='d-inline' /><img src="https://media.giphy.com/media/S5W6jONq0CVLj6WFUO/giphy.gif" style={{"height":"77px"}} alt='MENU' className='d-inline'/></strong></h1></div>
            <hr style={{"backgroundColor":"white"}}></hr>
            <div className='container'>
            {foodCat && foodCat.map((categoryDoc,index)=>{
                return(<div className='row mb-3' >
                <div key={categoryDoc._id} className='m-3 fs-3' >
                {categoryDoc.CategoryName}
                </div>
                    <hr/>
                    {foodItems && foodItems.filter((foodItem,i)=>{
                        return(foodItem.CategoryName===categoryDoc.CategoryName &&
                        foodItem.name.toLowerCase().includes(search.toLowerCase())
                        );
                    }).map((filterItem,ind)=>{
                        return(<div key={filterItem._id} className='col-xs-12 col-md-6 col-lg-3'>
                            <Card
                            id={filterItem._id}
                            categoryName={filterItem.CategoryName} 
                            name={filterItem.name}
                            image={filterItem.img}
                            options={filterItem.options[0]}
                            description={filterItem.description}
                             />
                        </div>);
                    })
                    
                    }
                </div>);
            })}
            </div>
            <div><Footer /></div>
        </div>
    )
}

export default Home