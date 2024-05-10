import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';


const Navbar = ({ setShowLogin }) => {

    //underline effect on menu lists when i click
    //1st initalize with menu
    const [menu, setMenu] = useState("menu");

    //to show cart on top of cart icon
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);


    const navigate = useNavigate();


    //lets make logout functionality &excut below
    const logout = () => {
        //for logout remove the token from localstorage
        localStorage.removeItem("token");

        //from token state we will remove the token it will be empty string
        setToken("");

        //after that when user will be logged out we will send them homepage-by navigate
        navigate("/")
    }



    return (
        <div className='navbar'>
            {/* left */}
            <Link
                to='/'>
                <img src={assets.logo} alt="" className='logo' />
            </Link>

            {/* center */}
            <ul className='navbar-menu'>
                {/* when you onclick you are seting specific list */}
                <Link
                    to='/'
                    onClick={() => setMenu("home")}
                    className={menu === "home" ? "active" : ""}
                >
                    Home
                </Link>
                <a href='#explore-menu'
                    onClick={() => setMenu("menu")}
                    className={menu === "menu" ? "active" : ""}
                >
                    Menu
                </a>
                <a href='#app-download'
                    onClick={() => setMenu("mobile-app")}
                    className={menu === "mobile-app" ? "active" : ""}
                >
                    Mobile
                </a>
                <a href='#footer'
                    onClick={() => setMenu("contact-us")}
                    className={menu === "contact-us" ? "active" : ""}
                >
                    Contact us
                </a>
            </ul>

            {/* right */}
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />

                <div className='navbar-search-icon'>
                    <Link
                        to='/cart'
                    >
                        <img src={assets.basket_icon} alt="" />
                    </Link>
                    {/* if the total amount of cart is zero render empty / render dot(means totalAmount) */}
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}>

                    </div>
                </div>
                {!token ? <button
                    onClick={() => setShowLogin(true)}
                >
                    Sign In
                </button>
                    : <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="" />
                        <ul className="nav-profile-dropdown">
                            <li onClick={() => navigate('/myorders')}>
                                <img src={assets.bag_icon} alt="" />
                                <p>
                                    Orders
                                </p>
                            </li>
                            <hr />
                            <li
                                onClick={logout}>
                                <img src={assets.logout_icon} alt="" />
                                <p>
                                    Logout
                                </p>
                            </li>
                        </ul>
                    </div>}

            </div>
        </div>
    )
}

export default Navbar