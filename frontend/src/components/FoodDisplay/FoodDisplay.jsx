// import React, { useContext } from 'react'
// import './FoodDisplay.css'
// import { StoreContext } from '../../context/StoreContext'
// import FoodItem from '../FoodItem/FoodItem'

// const FoodDisplay = ({ category }) => {

//     //first we will get food list array using context api from assats.js
//     const { food_list } = useContext(StoreContext)

//     return (
//         <div className='food-display' id='food-display'>
//             <h2>
//                 Top dishes near you
//             </h2>
//             <div className="food-display-list">
//                 {
//                     food_list.map((item, index) => {
//                         //to filter out items when you click meals
//                         { console.log(category, item.category); }
//                         if (category === "All" || category === item.category) {
//                             return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
//                         }
//                     })
//                 }
//             </div>
//         </div>
//     )
// }

// export default FoodDisplay


import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);

    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {food_list.map((item, index) => {
                    if (category === "All" || category === item.category) {
                        return (
                            <FoodItem
                                key={index}
                                id={item._id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                image={item.image}
                            />
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
        </div>
    );
};

export default FoodDisplay;
