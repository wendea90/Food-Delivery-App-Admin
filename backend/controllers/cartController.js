import userModel from "../models/userModel.js";


//we will create 3 arrow functions 1st add to cart, remove from cart & get cart

//!add items to user cart
const addToCart = async (req, res) => {
    try {
        //add user data 
        //({}) add one object that userId we will get from auth
        let userData = await userModel.findById(req.body.userId);
        //we will get all data
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}
//so test in TC new req, post ../api/cart/add, headers so from prev login copy token and back to header token paste, go to body &write the id of food from mdb copy food id paste{"otemId:""paste"} send




//!remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        //find user data using find by id method & we will get userId from our auth(mw) -taht will decode our token &convert it in the userId
        let userData = await userModel.findById(req.body.userId);

        //we will get users data after taht extract the cart data - so from users data we have stored the cart data in this varaiale
        let cartData = await userData.cartData;
        //1st check for this itemid that i went to remove from that id if the item is avalable in cart or not sa add >0
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        //now update the new cart data (decrease one ) - new cart data is { cartData }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Removed From  Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}
//so test in TC new req, post ../api/cart/remove, headers so from prev login copy token and back to header token paste, go to body &write the id of food from mdb copy food id paste{"otemId:""paste"} send





//!fetch user cart data (get)
const getCart = async (req, res) => {
    //fetch the user cart data
    try {
        //1st using ths user id we will find user data, userId we will get using middleware
        let userData = await userModel.findById(req.body.userId);

        //2nd from this userdata we will extract the cart data - using that the user cart data will be stored in this variable 
        let cartData = await userData.cartData;
        //it generete res with success true&display cart data
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}
//so test in TC new req, post ../api/cart/get, headers so from prev login copy token and back to header token paste, go to body & send





export { addToCart, removeFromCart, getCart }