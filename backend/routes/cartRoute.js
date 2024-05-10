//user 3 fun from cartcontroller to create 3 route
import express from "express"

import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js"
import authMiddleware from "../middleware/auth.js";

//create 1express router
const cartRouter = express.Router();


//using this router we will create multipe end points(API)
//ro add to cart fun
cartRouter.post("/add", authMiddleware, addToCart);
//remove 
cartRouter.post("/remove", authMiddleware, removeFromCart);
//get
cartRouter.post("/get", authMiddleware, getCart);


export default cartRouter;

// finally initalize in Server.js