import { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlaceOrder = () => {

    //from storecontext take the token,foodlist,cartitems,url and create state variable where we will store the  information from fields
    const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

    // const navigate = useNavigate();


    //!in this data state we are getting all the data from input filed
    //from storecontext take the token,foodlist,cartitems,url and create state variable where we will store the  information from fields
    const [data, setData] = useState({
        //initalize with 1object -""means string & give properties
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })

    //onchange hundler using that we will save the input field data in above state variable
    const onChangeHandler = (event) => {
        //using the event we will extract the value input
        const name = event.target.name;
        const value = event.target.value;
        //call the setdata fun -it pass prev data, ...data menas change prev data, add name filed &update latest value
        setData(data => ({ ...data, [name]: value }))
    }


    //so useEffect use for see if it is working or not
    // //now we set all vlue and now verify it for that we will create one useEffect
    // useEffect(() => {
    //     //when ever the data will be updated it will execute this fun
    //     console.log(data);
    // }, [data])



    //arrow fun using that for placeorder /redirect to payment getway
    const placeOrder = async (event) => {
        event.preventDefault();
        //call our api 
        //before it we have to structure all the order data as we have created in the API
        //1st we will create 1variable, []in this we will add the carditem related data
        let orderItems = [];
        food_list.map((item) => {
            //check if our cart items have the product with this item id in that case we will execute this let..
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo)
            }
        })

        //it display all selected prop-y so we have created the order items lets remove clg 
        // console.log(orderItems);

        //!1.we have generated order data
        //create 1order data variable
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2,
        }
        //!2.we have sent this order data to our API 
        //we have created the order data now we will send this order from our api /call our API
        let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });

        //!3.we get the res &success true if excut
        //after call api get res
        if (response.data.success) {
            //if it is true we will get session url
            const { session_url } = response.data;
            //we have session url now send the user on this session url to send the user on session url
            window.location.replace(session_url);
        }
        //if it is false
        else {
            alert("Error")
        }
    }

    //finally we successfully redirected to stripe checkout payment


    const navigate = useNavigate();
    //if a user add products the procced to payment link work, if user not add any product to  procced to payment it redirect
    //when we click logout then we can not see  this order page untill login again now lets do the logic
    //it will excuted whenever our token gets updated. so add token dep&if stet. if the token is not available excute nvigate block
    useEffect(() => {
        if (!token) {
            navigate('/cart')
        }
        //if our cart is empty in that case we will send the user cart page
        else if (getTotalCartAmount() === 0) {
            navigate('/cart')
        }
    }, [token])



    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className='title'>
                    Delivery Information
                </p>
                <div className="multi-fields">
                    <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
                    <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
                </div>
                <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
                <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
                <div className="multi-fields">
                    <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
                    <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
                </div>
                <div className="multi-fields">
                    <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
                    <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
                </div>
                <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
            </div>


            <div className="place-order-right">
                <div className="cart-total">
                    <h2>
                        Cart Total
                    </h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            {/* getTotalCartAmount is zero we will provide 0 (===0) if it is not zero (?0:2) set the DF 2 */}
                            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            {/* check if the getTotalCartAmount is zero in that case we will provide zero(getTotalCartAmount() === 0) if it not we will provide (? 0 : getTotalCartAmount() + 2) */}
                            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                        </div>
                    </div>
                    <button type='submit'>
                        PROCEED TO PAYMENT
                    </button>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder