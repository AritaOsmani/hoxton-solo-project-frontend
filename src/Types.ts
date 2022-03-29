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