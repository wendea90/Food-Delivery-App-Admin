import React, { useState, useContext, useEffect } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets'





const MyOrders = () => {

    //conext we need the Url &token using that we can call the API &
    const { url, token } = useContext(StoreContext);

    //fetch all the users data and save it in one state variable
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        //we will call the API 
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
        setData(response.data.data);
        // //check res -go to bro-clg we are getting the data from the API remove clg
        // console.log(response.data.data);
    }


    //whenever the token will be updated excute below fun we have to call this above fun whenever this comp't will be add useeffect
    useEffect(() => {
        //if the token is availabe run above fun
        if (token) {
            fetchOrders();
        }
    }, [token])


    return (
        <div className='my-orders'>
            <h2>
                My Orders
            </h2>
            <div className="container">
                {data.map((order, index) => {
                    return (
                        <div key={index} className="my-orders-order">
                            <img src={assets.parcel_icon} alt="" />
                            <p>
                                {order.items.map((item, index) => {
                                    if (index === order.items.length - 1) {
                                        return item.name + " x " + item.quantity
                                    }
                                    else {
                                        return item.name + " x " + item.quantity + ", "
                                    }
                                })}
                            </p>
                            <p>
                                ${order.amount}.00
                            </p>
                            <p>
                                Items: {order.items.length}
                            </p>
                            <p>
                                <span>&#x25cf;</span>
                                <b>{order.status}</b>
                            </p>
                            <button onClick={fetchOrders}>
                                Track Order
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyOrders