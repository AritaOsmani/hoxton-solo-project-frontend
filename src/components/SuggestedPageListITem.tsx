import React, { useEffect, useState } from 'react'
import { followUser, getFollowedBy } from '../helpers'
import '../styles/SuggestedPageListItem.css'
import { User } from '../Types'
type Props = {
    suggested: User,
    suggestedUsers: User[],
    setSuggestedUser: React.Dispatch<React.SetStateAction<User[]>>
}

export default function SuggestedPageListITem({ suggested, suggestedUsers, setSuggestedUser }: Props) {
    const [followedBy, setFollowedBy] = useState<User[]>([])

    useEffect(() => {
        fetch(`http://localhost:4000/followedBy`, {
            method: 'POST',
            headers: {
                Authorization: localStorage.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: suggested.username })
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
        <div className='suggested-page-list-item-container'>
            <img src={suggested.image} alt="" />
            <div className='suggested-page-list-item-user-info'>
                <span className='suggested-page-list-item-user-info-username'>{suggested.username}</span>
                <span className='suggested-page-list-item-user-info-bio'>{suggested.bio}</span>
                {getFollowedBy(followedBy) === '' ? null : <span className='followed-by'>{`Followed by ${getFollowedBy(followedBy)}`}</span>}
            </div>
            <button onClick={(e) => {
                e.stopPropagation()
                followUser(suggested.username).then(data => {
                    if (data.error) {
                        alert(data.error)
                    } else {
                        let suggestedCopy: User[] = JSON.parse(JSON.stringify(suggestedUsers))
                        suggestedCopy = suggestedCopy.filter(s => s.id !== suggested.id)
                        setSuggestedUser(suggestedCopy)
                    }
                })
            }} className='suggested-page-follow-btn'>Follow</button>
        </div>
    )
}
