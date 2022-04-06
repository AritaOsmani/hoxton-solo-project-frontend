import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/StoryItem.css'
import { Story } from '../Types'
type Props = {
    story: Story
}

export default function StoryItem({ story }: Props) {
    const navigate = useNavigate()
    return (
        <div className='story-item-container' onClick={() => {
            navigate(`/stories/${story.id}`)
        }}>
            <div className={story.status === 'active' ? 'image-container' : 'viewed-story'}>
                <img src={story.user.image} alt="" />
            </div>

            <span>{story.user.username}</span>
        </div>
    )
}
