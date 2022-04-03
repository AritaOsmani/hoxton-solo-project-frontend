import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ProfilePost } from '../Types'

type Props = {
    post: ProfilePost
}

const baseURL = 'http://localhost:4000'
export default function UserProfilePost({ post }: Props) {
    const navigate = useNavigate()
    return (
        <div onClick={() => {
            navigate(`/posts/${post.id}`)
        }} className='user-profile-post'>
            <img className='p-image' src={`${baseURL}/${post.image}`} alt="" />
        </div>
    )
}
