import express from "express"
import authMiddleware from "../middleware/auth.js"
import { placeOrder, verifyOrder, userOrders, listOrders, updateStatus } from "../controllers/orderController.js"


//using express creATE Router
const orderRouter = express.Router();

//using this router we will create multiple end point API
orderRouter.post("/place", authMiddleware, placeOrder);

//to cancel
orderRouter.post("/verify", verifyOrder);

orderRouter.post("/userorders", authMiddleware, userOrders);

//for listing orders in admin pannel endpoint
orderRouter.get('/list', listOrders);

//create a new API ,API for updating order status
orderRouter.post("/status", updateStatus);


export default orderRouter;

//now we will use this router in server.js


