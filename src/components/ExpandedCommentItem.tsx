import React from 'react'
import '../styles/ExpandedCommentItem.css'
import { Comment, User } from '../Types'

type Props = {
    postComment: Comment,
    setReplyingTo: React.Dispatch<React.SetStateAction<User | null>>
    setInputValue: React.Dispatch<React.SetStateAction<string>>
}

export default function ExpandedCommentItem({ postComment, setReplyingTo, setInputValue }: Props) {
    return (
        <div className='expanded-page-comment'>
            <img src={postComment.user.image} alt="" />
            <p>{postComment.content}</p>
            <button onClick={() => {
                setReplyingTo(postComment.user)
                setInputValue(`@${postComment.user.username} `)
            }} className='reply-btn'>reply</button>
        </div>
    )
}