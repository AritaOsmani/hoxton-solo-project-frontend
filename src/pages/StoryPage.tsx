import React from 'react'
import '../styles/StoryPage.css'

export default function StoryPage() {
    return (
        <div className='story-page-container'>
            <button className='story-page-close-btn'>X</button>
            <div className='story-wrapper'>
                <div className='story-page-user-info'>
                    <img src="https://avatars.dicebear.com/api/avataaars/Arita.svg" alt="" />
                    <span>arita</span>
                </div>
                <img src="https://images.pexels.com/photos/5097418/pexels-photo-5097418.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" />
            </div>
        </div>
    )
}
