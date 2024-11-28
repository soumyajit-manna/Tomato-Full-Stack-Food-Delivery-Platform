import React, { useRef } from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
    const menuRef = useRef();

    const scrollLeft = () => {
        menuRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        menuRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore our menu</h1>
            <p className='explore-menu-text'>
                Indulge in a wide variety of mouthwatering dishes, expertly prepared using premium ingredients and culinary finesse. Our goal is to delight your palate and transform every meal into an unforgettable dining experience, one flavorful bite at a time.
            </p>

            {/* Scroll buttons under the paragraph */}
            <div className='scroll-icons-right'>
                <button className='scroll-icon' onClick={scrollLeft}>&lt;</button>
                <button className='scroll-icon' onClick={scrollRight}>&gt;</button>
            </div>

            <div className='explore-menu-container'>
                <div className='explore-menu-list' ref={menuRef}>
                    {menu_list.map((item, index) => {
                        return (
                            <div
                                onClick={() => setCategory(prev => prev === item.menu_name ? 'All' : item.menu_name)}
                                key={index}
                                className='explore-menu-list-item'
                            >
                                <img className={category === item.menu_name ? 'active' : ''} src={item.menu_image} alt={item.menu_name} />
                                <p>{item.menu_name}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            <hr />
        </div>
    );
};

export default ExploreMenu;

