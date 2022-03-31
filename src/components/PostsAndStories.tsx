import React from 'react'
import '../styles/PostAndStories.css'
import Posts from './Posts'
import Stories from './Stories'
export default function PostsAndStories() {
    return (
        <div className='post-stories-container'>
            <Stories />
            <Posts />
        </div>
    )
}
