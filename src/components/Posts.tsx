import React from 'react'
import '../styles/Posts.css'
import PostItem from './PostItem'

export default function Posts() {
    return (
        <ul className='posts-list'>
            <PostItem />
            <PostItem />
            <PostItem />
        </ul>
    )
}
