import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const Verify = () => {


    //to find the url parameter we will use search padm 
    const [searchParams, setSearchParams] = useSearchParams();

    //create 2 variable
    //1.we can get above httt..http://localhost:5173/verify?success=true&orderId=6638cd7f0fcb47c2b27ee6c6
    const success = searchParams.get("success")
    //2.
    const orderId = searchParams.get("orderId")

    // //check whether we are getting the data /not -so go to web clg display success&orderid
    // console.log(success, orderId);

    //we will get the backend url the context api
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        //call api
        const response = await axios.post(url + "/api/order/verify", { success, orderId });

        //res
        if (response.data.success) {
            navigate("/myorders");
        }
        else {
            navigate("/")
        }
    }


    useEffect(() => {
        //call verifypayment
        verifyPayment();
    }, [])


    return (

        //create spinner to show success
        <div className='verify'>
            <div className="spinner">

            </div>
        </div>
    )
}

export default Verify