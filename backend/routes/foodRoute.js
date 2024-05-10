// create api for foodmodel from foodcontroller
import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
//multer for image storage
import multer from "multer";

//create express router
const foodRouter = express.Router();
//our router has been created so using this router we can use get,post..methods

//!create post req - we use post(upload file) method to send a data to server and addFood function 

// foodRouter.post("/add", addFood)


//create logic of using that image will be saved in ipload folder
//Image Storage Engine - when every we will upload one file our time stamp will be added in now and FON
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

//we can use this storage configrution 
const upload = multer({ storage: storage })
//so middleware upload has been created using this we can store image in upload folder


//so now so middleware upload has been created using this we can store image in upload folder
//!now we created post req and so next add logic food function in foodcontroller.js 
foodRouter.post("/add", upload.single("image"), addFood);

//! we will create list API endpoint - using that we can display all food items listed in database 
// all food list
foodRouter.get("/list", listFood);
//3.api -remove food item
foodRouter.post("/remove", removeFood);



export default foodRouter;
//and set up it in server.js