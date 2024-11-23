// import React from 'react'
// import './Header.css'

// const Header = () => {
//     return (
//         <div className='header'>
//             <div className='header-contents'>
//                 <h2>Order Your Favorite Food Now</h2>
//                 <p>Explore our curated menu filled with irresistible flavors. From fresh ingredients to expert preparation, every dish is crafted to perfection. Whether you crave comforting classics or bold new tastes, we've got something to satisfy every craving!</p>
//                 <a href='#explore-menu'><button>View Menu</button></a>
//             </div>
//         </div>
//     )
// }

// export default Header



import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            {/* Image container for sliding images */}
            <div className="image-container">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>

            {/* Header contents */}
            <div className="header-contents">
                <h2>Order Your Favorite Food Now</h2>
                <p>
                    Explore our curated menu filled with irresistible flavors. From fresh ingredients to expert preparation,
                    every dish is crafted to perfection. Whether you crave comforting classics or bold new tastes, we've got
                    something to satisfy every craving!
                </p>
                <a href="#explore-menu">
                    <button>View Menu</button>
                </a>
            </div>
        </div>
    );
};

export default Header;

