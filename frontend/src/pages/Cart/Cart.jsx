import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';

const Cart = () => {

    //first we will access our cart items food list, remove from card functionality from our context.
    const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);

    //link to place order by navigate
    const navigate = useNavigate();

    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />

                {/* we can get all food list  from our food items then compare our cart items & food items that food item is available for in this cart item then we will display it in the cart page*/}
                {
                    food_list.map((item, index) => {
                        // // Check if the item exists in the cartItems and has a quantity greater than 0 . if our cart items contains one product with this item id in that case we will return one.I've added a key prop to each div element in the mapped array. The key prop should be unique for each item and helps React identify which items have changed.
                        if (cartItems[item._id] > 0) {
                            return (
                                <div key={index}>
                                    <div className='cart-items-title cart-items-item'>
                                        <img src={url + "/images/" + item.image} alt="" />
                                        <p>{item.name}</p>
                                        <p>${item.price}</p>
                                        <p>{cartItems[item._id]}</p>
                                        <p>${item.price * cartItems[item._id]}</p>
                                        <p
                                            onClick={() => removeFromCart(item._id)}
                                            className='cross'>x</p>
                                    </div>
                                    <hr />
                                </div>
                            );
                        }
                        // Add a default return value if the condition is not met
                        return null;
                    })
                }


            </div>

            <div className='cart-bottom'>
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
                    <button
                        onClick={() => navigate('/order')}
                    >
                        PROCEED TO CHECKOUT
                    </button>
                </div>

                <div className='cart-promocode'>
                    <div>
                        <p>If you have a promo code, Enter it here</p>
                        <div className="cart-promocode-input">
                            <input type="text" placeholder='promo code' />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart