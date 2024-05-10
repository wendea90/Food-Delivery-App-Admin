//create foodcontroller to control foodmodel in models
import foodModel from "../models/foodModel.js";
//file system(fs) - is pre-built in the nodejs
import fs from 'fs';


//!1. add food item function
const addFood = async (req, res) => {
    //!now we created post req and so next add logic food function in foodcontroller.js 
    //we can store product data in database
    //1st-add one var to store the name of image (using this we will store uploaded file name)
    let image_filename = `${req.file.filename}`;

    //2nd-create a new food in food model(when ever hit this API addFood the body body we will send those details and access it in back-end)
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try {
        //we will be saved in database called food
        await food.save();
        res.json({ success: true, message: "Food Added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

//!lets test this API endpoint
//open thunder client - app.use("/api/food", foodRouter);
//new req - post - http../api/food/add -body, form field name=name andel value=test 1, description-desc test file a// =res {"success": true,"message": "Food Added"}
//?our food item is successfully added in database and with that our image is uploaded to upload folder open&check mongodb-database
//now we can see how we can access the image using that we an show the upload image on the front-end go server.js





//! 2. we will create list API endpoint - using that we can display all food items listed in database
// all food list
const listFood = async (req, res) => {
    //create logic we can access all food item & sent them as response
    try {
        //using this model we can fetch all food items & {}in empty object we will get all the data of food item
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

//lets test open TC - new req - get endpoint-food/list, send get success full all data fetched



//! 3.creat endpoint for remove from our data base
//remove food item
const removeFood = async (req, res) => {
    //in try catch 1st find the food item that we want to delete so findbyid from req body
    try {
        //to find foodmodel using the id
        const food = await foodModel.findById(req.body.id);
        //we have to delete image of food from upload folder. () => { } is callback fun
        fs.unlink(`uploads/${food.image}`, () => { })

        //using req.body.id we can delete data from MDb
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

//?test api TC- post, /api/food/remove, body pass id food item, json {"id":"copy id & paste here"} successfully





export { addFood, listFood, removeFood }

//so we created controller fun to add food item so using this fun we will create one route