import React from 'react'
import { followUser, unfollowUser } from '../helpers'
import { Post, User, UserProfile } from '../Types'

type Props = {
    userFound: UserProfile | null,
    userMatches: boolean,
    userFollows: boolean,
    userFollowers: User[],
    user: User | null,
    userPosts: Post[],
    setUserFollows: React.Dispatch<React.SetStateAction<boolean>>,
    setUserFollowers: React.Dispatch<React.SetStateAction<User[]>>
}

export default function UserProfileAccountInfo({ userFound, userMatches, userFollows, setUserFollowers, userFollowers, setUserFollows, user, userPosts }: Props) {
    return (
        <div className='user-profile-page-account-info'>
            <img src={userFound?.image} alt="" />
            <div className='user-profile-container'>
                <div className='username-button'>
                    <span className='ub'>{userFound?.username} {userFound?.verified ? <i className="far fa-check-circle"></i> : null}</span>

                    {userMatches ? <button className='edit-profile-btn'>Edit profile</button> : null}
                    {userFollows ? <button onClick={() => {
                        unfollowUser(userFound?.username).then(data => {
                            let followersCopy: User[] = JSON.parse(JSON.stringify(userFollowers))
                            followersCopy = followersCopy.filter(f => f.username !== user?.username)
                            console.log(followersCopy)
                            setUserFollowers(followersCopy)
                            setUserFollows(false)
                            console.log(followersCopy.length)
                        })
                    }} className='unfollow-btn'>Unfollow</button> : (!userMatches ? <button onClick={() => {
                        followUser(userFound?.username).then(data => {
                            const followersCopy = JSON.parse(JSON.stringify(userFollowers))
                            followersCopy.push(data)
                            setUserFollowers(followersCopy)
                            setUserFollows(true)
                        })
                    }} className='f-btn'>Follow</button> : null)}

                </div>
                <div className='posts-following-followers'>
                    <span>{`${userPosts.length} posts`} </span>
                    <span>{`${userFollowers.length} followers`} </span>
                    <span>{`${userFound?._count.following} following`}</span>
                </div>
                <span className='posts-following-followers-bio'>{userFound?.bio}</span>
            </div>
        </div>
    )
}
