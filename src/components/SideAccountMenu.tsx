import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
    const navigate = useNavigate()

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
            <div className='side-account-wrapper'>
                <div className='user-info' onClick={() => {
                    navigate(`/${user?.username}`)
                }}>
                    <img src={user?.image} alt="" />
                    <div className='bio-username'>
                        <span className='username'>{user?.username}</span>
                        <span className='bio'>{user?.bio}</span>
                    </div>

                </div>
                <div className='suggestion-link'>
                    <h3>Suggestions For You</h3>
                    <span onClick={() => {
                        navigate('/suggested')
                    }}>See All</span>
                </div>
                <ul className='suggested-users'>
                    {/* {suggested.map(s => <SuggestedUser key={s.id} suggestedUser={s} />)} */}
                    {getOnlyFive(suggested).map(s => <SuggestedUser key={s.id} suggestedUser={s} suggested={suggested} setSuggestedUser={setSuggested} />)}
                </ul>
                <MainPageFooter />
            </div>

        </div>
    )
}
