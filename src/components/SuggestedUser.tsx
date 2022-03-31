import React, { useEffect, useState } from 'react'
import { getFollowedBy } from '../helpers'
import '../styles/SuggestedUser.css'
import { User } from '../Types'

type Props = {
    suggestedUser: User
}

export default function SuggestedUser({ suggestedUser }: Props) {
    const [followedBy, setFollowedBy] = useState<User[]>([])

    useEffect(() => {
        fetch(`http://localhost:4000/followedBy`, {
            method: 'POST',
            headers: {
                Authorization: localStorage.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: suggestedUser.username })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {
                    setFollowedBy(data)
                }
            })
    }, [])

    return (
        <div className='suggested-user-container'>
            <img src={suggestedUser.image} alt="" />
            <div className='username-followedby'>
                <span className='suggested-user-username'>{suggestedUser.username}</span>
                {getFollowedBy(followedBy) === '' ? null : <span className='followed-by'>{`Followed by ${getFollowedBy(followedBy)}`}</span>}
            </div>
            <button className='follow-btn'>Follow</button>
        </div>
    )
}
