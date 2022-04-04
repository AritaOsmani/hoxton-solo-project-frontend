import React from 'react'
import '../styles/ExpandedCommentItem.css'
import { Comment } from '../Types'

type Props = {
    postComment: Comment
}

export default function ExpandedCommentItem({ postComment }: Props) {
    return (
        <div className='expanded-page-comment'>
            <img src={postComment.user.image} alt="" />
            <p>{postComment.content}</p>
        </div>
    )
}
