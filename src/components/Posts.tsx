import React, { useEffect, useState } from 'react'
import { shufflePosts } from '../helpers'
import '../styles/Posts.css'
import { Comment, Post } from '../Types'
import PostItem from './PostItem'

export default function Posts() {
    const [posts, setPosts] = useState<Post[]>([])


    useEffect(() => {
        fetch(`http://localhost:4000/posts`, {
            headers: {
                Authorization: localStorage.token
            }
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {
                    setPosts(data)

                }
            })
    }, [])

    return (
        <ul className='posts-list'>
            {shufflePosts(posts).map(post => <PostItem key={post.id} post={post} />)}
        </ul>
    )
}
