import React, { useEffect, useState } from 'react'
import '../styles/Stories.css'
import { Story } from '../Types'
import StoryItem from './StoryItem'

export default function Stories() {
    const [stories, setStories] = useState<Story[]>([])
    useEffect(() => {
        fetch(`http://localhost:4000/stories`, {
            headers: {
                Authorization: localStorage.token
            }
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {
                    setStories(data)
                }
            })
    }, [])

    return (
        <ul className='stories-container'>
            {stories.map(story => <StoryItem key={story.id} story={story} />)}
        </ul>
    )
}
