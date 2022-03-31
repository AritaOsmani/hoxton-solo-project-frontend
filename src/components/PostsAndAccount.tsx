import React from 'react'
import PostsAndStories from './PostsAndStories'
import SideAccountMenu from './SideAccountMenu'
import '../styles/PostsAndAccount.css'
import { User } from '../Types'

type Props = {
    user: User | null
}

export default function PostsAndAccount({ user }: Props) {
    return (
        <div className='posts-account-container'>
            <PostsAndStories />
            <SideAccountMenu user={user} />
        </div>
    )
}
