import React from 'react'
import Header from '../components/Header'
import { User } from '../Types'

type Props = {
    user: User | null
}

export default function Main({ user }: Props) {
    return (
        <div className='main-container'>
            <Header user={user} />
        </div>
    )
}
