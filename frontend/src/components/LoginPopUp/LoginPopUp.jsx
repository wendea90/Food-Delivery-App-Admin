import React, { useState, useEffect, useContext } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"



const LoginPopUp = ({ setShowLogin }) => {

    // fetch the url from storecontext.jsx  using the context api
    const { url, setToken } = useContext(StoreContext)
    //so we can use this url for login comp't below -onlogin


    //to display login/sign up crate state variable
    const [currState, setCurrState] = useState("Login")

    //!integrrete to backend
    //1st create a state variable where we will save users name,email&pw
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })


    //2nd create onchange hundler - taht will take the data from the input field(front-end) and save it in the state variable(back-end)
    const onChangeHandler = (event) => {
        //extract name &value
        const name = event.target.name;
        const value = event.target.value;

        //set this value in the state variable
        setData(data => ({ ...data, [name]: value }))
        //so link this onchange hundler with input field below. add name&onchange,value
    }

    // //open on web &clg test when we are updating the fileds it updating on clg
    //     //to verify the above (action)
    //     useEffect(() => {
    //         console.log(data)
    //     }, [data])



    //for login user create fun
    const onLogin = async (event) => {
        //link to form tag below onsubmit &btn-type='submit'

        event.preventDefault();

        //add logic that call the API
        //so we need axios support in the front-end so install it
        //now API call with istance of above url -so we created copy of url
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login"
        }
        else {
            //not login so isgnup
            newUrl += "/api/user/register"
        }

        //call the api -so this api is work for two login/signup
        const response = await axios.post(newUrl, data);

        //get 1res -when it is true we have loggedin/reg-ed
        //we will get 1token to save the token we will use one state variable in storecontext.jsx
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false)
        }
        else {
            alert(response.data.message)
        }
    }





    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>
                        {
                            currState
                        }
                    </h2>
                    <img
                        onClick={() => setShowLogin(false)}
                        src={assets.cross_icon}
                        alt="" />
                </div>
                <div className="login-popup-inputs">
                    {/* we need to hide your name field when it is signin */}
                    {currState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.value} type="text" placeholder='Your name' required />}

                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Your password' required />
                </div>

                {/* if our current state is sign up(currState === "Sign Up") we will return one string(? "Create Account") create account and if the state is not equal to sign up (: "Login")we will return one strign sign in */}
                <button type='submit'>
                    {
                        currState === "Sign Up" ? "Create Account" : "Login"
                    }
                </button>

                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>
                        By continuing, I agree to the terms of use and privacy policy
                    </p>
                </div>


                {/* we have to display states when it is login/up */}
                {currState === "Login"
                    ?
                    <p>
                        Create a New account?
                        <span
                            onClick={() => setCurrState("Sign Up")}>
                            Click here
                        </span>
                    </p>
                    :
                    <p>
                        Already have an account?
                        <span
                            onClick={() => setCurrState("Login")}>
                            Login here
                        </span>
                    </p>
                }
            </form>
        </div>
    )
}

export default LoginPopUp