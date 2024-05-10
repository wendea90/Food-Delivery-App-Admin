import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

//create one route using exprese router
const userRouter = express.Router();

//we need the data of the user like email id and password
userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)


export default userRouter;

//setup user router in server.js