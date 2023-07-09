const express = require("express");
const router = express.Router();


//router set up///////////////////////////////////////////////////////////////


router.post("/foodData", (req, res) => {
    try {
        //we will send the food Data stored in the 'food_items' collection in our database:-
        res.send([global.food_items, global.foodCategory]);

    } catch (error) {
        console.log(error);
    }

})































/////////////////////////////// Exporting the router ///////////////////////////////////////////////////

module.exports = router;