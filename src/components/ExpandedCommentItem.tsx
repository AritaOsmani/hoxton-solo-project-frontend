import React from 'react'
import '../styles/ExpandedCommentItem.css'
import { Comment, User } from '../Types'

type Props = {
    postComment: Comment,
    setReplyingTo: React.Dispatch<React.SetStateAction<User | null>>
    setInputValue: React.Dispatch<React.SetStateAction<string>>
    setCommentToReplyId: React.Dispatch<React.SetStateAction<number>>
}

export default function ExpandedCommentItem({ postComment, setReplyingTo, setInputValue, setCommentToReplyId }: Props) {
    return (
        <div className='expanded-page-comment'>
            <img src={postComment.user.image} alt="" />
            <p>{postComment.content}</p>
            <button onClick={() => {
                setReplyingTo(postComment.user)
                setInputValue(`@${postComment.user.username} `)
                setCommentToReplyId(postComment.id)
            }} className='reply-btn'>reply</button>
        </div>
    )
}