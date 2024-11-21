import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <Link to="#" onClick={scrollToTop}>
                        <img src={assets.logo} alt="" />
                    </Link>
                    <p>At Tomato, we believe in delivering fresh, delicious meals right to your doorstep. Experience the joy of convenient dining with a variety of options tailored to your taste. Your satisfaction is our top priority!</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <a href="https://twitter.com/Mindwrap_Error" target="_blank" ><img src={assets.twitter_icon} alt="" /></a>
                        <a href="https://www.linkedin.com/in/soumyajit-manna-731372270?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BmnVLky%2BnQlW81FOwJVONuQ%3D%3Dm" target="_blank"><img src={assets.linkedin_icon} alt="" /></a>
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <Link to="#" onClick={scrollToTop}><li>Home</li></Link>
                        <Link to="#" onClick={scrollToTop}><li>About us</li></Link>
                        <Link to="#" onClick={scrollToTop}><li>Delivery</li></Link>
                        <Link to="#" onClick={scrollToTop}><li>Privacy policy</li></Link>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+91 9382869803</li>
                        <li><a href="mailto:mannasoumyajit47@gmail.com">mannasoumyajit47@gmail.com</a></li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className='footer-copyright'>Copyright © 2024 Soumyajit Manna, Developer of Tomato. - All Right Reserved.</p>

        </div>
    )
}

export default Footer