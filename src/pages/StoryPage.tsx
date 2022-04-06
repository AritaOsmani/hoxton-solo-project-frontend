import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../styles/StoryPage.css'
import { Story } from '../Types'

export default function StoryPage() {
    const params = useParams()
    const [story, setStory] = useState<Story | null>(null)
    const baseURL = 'http://localhost:4000'
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:4000/stories/${Number(params.id)}`).then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {
                    setStory(data)
                }
            })
    }, [params.id])

    return (
        <div className='story-page-container'>
            <button onClick={() => {
                navigate(-1)
            }} className='story-page-close-btn'>X</button>
            <div className='story-wrapper'>
                <div className='story-page-user-info'>
                    <img src={story?.user.image} alt="" />
                    <span>{story?.user.username}</span>
                </div>
                <img src={`${baseURL}/${story?.content}`} alt="" />
            </div>
        </div>
    )
}
