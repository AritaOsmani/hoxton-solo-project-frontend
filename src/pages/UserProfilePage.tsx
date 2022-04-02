import React from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import UserProfileAccountInfo from '../components/UserProfileAccountInfo'
import UserProfilePost from '../components/UserProfilePost'
import '../styles/UserProfilePage.css'
import { User } from '../Types'

type Props = {
    user: User | null
}

export default function UserProfilePage({ user }: Props) {
    const params = useParams()
    return (

        <div className='user-profile-page'>
            <Header user={user} />
            <div className='user-profile-page-main'>
                <UserProfileAccountInfo />
                <hr />

                <div className='posts-saved'>
                    <div className='posts-saved-posts'>
                        <i className="fal fa-table"></i>
                        <span>Posts</span>
                    </div>
                    <div className='posts-saved-saved'>
                        <i className="far fa-bookmark"></i>
                        <span>Saved</span>
                    </div>
                </div>

                <ul className='user-page-post-list'>
                    <UserProfilePost />
                    <UserProfilePost />
                    <UserProfilePost />
                    <UserProfilePost />
                    <UserProfilePost />
                    <UserProfilePost />
                </ul>
                <Footer />
            </div>

        </div>
    )
}
