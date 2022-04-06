import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/ExpandedCommentItem.css'
import { Comment, User } from '../Types'

type Props = {
    postComment: Comment,
    setReplyingTo: React.Dispatch<React.SetStateAction<User | null>>
    setInputValue: React.Dispatch<React.SetStateAction<string>>
    setCommentReplying: React.Dispatch<React.SetStateAction<number>>
    repliesForComment: Comment[],
    setRepliesForComment: React.Dispatch<React.SetStateAction<Comment[]>>
}

export default function ExpandedCommentItem({ postComment, setReplyingTo, setInputValue, setCommentReplying, repliesForComment, setRepliesForComment }: Props) {
    useEffect(() => {

        fetch(`http://localhost:4000/commentReplies/${postComment.id}`).then(res => res.json()).then(data => {
            if (data.error) {
                alert(data.error)
            } else {
                setRepliesForComment(data)
            }
        })

    }, [])
    return (
        <div className='expanded-page-comment'>
            <img src={postComment.user.image} alt="" />
            <p>{postComment.content}</p>
            <button onClick={() => {
                setReplyingTo(postComment.user)
                setInputValue(`@${postComment.user.username} `)
                setCommentReplying(postComment.id)
            }} className='reply-btn'>reply</button>
            <ul className='replies-section'>
                {repliesForComment.map(reply => <li>{reply.content}</li>)}
            </ul>
        </div>
    )
}
