import React, { useEffect } from 'react'
import './Orders.css'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from "../../assets/assets"


const Orders = ({ url }) => {

    //now lets integerate this API with our admin panel
    //create 1state variable where we store data coming from API 
    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        //!call api -we will get all data in the
        const response = await axios.get(url + "/api/order/list");
        //we are geeting order data&store the order data in orderstate(setorder)
        if (response.data.success) {
            setOrders(response.data.data);
            //to check this data 
            console.log(response.data.data);
        }
        else {
            toast.error("Error")
        }
    }


    //link this api(ordercontroller.js) to admin panel on frontend, .link to select tag below
    const statusHandler = async (event, orderId) => {
        //// whenever we click option call. clg for check we click &bro clg get event display
        // console.log(event, orderId);
        //when wvwr we will change the option from dropdown that changes will be reflected in the database for that call api
        const response = await axios.post(url + "/api/order/status", {
            orderId,
            status: event.target.value
        })
        //res
        if (response.data.success) {
            //call fetch allorders fun
            await fetchAllOrders();
        }
    }


    //run above fun when ever this comp't reloaded
    useEffect(() => {
        fetchAllOrders();
    }, [])

    //test -go bro,clg we will get 3 array(product items/order details) so this api is working
    //now we will use this orders data to display the orders on this order page






    return (
        //now we will use this orders data to display the orders on this order page
        <div className='order add'>
            <h3>
                Order Page
            </h3>
            <div className="order-list">
                {orders.map((order, index) => (
                    <div key={index} className='order-item'>
                        <img src={assets.parcel_icon} alt="" />
                        <div>
                            <p className="order-item-food">
                                {order.items.map((item, index) => {
                                    if (index === order.items.length - 1) {
                                        return item.name + " x " + item.quantity
                                    }
                                    else {
                                        return item.name + " x " + item.quantity + ", "
                                    }
                                })}
                            </p>
                            <p className="order-item-name">
                                {order.address.firstName + " " + order.address.lastName}
                            </p>
                            <div className="order-item-address">
                                <p>
                                    {
                                        order.address.street + ","
                                    }
                                </p>
                                <p>
                                    {
                                        order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode
                                    }
                                </p>
                            </div>
                            <p className='order-item-phone'>
                                {order.address.phone}
                            </p>
                        </div>
                        <p>
                            Items : {order.items.length}
                        </p>
                        <p>${order.amount}</p>
                        <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                            <option value="Food Processing">Food Processing</option>
                            <option value="Out for delivery">Out for delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default Orders