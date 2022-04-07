import React from 'react'
import '../styles/SearchedAccount.css'
import { User } from '../Types'

type Props = {
    recentSearch: User
}

export default function SearchedAccount({ recentSearch }: Props) {
    return (
        <div className='searched-account-container'>
            <img src={recentSearch.image} alt="" />
            <div className='searched-account-info'>
                <span className='searched-account-info-username'>{recentSearch.username}</span>
                <span className='searched-account-info-bio'>{recentSearch.bio}</span>
            </div>
        </div>
    )
}
