import React from 'react'
import '../styles/ExpandedCommentItem.css'
import { Comment, Reply, User } from '../Types'
import ReplyItem from './ReplyItem'

type Props = {
    postComment: Comment,
    setReplyingTo: React.Dispatch<React.SetStateAction<User | null>>
    setInputValue: React.Dispatch<React.SetStateAction<string>>
    setCommentToReplyId: React.Dispatch<React.SetStateAction<number>>
    commentReplies: Reply[]
    commentToReplyId: number
}

export default function ExpandedCommentItem({ postComment, setReplyingTo, setInputValue, setCommentToReplyId, commentReplies, commentToReplyId }: Props) {
    return (
        <div className='expanded-page-comment'>
            <img src={postComment.user.image} alt="" />
            <span className='comment-username'>{postComment.user.username}</span>
            <div className='content-and-reply-btn'>
                <p>{postComment.content}</p>
                <button onClick={() => {
                    setReplyingTo(postComment.user)
                    setInputValue(`@${postComment.user.username} `)
                    setCommentToReplyId(postComment.id)
                }} className='reply-btn'>Reply</button>
            </div>

            {commentToReplyId === postComment.id ? <ul className='comment-replies'>
                {commentReplies.map(reply => <ReplyItem reply={reply} key={reply.id} />)}
            </ul> : null}

        </div>
    )
}