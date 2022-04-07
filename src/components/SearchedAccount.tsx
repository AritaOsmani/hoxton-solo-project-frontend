import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/SearchedAccount.css'
import { User } from '../Types'

type Props = {
    recentSearch: User,
    addRecent: (username: string) => void
}

export default function SearchedAccount({ recentSearch, addRecent }: Props) {
    const navigate = useNavigate()
    return (
        <div className='searched-account-container' onClick={() => {
            addRecent(recentSearch.username)
            navigate(`/${recentSearch.username}`)
        }}>
            <img src={recentSearch.image} alt="" />
            <div className='searched-account-info'>
                <span className='searched-account-info-username'>{recentSearch.username}</span>
                <span className='searched-account-info-bio'>{recentSearch.bio}</span>
            </div>
        </div>
    )
}
