import React, { useEffect, useState } from 'react'
import { getOnlyFive } from '../helpers'
import '../styles/SideAccountMenu.css'
import { User } from '../Types'
import MainPageFooter from './MainPageFooter'
import SuggestedUser from './SuggestedUser'

type Props = {
    user: User | null
}

export default function SideAccountMenu({ user }: Props) {
    const [suggested, setSuggested] = useState<User[]>([])

    useEffect(() => {
        fetch(`http://localhost:4000/suggestions`, {
            headers: {
                Authorization: localStorage.token
            }
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {
                    setSuggested(data.suggested)
                }
            })
    }, [])

    return (
        <div className='side-account-menu-container'>
            <div className='user-info'>
                <img src={user?.image} alt="" />
                <div className='bio-username'>
                    <span className='username'>{user?.username}</span>
                    <span className='bio'>{user?.bio}</span>
                </div>

            </div>
            <div className='suggestion-link'>
                <h3>Suggestions For You</h3>
                <span>See All</span>
            </div>
            <ul className='suggested-users'>
                {/* {suggested.map(s => <SuggestedUser key={s.id} suggestedUser={s} />)} */}
                {getOnlyFive(suggested).map(s => <SuggestedUser key={s.id} suggestedUser={s} suggested={suggested} setSuggestedUser={setSuggested} />)}
            </ul>
            <MainPageFooter />
        </div>
    )
}
