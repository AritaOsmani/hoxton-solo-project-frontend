import React from 'react'
import '../styles/SearchedAccount.css'

export default function SearchedAccount() {
    return (
        <div className='searched-account-container'>
            <img src="https://avatars.dicebear.com/api/avataaars/Arita.svg" alt="" />
            <div className='searched-account-info'>
                <span className='searched-account-info-username'>Arita</span>
                <span className='searched-account-info-bio'>Lorem ipsum dolor sit amet.</span>
            </div>
        </div>
    )
}
