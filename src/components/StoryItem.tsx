import React from 'react'
import '../styles/StoryItem.css'
import { Story } from '../Types'
type Props = {
    story: Story
}

export default function StoryItem({ story }: Props) {
    return (
        <div className='story-item-container'>
            <div className='image-container'>
                <img src={story.user.image} alt="" />
            </div>

            <span>{story.user.username}</span>
        </div>
    )
}
