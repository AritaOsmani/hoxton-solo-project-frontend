export type User = {
    id: number,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    image: string,
    bio: string | null,
    accountStatus: string,
    verified: boolean
}
export type Comment = {
    id: number,
    content: string,
    createdAt: string,
    updatedAt: string,
    userId: number,
    postId: number,
    user: User
}
export type Like = {
    id: number,
    userId: number,
    postId: number,
    user: User
}
export type Count = {
    comments: number,
    likes: number
}
export type Post = {
    id: number,
    image: string,
    caption: string,
    createdAt: string,
    updatedAt: string,
    userId: number,
    user: User,
    comments: Comment[],
    likes: Like,
    _count: Count
}

export type LogInForm = HTMLFormElement & {
    email_username: HTMLInputElement,
    password: HTMLInputElement,
    reset: () => void
}


export type SignUpForm = HTMLFormElement & {
    username: HTMLInputElement,
    email: HTMLInputElement,
    fName: HTMLInputElement,
    lName: HTMLInputElement,
    password: HTMLInputElement,
    confirmPass: HTMLInputElement,
    reset: () => void
}

export type AddCommentForm = HTMLFormElement & {
    comment: HTMLInputElement,
    reset: () => void
}

export type UserProfileCount = {
    following: number,
    followedBy: number,
    posts: number
}

export type UserProfile = User & {
    followedBy: User[],
    following: User[],
    posts: Post[],
    _count: UserProfileCount
}
export type ProfilePost = {
    id: number,
    image: string,
    caption: string,
    createdAt: string,
    updatedAt: string,
    userId: number
}

export type AddPostForm = HTMLFormElement & {
    uploaded_file: HTMLInputElement,
    caption: HTMLInputElement,
    reset: () => void
}

export type Story = {
    id: number,
    content: string,
    status: string,
    userId: number,
    user: User
}