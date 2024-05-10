import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios"
import { toast } from 'react-toastify'



const List = ({ url }) => {
    //to Back-end

    // const url = "http://localhost:4000"

    //1st we have to store all the data from the database into one state variable -initialize it with empty array
    const [list, setList] = useState([]);

    //2nd fetch list function
    const fetchList = async () => {
        //here add api call - the res by get method & insert url from above - so when we hit this api we will get the res with food items data
        const response = await axios.get(`${url}/api/food/list`)
        //!finally check so go to web bro click list &clg there is list of items successfully so now display it on UI below
        // console.log(response.data);
        //re.data succes means the data has been loaded in the res var in that case we will load those data in the state var so add setList...so our res data will be saved in list var
        if (response.data.success) {
            setList(response.data.data)
        } else {
            toast.error("Error")
        }
    }
    //fetch list function has been created


    //to remove food 'X'
    const removeFood = async (foodId) => {
        //check wetehere we can get id then remove& remove prev clg at fetchList so to check go to browser clg click remove icon(X) you get id in clg
        // console.log(foodId);

        //do api call - remove using id to remove food from database
        const response = await axios.post(`${url}/api/food/remove`, { id: foodId });

        //we have to updated th UI with new data so once we remove item it has been removed from db after that again to fetch this data and display new data 
        //!so now when ypu click X btn it remove also from UI &db
        await fetchList();

        //add toast notification - mess-from db backend
        if (response.data.success) {
            toast.success(response.data.message)
        } else {
            toast.error("Error")
        }
    }



    //so we have run this fun whenever the web page is loaded so use useeffect
    useEffect(() => {
        //call fetch list fun so when ever this comp't will be loaded in, fun will be excuted 
        fetchList();
    }, [])




    //UI
    return (
        <div className='list add flex-col'>
            <p>
                All Foods List
            </p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {/* map lists */}
                {list.map((item, index) => {
                    return (
                        <div key={index} className='list-table-format'>
                            <img src={`${url}/images/` + item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>{item.price}</p>
                            <p
                                onClick={() => removeFood(item._id)}
                                className='cursor'>X</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default List