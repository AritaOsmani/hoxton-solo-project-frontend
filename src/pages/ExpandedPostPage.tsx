import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ExpandedCommentItem from '../components/ExpandedCommentItem'
import '../styles/ExpandedPostPage.css'
import { Post, Comment, AddCommentForm, Like, User, Reply } from '../Types'

export default function ExpandedPostPage() {
    const params = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState<Post | null>(null)
    const [postComments, setPostComments] = useState<Comment[]>([])
    const [postLikes, setPostLikes] = useState<Like[]>([])
    const [liked, setLiked] = useState(false)
    const baseURL = 'http://localhost:4000'

    const [replyingTo, setReplyingTo] = useState<User | null>(null)
    const [inputValue, setInputValue] = useState('')
    const [commentToReplyId, setCommentToReplyId] = useState(0)
    const [commentReplies, setCommentReplies] = useState<Reply[]>([])

    useEffect(() => {
        fetch(`http://localhost:4000/checkIfLiked`, {
            method: 'POST',
            headers: {
                Authorization: localStorage.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ postId: Number(params.id) })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    setLiked(false)
                } else {
                    setLiked(true)
                }
            })
    }, [params.id])

    useEffect(() => {
        fetch(`http://localhost:4000/likes/${Number(params.id)}`).then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {
                    setPostLikes(data)
                }
            })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:4000/post/${Number(params.id)}`).then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {
                    setPost(data)
                }
            })
    }, [params.id])

    useEffect(() => {
        fetch(`http://localhost:4000/comments/${Number(params.id)}`).then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {
                    setPostComments(data)
                }
            })
    }, [])

    useEffect(() => {
        if (commentToReplyId) {
            fetch(`http://localhost:4000/commentReplies/${commentToReplyId}`).then(res => res.json())
                .then(data => {
                    if (data.error) {
                        alert(data.error)
                    } else {
                        setCommentReplies(data)
                    }
                })
        }

    }, [commentToReplyId])

    function addComment(content: string, postId: number) {
        fetch(`http://localhost:4000/comments`, {
            method: 'POST',
            headers: {
                Authorization: localStorage.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content, postId })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {
                    const commentsCopy: Comment[] = JSON.parse(JSON.stringify(postComments))
                    commentsCopy.push(data)
                    setPostComments(commentsCopy)

                }
            })
    }

    function likePost(postId: number) {
        fetch(`http://localhost:4000/like`, {
            method: 'POST',
            headers: {
                Authorization: localStorage.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ postId })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {
                    // setLiked(data)
                    const likesCopy: Like[] = JSON.parse(JSON.stringify(postLikes))
                    likesCopy.push(data)
                    setPostLikes(likesCopy)
                    setLiked(true)
                }
            })
    }

    function dislikePost(postId: number) {
        fetch(`http://localhost:4000/dislike`, {
            method: 'POST',
            headers: {
                Authorization: localStorage.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ postId })
        }).then(res => res.json())
            .then(data => {
                console.log('data: ', data)
                let likesCopy: Like[] = JSON.parse(JSON.stringify(postLikes))
                likesCopy = likesCopy.filter(like => like.id !== data.id)
                console.log(likesCopy)
                setPostLikes(likesCopy)

            })
    }

    function addReply(commentId: number, content: string) {
        fetch(`http://localhost:4000/addReply`, {
            method: 'POST',
            headers: {
                Authorization: localStorage.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ commentId, content })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {
                    const repliesCopy = JSON.parse(JSON.stringify(commentReplies))
                    repliesCopy.push(data)
                    setCommentReplies(repliesCopy)
                }
            })
    }

    useEffect(() => {
        if (inputValue === '') {
            setReplyingTo(null)
        }
    }, [inputValue])
    return (
        <div className='expanded-post-page'>
            <button onClick={() => {
                navigate(-1)
            }} className='close-btn'><i className="fas fa-times"></i></button>
            <div className='expanded-post-main-container'>
                <img className='expanded-post-image' src={`${baseURL}/${post?.image}`} alt="" />
                <div className='comments-and-stuff'>

                    <div className='comments-and-stuff-post-author-info'>
                        <img src={post?.user.image} alt="" />
                        <span className='post-author-info-username'>{post?.user.username}</span>
                    </div>

                    <div className='author-and-comments'>
                        <div className='comments-and-stuff-username-and-bio'>
                            <img src={post?.user.image} alt="" />
                            <p> {post?.caption} </p>
                        </div>

                        <ul className='expanded-post-page-comments-list'>
                            {postComments.map(postComment => <ExpandedCommentItem key={postComment.id} postComment={postComment} setReplyingTo={setReplyingTo} setInputValue={setInputValue} setCommentToReplyId={setCommentToReplyId} commentReplies={commentReplies} commentToReplyId={commentToReplyId} />)}

                        </ul>
                    </div>

                    <div className='likes-icons-and-comment-form'>

                        <div className='likes-and-comments'>
                            {liked === false && <svg
                                onClick={() => {

                                    likePost(Number(params.id))
                                }}
                                aria-label="Like" className="_8-yf5 like-icon " color="#8e8e8e" fill="#8e8e8e" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path></svg>
                            }

                            {liked && <svg
                                onClick={() => {
                                    setLiked(false)
                                    dislikePost(Number(params.id))
                                }}
                                aria-label="Unlike" className="_8-yf5 " color="#ed4956" fill="#ed4956" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>

                            }
                            <svg aria-label="Comment" className="_8-yf5 comment-icon" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
                            <div className='save-post'>
                                <svg aria-label="Save" className="_8-yf5  " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                            </div>

                        </div>
                        <span className='likes'>{`${postLikes.length} likes`}</span>
                        <form action="" className='add-comment-form'
                            onSubmit={(e) => {
                                e.preventDefault()
                                const formEl = e.target as AddCommentForm
                                if (replyingTo) {
                                    //add reply
                                    addReply(commentToReplyId, inputValue)
                                    setInputValue('')
                                    setReplyingTo(null)
                                } else {

                                    // const content = formEl.comment.value;
                                    addComment(inputValue, Number(params.id))
                                    setInputValue('')
                                }

                                formEl.reset()

                            }}
                        >
                            <svg aria-label="Emoji" className="_8-yf5 emoji" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path></svg>
                            <input onChange={(e) => {
                                setInputValue(e.target.value)
                            }} type="text" name="comment" placeholder='Add a comment...' value={inputValue} />
                            <button type='submit' className='post-btn'>Post</button>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}