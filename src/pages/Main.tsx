import React from 'react'
import Header from '../components/Header'
import PostsAndAccount from '../components/PostsAndAccount'
import { User } from '../Types'

type Props = {
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>
    setModal: React.Dispatch<React.SetStateAction<string>>
}

export default function Main({ user, setUser, setModal }: Props) {
    return (
        <div className='main-container'>
            <Header user={user} setUser={setUser} setModal={setModal} />
            <PostsAndAccount user={user} />
        </div>
    )
}
