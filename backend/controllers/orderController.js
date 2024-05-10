import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//create arrow fun placeorder using that we can place the users oredr

//1st placing user order from front-end 
const placeOrder = async (req, res) => {

    //frontend url run
    // const frontend_url = "http://localhost:5173";
    const frontend_url = "http://localhost:5173";

    //add a logic using that we place order
    try {
        //new order
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })

        //it will saves the order in our db
        await newOrder.save();

        //after user the user we have to clear the users cart -1st we will provide userId &2nd provide obj &cartdata with empty obj it will clear cart data
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        //create the payment link -1st create line items w/c we will insert all the product data curr-y&uniqe amount&quantity
        const line_items = req.body.items.map((item) => ({
            //set price data property
            price_data: {
                currency: "etb",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 80
            },
            quantity: item.quantity
        }))

        //push delivery charges 
        line_items.push({
            price_data: {
                currency: "etb",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 * 80
            },
            quantity: 1
        })



        //now using this line items we will create session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({ success: true, session_url: session.url })




    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}
//now link this api with the our frontend


//!we will itegrete this verify order api with our frontend
//SO IF Success will be false we will delete the order so go tobackend
//create 1verify order method
const verifyOrder = async (req, res) => {
    //order id &success we will get it from req
    const { orderId, success } = req.body;
    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" })
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}




//create arrow fun user orders so we can send the users order using api
//user orders for frontend
const userOrders = async (req, res) => {
    //we will find the all orders of that user using their userId
    try {
        const orders = await orderModel.find({ userId: req.body.userId })
        //user will get all the orders details
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

//test api endpoint open TC-new req,post /api/order/userorders, headers paste token send, we will get all orders



//!API has been created
//create arrow fun using that we can find all the orders of all users
//listing orders for admin panel
const listOrders = async (req, res) => {
    //add logic to fetch all the order details
    try {
        //using this we will get all the orders data in this variable
        const orders = await orderModel.find({});
        //now using API we have send 
        res.json({ success: true, data: orders })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

//test TC-get,http://localhost:4000/api/order/list, send so we get all as object



//we will create a new API for updating the status
//API for updating order status
const updateStatus = async (req, res) => {
    try {
        //1st find the order by using Id then we will update the value so we will get the order id &status from req.body &send while calling api
        ////we will be updated in database after that we will generate
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: 'Status Updated' })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' })
    }
}

//test this api, 1st we need orderId -get from mdb copy, TC, new req, post, http://localhost:4000/api/order/status, body-{"orderId":"paste""status":"out for delivery"} send


export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus }