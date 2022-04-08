import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import SuggestedPageListITem from '../components/SuggestedPageListITem'
import { User } from '../Types'
import '../styles/SuggestedPage.css'

type Props = {
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>,
    setModal: React.Dispatch<React.SetStateAction<string>>
}

export default function SuggestedPage({ user, setUser, setModal }: Props) {
    const [suggestedUsers, setSuggestedUser] = useState<User[]>([])
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
                    setSuggestedUser(data.suggested)
                }
            })
    }, [localStorage.token])

    return (
        <div className='suggested-page-container'>
            <Header user={user} setUser={setUser} setModal={setModal} />
            <div className='suggested-page-main-container'>
                <h6>Suggested</h6>
                <ul className='suggested-page-suggestions-list'>
                    {suggestedUsers.map(s => <SuggestedPageListITem key={s.id} suggested={s} suggestedUsers={suggestedUsers} setSuggestedUser={setSuggestedUser} />)}


                </ul>
            </div>
        </div>
    )
}
