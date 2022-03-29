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