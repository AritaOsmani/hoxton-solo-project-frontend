import React from 'react'
import '../styles/CommentItem.css'
import { Comment } from '../Types'
type Props = {
    comment: Comment
}

export default function CommentItem({ comment }: Props) {
    return (
        <li className='comment-item'>
            <span className='comment-user'>{comment.user.username}</span>
            <span className='comment-content'>{comment.content}</span>
        </li>
    )
}
