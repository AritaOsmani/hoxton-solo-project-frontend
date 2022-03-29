import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import '../styles/LogIn.css'
import { LogInForm, User } from '../Types'

type Props = {
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export default function LogIn({ setUser }: Props) {
    const navigate = useNavigate()
    const [disabledButton, setDisabledButton] = useState(false)
    const [passwordVal, setPasswordVal] = useState('')
    const [emailVal, setEmailVal] = useState('')

    function logIn(email_username: string, password: string) {
        fetch(`http://localhost:4000/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email_username, password })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {
                    localStorage.setItem('token', data.token)
                    setUser(data.user)
                }
            })
    }

    return (
        <div className='login-container'>
            <form action="" className='login-form' onSubmit={(e) => {
                e.preventDefault()
                const formEl = e.target as LogInForm
                const email_username = formEl.email_username.value;
                const password = formEl.password.value;
                logIn(email_username, password)
                formEl.reset()
            }}
            //  onInputCapture={(e) => {
            //     console.log('currently: ', e.target)
            //     if (passwordVal !== '' && emailVal !== "") {
            //         setDisabledButton(false)
            //     }
            //     else if (passwordVal === "") {
            //         setDisabledButton(true)
            //     }

            // }}
            >
                <h1>Instagram</h1>
                <input type="text" name='email_username' placeholder='Email or username' required onChange={(e) => {
                    setEmailVal(e.target.value)
                }} />
                <input type="password" name='password' placeholder='Password' id='pass' required onChange={(e) => {
                    setPasswordVal(e.target.value)
                }} />
                <button className={disabledButton ? 'login-btn-disabled' : 'login-btn'} type='submit'>Log in</button>
            </form>
            <div className='signup-call-container'>
                <span>Don't have an account?</span>
                <Link to="/signup">Sign up</Link>
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
