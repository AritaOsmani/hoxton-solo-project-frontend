import React from 'react'
import { ProfilePost } from '../Types'

type Props = {
    post: ProfilePost
}

const baseURL = 'http://localhost:4000'
export default function UserProfilePost({ post }: Props) {
    return (
        <div className='user-profile-post'>
            <img className='p-image' src={`${baseURL}/${post.image}`} alt="" />
        </div>
    )
}
