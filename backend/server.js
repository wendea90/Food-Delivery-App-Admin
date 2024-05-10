//1.create one basic server
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";

import userRouter from "./routes/userRoute.js";
//to support jwt_secret in usercon..
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";





//2.add one commet - app config
const app = express();
//3.difine port number - where our server will be running
// const port = 4000
const PORT = process.env.PORT || 4000

//4.add one commet - middleware -initalize the middleware and when ever we will get the request from front-end to back-end that will be passed using this json
app.use(express.json());
//4.1.using this we can access the back-end from any front-end
app.use(cors());

//5.connect to mongodb - db connection
connectDB();

//6. api end points
app.use("/api/food", foodRouter);
//7.now we can see how we can access the image using that we an show the upload image on the front-end go to server.js
app.use("/images", express.static('uploads'))
//to test open mongodb &copy image name & http://localhost:4000/images/paste here -enter so we can see image

//7.setup user router in server.js, api endpoint
app.use("/api/user", userRouter)


//8.finally initalize in Server.js for cartcontroller
app.use("/api/cart", cartRouter)

//9.placeorder api
app.use("/api/order", orderRouter);


//4.2. get method is http method using that we can request the data from server, there are update, delete.. so give path where we want to run this endpoint(API)
app.get("/", (req, res) => {
    res.send("API Working")
})

//4.3.run express server - so our basic server has been created
app.listen(PORT, () => {
    console.log(`Server Started on http://localhost:${PORT}`);
})
//to run this srever- use terminal npm run server so our express server has been started
//to test the api we will use thunder client so method get and api-http://localhost:4000 - res- api working