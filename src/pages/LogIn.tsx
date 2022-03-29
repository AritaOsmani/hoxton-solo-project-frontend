import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import '../styles/LogIn.css'
export default function LogIn() {
    const navigate = useNavigate()
    return (
        <div className='login-container'>
            <form action="" className='login-form'>
                <h1>Instagram</h1>
                <input type="text" name='email-username' placeholder='Email or username' required />
                <input type="password" name='password' placeholder='Password' required />
                <button className='login-btn' type='submit'>Log In</button>
            </form>
            <div className='signup-call-container'>
                <span>Don't have an account?</span>
                <Link to="">Sign up</Link>
            </div>
            <div className='get-app-container'>
                <span>Get the app.</span>
                <div className='app-buttons'>

                    <button className='play-store' >
                        <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png" alt="" />
                    </button>
                    <button className='app-store'><img src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png" alt="" /></button>
                </div>

            </div>
            <Footer />
        </div>
    )
}
