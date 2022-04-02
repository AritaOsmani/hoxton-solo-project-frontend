import React from 'react'

export default function UserProfileAccountInfo() {
    return (
        <div className='user-profile-page-account-info'>
            <img src="https://freepikpsd.com/file/2019/10/default-user-profile-image-png-2-Transparent-Images-300x300.png" alt="" />
            <div className='user-profile-container'>
                <div className='username-button'>
                    <span>Username</span>
                    <button>Button</button>
                </div>
                <div className='posts-following-followers'>
                    <span>1 post</span>
                    <span>0 followers</span>
                    <span>3 following</span>
                </div>
                <span>Bio</span>
            </div>
        </div>
    )
}
