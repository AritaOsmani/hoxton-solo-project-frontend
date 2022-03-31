import { User } from "./Types";

export function comparePasswords(pass1: string, pass2: string) {
    return pass1 === pass2
}

export function getOnlyFive(arr: User[]) {
    let result: User[] = []
    if (arr.length > 5) {
        for (let i = 0; i < 5; i++) {
            result.push(arr[i])
        }
    } else {
        result = arr
    }
    return result
}

export function getFollowedBy(arr: User[]) {
    let result = ''
    if (arr.length === 0) {
        return result
    }
    if (arr.length === 1) {
        result = arr[0].username
    }
    else if (arr.length === 2) {
        result = `${arr[0].username} and ${arr[1].username}`
    } else {
        result = `${arr[0].username},${arr[1].username} and more`
    }
    return result
}