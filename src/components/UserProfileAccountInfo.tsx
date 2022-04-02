import React from 'react'
import { UserProfile } from '../Types'

type Props = {
    userFound: UserProfile | null
}

export default function UserProfileAccountInfo({ userFound }: Props) {
    return (
        <div className='user-profile-page-account-info'>
            <img src={userFound?.image} alt="" />
            <div className='user-profile-container'>
                <div className='username-button'>
                    <span>{userFound?.username}</span>
                    <button>Button</button>
                </div>
                <div className='posts-following-followers'>
                    <span>{`${userFound?._count.posts} posts`} </span>
                    <span>{`${userFound?._count.followedBy} followers`} </span>
                    <span>{`${userFound?._count.following} following`}</span>
                </div>
                <span>{userFound?.bio}</span>
            </div>
        </div>
    )
}
