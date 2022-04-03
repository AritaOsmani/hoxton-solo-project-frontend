import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { followUser, getFollowedBy } from '../helpers'
import '../styles/SuggestedUser.css'
import { User } from '../Types'

type Props = {
    suggestedUser: User
    setSuggestedUser: React.Dispatch<React.SetStateAction<User[]>>
    suggested: User[]
}

export default function SuggestedUser({ suggestedUser, setSuggestedUser, suggested }: Props) {
    const [followedBy, setFollowedBy] = useState<User[]>([])
    const navigate = useNavigate()

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
        <div className='suggested-user-container' onClick={() => {
            navigate(`/${suggestedUser.username}`)
        }}>
            <img src={suggestedUser.image} alt="" />
            <div className='username-followedby'>
                <span className='suggested-user-username'>{suggestedUser.username}</span>
                {getFollowedBy(followedBy) === '' ? null : <span className='followed-by'>{`Followed by ${getFollowedBy(followedBy)}`}</span>}
            </div>
            <button className='follow-btn' onClick={(e) => {
                e.stopPropagation()
                followUser(suggestedUser.username).then(data => {
                    if (data.error) {
                        alert(data.error)
                    } else {
                        let suggestedCopy: User[] = JSON.parse(JSON.stringify(suggested))
                        suggestedCopy = suggestedCopy.filter(s => s.id !== suggestedUser.id)
                        setSuggestedUser(suggestedCopy)
                    }
                })
            }}>Follow</button>
        </div>
    )
}
