import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import UserProfileAccountInfo from '../components/UserProfileAccountInfo'
import UserProfilePost from '../components/UserProfilePost'
import '../styles/UserProfilePage.css'
import { User, UserProfile } from '../Types'

type Props = {
    user: User | null
}

export default function UserProfilePage({ user }: Props) {
    const params = useParams()
    const [userFound, setUserFound] = useState<UserProfile | null>(null)

    useEffect(() => {
        fetch(`http://localhost:4000/users/${params.username}`).then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {
                    setUserFound(data)
                }
            })
    }, [params.username])

    return (

        <div className='user-profile-page'>
            <Header user={user} />
            <div className='user-profile-page-main'>
                <UserProfileAccountInfo userFound={userFound} />
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
                    {userFound?.posts.map(post => <UserProfilePost key={post.id} post={post} />)}

                </ul>
                <Footer />
            </div>

        </div>
    )
}
