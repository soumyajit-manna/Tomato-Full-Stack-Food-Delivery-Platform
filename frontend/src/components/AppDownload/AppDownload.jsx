import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
    return (
        <div className='app-download' id='app-download'>
            <p>For Better Experience Download <br /> <span className='highlight-text'>Tomato.</span> App</p>
            <div className='app-download-platforms'>
               <a href="https://median.co/share/rnkdqq#apk" target="_blank"> <img src={assets.play_store} alt="" /> </a>
               <a href="https://median.co/share/rnkdqq#apk" target="_blank"> <img src={assets.app_store} alt="" /> </a>
            </div>

        </div>
    )
}

export default AppDownload 
