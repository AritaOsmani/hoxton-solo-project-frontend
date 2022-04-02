import React from 'react'
import Header from '../components/Header'
import PostsAndAccount from '../components/PostsAndAccount'
import { User } from '../Types'

type Props = {
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export default function Main({ user, setUser }: Props) {
    return (
        <div className='main-container'>
            <Header user={user} setUser={setUser} />
            <PostsAndAccount user={user} />
        </div>
    )
}
