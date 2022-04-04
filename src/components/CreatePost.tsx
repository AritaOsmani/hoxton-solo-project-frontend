import axios from 'axios'
import React, { useState } from 'react'
import { AddPostForm, Post, User } from '../Types'
import '../styles/CreatePost.css'
import { useNavigate } from 'react-router-dom'

type Props = {
    user: User | null,
    setModal: React.Dispatch<React.SetStateAction<string>>
}

export default function CreatePost({ user, setModal }: Props) {
    const [file, setFile] = useState(null)
    const [message, setMessage] = useState('')
    const [fileName, setFileName] = useState('')
    const [uploadedFile, setUploadedFile] = useState(null)
    const [caption, setCaption] = useState('')
    console.log('file: ', file)
    const [fetchedPost, setFetchedPost] = useState<Post | null>(null)
    const navigate = useNavigate()

    async function addPost() {
        await fetch(`http://localhost:4000/createPost`, {
            method: 'POST',
            headers: {
                Authorization: localStorage.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: fileName, caption: caption })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {
                    setFetchedPost(data)
                }
            })
    }

    return (
        <div className='modal-wrapper'>
            <button onClick={() => {
                setModal('')
            }} className='modal-close-btn'>X</button>

            <form className='add-post-form' action="post" encType='multipart/form-data' method='post'
                onSubmit={async e => {
                    e.preventDefault()
                    const formEl = e.target as AddPostForm
                    const formData = new FormData()
                    //@ts-ignore
                    formData.append('file', file)
                    console.log('data: ', formData)

                    try {
                        const res = await axios.post('http://localhost:4000/upload', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        const { fileName, filePath } = res.data
                        setUploadedFile(res.data)
                        addPost()
                        formEl.reset()
                        setModal('')
                        navigate(`/${user?.username}`)

                    } catch (err) {
                        //@ts-ignore
                        if (err.response.status === 500) {
                            setMessage('There was a problem with the server');
                        } else {
                            //@ts-ignore
                            setMessage(err.response.data.msg);
                        }
                    }

                }}>
                <h1>Create new post</h1>
                <input onChange={(e: any) => {
                    setFile(e.target.files[0])
                    setFileName(e.target.files[0].name)
                }}
                    type="file" name="file" id="" />
                {file ? <img className='selected-img' src={`http://localhost:4000/${fileName}`} /> : null}
                <textarea onChange={(e: any) => {
                    console.log('caption:', caption)
                    setCaption(e.target.value)
                }} name="caption" id="" cols={10} rows={5} placeholder='Add a caption'></textarea>

                <button className='create-btn'>Create Post</button>
            </form>

        </div>
    )
}
