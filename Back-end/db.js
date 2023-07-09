const mongoose = require("mongoose");
const dotenv = require("dotenv");


dotenv.config();

const uri = process.env.MONGODB_URL;
const connectToDB = ()=>{
    mongoose.connect(uri)
    .then((res)=>{
        console.log("Database Connected Successfully !!");
        //and we can even fetch the data from the database without even to 
        //create a schema and a model:-
        const food_items =  mongoose.connection.db.collection("food_items");
        const food_category = mongoose.connection.db.collection("food_category");
        //so  no we have the reference to the 2 collections "food_items" and "food_category" from
        //our mongodb databse stored in the above 2 variables:
        
        food_items.find({}).toArray()
        .then((data)=>{
            global.food_items = data;
        })
        .catch((err)=>{
            console.log(err)
        });

        food_category.find({}).toArray()
        .then((data)=>{
            global.foodCategory = data ;
        })
        .catch((err)=>{console.log(err)});



            // food_items.find({}).toArray(function(error,foodItemsData){
            //     if(error){
            //         console.log(error);
            //     }
                // else{
                //     //now we also fetch the data from the 'foodCategory' collection
                //     const food_category =  mongoose.connection.db.collection("food_category");
                //     food_category.find({}).toArray(function(err,foodCategoryData){
                //         if(err){
                //             console.log(err);
                //         }
                //         else{
                //             //now we have both the data in array of 'food_items' and 'food-category' collections from our database;
                //             console.log(foodItemsData);
                //             console.log(foodCategoryData);
                //             global.food_items = foodItemsData;
                //             global.foodCategory = foodCategoryData ;
                //         }
                //     })
                // }
    })       
    .catch((err)=>{
        console.log(err);
    });
}

module.exports = connectToDB;