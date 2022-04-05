import React from 'react'
import '../styles/StoryItem.css'

export default function StoryItem() {
    return (
        <div className='story-item-container'>
            <div className='image-container'>
                <img src="https://avatars.dicebear.com/api/avataaars/AritaOsmani.svg" alt="" />
            </div>

            <span>arita</span>
        </div>
    )
}
