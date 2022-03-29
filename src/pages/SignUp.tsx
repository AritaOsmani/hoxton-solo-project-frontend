import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { comparePasswords } from '../helpers'
import '../styles/SignUp.css'
import { SignUpForm, User } from '../Types'

type Props = {
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export default function SignUp({ setUser }: Props) {

    function signUp(username: string, email: string, firstName: string, lastName: string, password: string) {
        fetch(`http://localhost:4000/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, firstName, lastName, password })
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
        <div className='signup-container'>
            <form action="" className='signup-form' onSubmit={(e) => {
                e.preventDefault()
                const formEl = e.target as SignUpForm
                const username = formEl.username.value;
                const email = formEl.email.value;
                const first_name = formEl.fName.value;
                const last_name = formEl.lName.value;
                const password = formEl.password.value;
                const confirmPassword = formEl.confirmPass.value;

                const passwordsMatch = comparePasswords(password, confirmPassword)
                if (passwordsMatch) {
                    signUp(username, email, first_name, last_name, password)
                    formEl.reset()
                } else {
                    alert('Passwords don\'t match. Try again!');
                }
            }}>
                <h1>Instagram</h1>
                <span>Sign up to see photos and videos from your friends.</span>
                <input type="text" name='username' placeholder='Username' required />
                <input type="email" name='email' placeholder='Email' required />
                <input type="text" name='fName' placeholder='First Name' required />
                <input type="text" name="lName" placeholder='Last name' />
                <input type="password" name='password' placeholder='Password' />
                <input type="password" name="confirmPass" id="" placeholder='Confirm password' required />
                <button type='submit' className='signup-btn'>Sign up</button>
            </form>
            <div className='signup-call-container'>
                <span>Have an account?</span>
                <Link to="/">Log in</Link>
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
