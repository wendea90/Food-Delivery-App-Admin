//we use explore menu component to filter our product
//create food display compo.t where we display multiple food items
//to display food items 1st set up context API in our project
//StoreContext.jsx API - create

import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
import axios from "axios"



export const StoreContext = createContext(null)

//now create storecontextprovider function
const StoreContextProvider = (props) => {

    //when we have 32 products it is creating one state variable for each product that is not best practice to solve the problem create one cartItem object in our context api and manage these product cart data using manage cart functionality so create state variable(cartItem)
    const [cartItems, setCartItems] = useState({});

    //define url for backend to store name,email&pw and pass this variable in the contextvalue so we can access this url in any comp't
    const url = "http://localhost:4000"

    //create 1state var we have loggedin/reg-ed we will get 1token to save the token we will use can use state variable in loginpopup and pass it below
    const [token, setToken] = useState("");


    //Fetch food data on frontend from database
    // preiously we get all frood items from assets file so we need to change it to db lets go to storecontext.jsx file so create one state variable with name of food. intialize with empty array so comment asset one
    const [food_list, setFoodList] = useState([]);


    //!2nd add to cart and remove from cart functionality
    const addToCart = async (itemId) => {
        //1st check the user is adding the product 1st time in the cart - if cart items id is not available use..
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }

        //check if we have a token available so what every item is added in the card we will update that in the database also
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
        }
    }
    // so when we logged in we will have the token in that case when we will add the product in the cart that product will be added in the database cart data also so lets test so go to web bro st loggin + add any item food + comeback to db refreash item increase





    //!in remove from cart  function after else statement add one if statement(decrease item when we remove)
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))

        //if we have a token means user is looged in so create api req
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
        }
    }
    //test by remove




    //create im cart total price and subtotal
    const getTotalCartAmount = () => {
        //1st -add one varible with name total and initialize it with zero
        let totalAmount = 0;
        //2nd -use the cart items in foreign loop so add
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    //useeffect - for action & to check the cart items
    // useEffect(() => {
    //     console.log(cartItems);
    // }, [cartItems])


    //add arrow fun to create a function  using that we can load the food items in the state from database
    const fetchFoodList = async () => {
        //call API, get method b/c we have created the food list API using the get method, when we hit this url we get all food list
        const response = await axios.get(url + "/api/food/list")

        setFoodList(response.data.data)

        //now run this fun whenever the web page is loaded on useeffect
    }



    // when we increase product 4..and refresh web it display none so to fix it create 1 arrow fun 
    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
        //get res where we will get the cartdata so we will save that cart data in 1variable the name will be cartitems
        setCartItems(response.data.cartData);
        //call below loadCartData for when ever the page reloded
    }




    // when we refreash web it logout lets fix storecontext.jsx add logic using local storage using that the local storage data will be saved in the token state when we will refresh th web page so when we refreash web it not logout
    useEffect(() => {
        //now run this fun whenever the web page is loaded on useeffect
        // Define an asynchronous function to load data
        async function loadData() {
            await fetchFoodList();

            //when we will refresh th web page so when we refreash web it not logout  
            // Load cart data if token exists
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));

                //call below loadCartData for when ever the page reloded
                await loadCartData(localStorage.getItem("token"));
            }
        }

        // Call the loadData function
        loadData();

    }, []);
    // Empty dependency array means this effect runs only once, equivalent to componentDidMount



    //create varaiable - it will be one object
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}


export default StoreContextProvider;