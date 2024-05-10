import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'

import axios from "axios"
import { toast } from 'react-toastify';


const Add = ({ url }) => {

    // const url = "http://localhost:4000";

    //1st -UI end so functionality - store the image for that create one state variable.
    //!it is updating the image state - when i select image
    const [image, setImage] = useState(false);

    //create one object where will store the product name,desc,prcice. start with data and initalize with name,..
    //!data is saved in this data state var - when i enter data
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    })


    //any thing you change input field taht will updated in state variable so create onchange hundler fun
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }


    //to check this our data is getting updated we will create one useeffect- so when ever our data will be updated theis fun will be excuted. clg and pass data then go to browser clg to test when you refreash page it display name,des,cat,..
    //!it is working
    // useEffect(() => {
    //     console.log(data);
    // }, [data])



    //! now lets do API Calls - 1st create onsubmit hundler
    const onSubmitHandler = async (event) => {
        event.preventDefault();

        //2nd - now we have to insert all these form data(w/c is name,desc,price..) in one form data so create one form data
        const formData = new FormData();
        //now insert all the data 1by1 in this one lets add form
        formData.append("name", data.name)
        formData.append("description", data.description)
        //we have stored price as string & we have definedthe price as number in backend so we have to converts this value(data.price) to number so add ,&Number
        formData.append("price", Number(data.price))
        formData.append("category", data.category)
        formData.append("image", image)

        //next send this form data on our endpoint API so run server
        //3rd - API call - to call an api we will use axios. we will created the var response where we will stores the response from our server. post b/c we are using add method & add url so create one variable above const url ="http://localhost:4000"; so this is the endpoint where we will upload the product, after that we have to send form data
        const response = await axios.post(`${url}/api/food/add`, formData);
        //finally all form data will be added in database in backend
        //check
        if (response.data.success) {
            //if the response is success so we have to reset below field value, copy above object
            //!so now this data was successfully inserted in database mnogodb. 1st fill it then check in MDB 
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad"
            })
            setImage(false)
            toast.success(response.data.message)
        } else {
            toast.error(response.data.message)
        }
    }


    //!we finished add item components


    return (
        <div className='add'>
            <form
                onSubmit={onSubmitHandler}
                className='flex-col'>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        {/* <img src={assets.upload_area} alt="" /> */}
                        {/* to preview image on UI  */}
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        id="image"
                        hidden
                        required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        name='name' placeholder='Type here' />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea
                        onChange={onChangeHandler}
                        value={data.description}
                        name="description"
                        rows="6"
                        placeholder='write content here'
                        required>

                    </textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select
                            onChange={onChangeHandler}
                            value={data.category}
                            name="category">
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input
                            onChange={onChangeHandler}
                            value={data.price}
                            type="Number"
                            name='price'
                            placeholder='$20' />
                    </div>
                </div>
                <button type='submit' className='add-btn'>
                    ADD
                </button>
            </form>
        </div>
    )
}

export default Add