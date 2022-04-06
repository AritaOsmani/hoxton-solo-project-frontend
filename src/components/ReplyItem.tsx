import React from 'react'
import { Reply } from '../Types'
import '../styles/ReplyItem.css'

type Props = {
    reply: Reply
}
export default function ReplyItem({ reply }: Props) {
    return (
        <li className='reply-item-container'>
            <img src={reply.user.image} alt="" />
            <span className='reply-username'>{reply.user.username}</span>
            <span className='reply-content'>{reply.content}</span>
        </li>
    )
}
