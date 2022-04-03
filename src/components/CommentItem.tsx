import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/CommentItem.css'
import { Comment } from '../Types'
type Props = {
    comment: Comment
}

export default function CommentItem({ comment }: Props) {
    const navigate = useNavigate()
    return (
        <li className='comment-item'>
            <span onClick={() => {
                navigate(`/${comment.user.username}`)
            }} className='comment-user'>{comment.user.username}</span>
            <span className='comment-content'>{comment.content}</span>
        </li>
    )
}
