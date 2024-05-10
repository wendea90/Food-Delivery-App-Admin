import mongoose from "mongoose";

//create schema for food model  - where we will describe the food model properties
//in our food data 1st add name, one object{}, type propertie..
const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

//using this schema we will create the model
// const foodModel = mongoose.model("food", foodSchema);

//the above schema will created once but when we run this schema again it creates model again so to fix - so mongoose.models.food(means if the model is already there it will be used, if not there mongoose.model("food", foodSchema)(create new model))
const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);


export default foodModel;


//1. now our first model has created
// 2. create API using this we can add new item in our database - controllers folder and create foodController.js