import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import UserProfileAccountInfo from '../components/UserProfileAccountInfo'
import UserProfilePost from '../components/UserProfilePost'
import '../styles/UserProfilePage.css'
import { User, UserProfile } from '../Types'

type Props = {
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export default function UserProfilePage({ user, setUser }: Props) {
    const params = useParams()
    const [userFound, setUserFound] = useState<UserProfile | null>(null)
    const [userMatches, setUserMatches] = useState(false)
    const [userFollows, setUserFollows] = useState(false)
    const [userFollowers, setUserFollowers] = useState<User[]>([])

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

    useEffect(() => {
        if (userFound) {
            if (userFound.id === user?.id) {
                setUserMatches(true)
            } else {
                setUserMatches(false)
            }
        }
    }, [userFound, user])

    useEffect(() => {
        fetch(`http://localhost:4000/getUserFollowers/${params.username}`).then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {
                    setUserFollowers(data)
                }
            })
    }, [params.username])

    useEffect(() => {

        const matches = userFollowers.find(u => u.id === user?.id)
        if (matches) {
            setUserFollows(true)
        } else {
            setUserFollows(false)
        }

    }, [userFound, user])

    return (

        <div className='user-profile-page'>
            <Header user={user} setUser={setUser} />
            <div className='user-profile-page-main'>
                <UserProfileAccountInfo userFound={userFound} userMatches={userMatches} userFollows={userFollows}
                    setUserFollowers={setUserFollowers} userFollowers={userFollowers} setUserFollows={setUserFollows}
                />
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
