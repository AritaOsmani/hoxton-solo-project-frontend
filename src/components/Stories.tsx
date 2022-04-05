import React from 'react'
import '../styles/Stories.css'
import StoryItem from './StoryItem'

export default function Stories() {
    return (
        <ul className='stories-container'>
            <StoryItem />
            <StoryItem />
            <StoryItem />
            <StoryItem />
            <StoryItem />
            <StoryItem />
        </ul>
    )
}
