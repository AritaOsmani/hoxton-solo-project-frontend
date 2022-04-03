import React from 'react'
import { UserProfile } from '../Types'

type Props = {
    userFound: UserProfile | null,
    userMatches: boolean,
    userFollows: boolean
}

export default function UserProfileAccountInfo({ userFound, userMatches, userFollows }: Props) {
    return (
        <div className='user-profile-page-account-info'>
            <img src={userFound?.image} alt="" />
            <div className='user-profile-container'>
                <div className='username-button'>
                    <span className='ub'>{userFound?.username} {userFound?.verified ? <i className="far fa-check-circle"></i> : null}</span>

                    {userMatches ? <button className='edit-profile-btn'>Edit profile</button> : null}
                    {userFollows ? <button className='unfollow-btn'>Unfollow</button> : (!userMatches ? <button className='f-btn'>Follow</button> : null)}

                </div>
                <div className='posts-following-followers'>
                    <span>{`${userFound?._count.posts} posts`} </span>
                    <span>{`${userFound?._count.followedBy} followers`} </span>
                    <span>{`${userFound?._count.following} following`}</span>
                </div>
                <span className='posts-following-followers-bio'>{userFound?.bio}</span>
            </div>
        </div>
    )
}
