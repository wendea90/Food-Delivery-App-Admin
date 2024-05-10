import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

//to create a menu items - display items
//to dispaly items in assets folder assets.js there is menu lists array there is multiple objects

const ExploreMenu = ({ category, setCategory }) => {
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>
                Explore our menu
            </h1>
            <p className='explore-menu-text'>
                Choose from a diverese menu featuring a delectable array od dishes. Our mession is to satisfy your carvings and elevate your dining experience, one delicious meal at a time.
            </p>

            {/* map menu-lists */}
            <div className="explore-menu-list">
                {menu_list.map((item, index) => {
                    return (
                        <div
                            onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
                            key={index} className="explore-menu-list-item">
                            <img
                                className={category === item.menu_name ? "active" : ""}
                                src={item.menu_image} alt="" />
                            <p>
                                {item.menu_name}
                            </p>
                        </div>
                    )
                })}
            </div>

            <hr />
        </div>
    )
}


export default ExploreMenu