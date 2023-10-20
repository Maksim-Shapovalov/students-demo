export type UserOutputModel = {
    id: string
    login: string
    email: string
    passwordHash: any
    passwordSalt: string
    createdAt: string
}

export type UserToPostsOutputModel = {
    id: string
    login: string
    email: string
    // passwordHash: any
    // passwordSalt: string
    createdAt: string
}
export type UserToPostsDBModel = {
    // id: string
    login: string
    email: string
    // passwordHash: any
    // passwordSalt: string
    createdAt: string
}





export type UserDbType = {
    login: string
    email: string
    passwordHash: any
    passwordSalt: string
    createdAt: string
}