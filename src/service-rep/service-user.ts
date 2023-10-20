import {UserDbType, UserOutputModel, UserToPostsDBModel} from "../types/user-type";
import {userRepository} from "../repository/user-repository";
import bcrypt ,{hash, compare} from "bcrypt"

export const serviceUser = {
    async getNewUser(login: string, password: string, email: string): Promise<UserToPostsDBModel> {

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, passwordSalt)

        const newUser: UserDbType = {
            login,
            email,
            passwordHash: passwordHash,
            passwordSalt: passwordSalt,
            createdAt: new Date().toISOString()
        }
        // const infoUserToPost = {
        //     login: newUser.login,
        //     email: newUser.email,
        //     createdAt: newUser.createdAt
        // }
        const result = userRepository.getNewUser(newUser)
        return result
    },
    async deleteUserById (userId: string): Promise<boolean> {
        return await userRepository.deleteUserById(userId)
    },
    async _generateHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt)
        return hash
    },
    async checkCredentials(loginOrEmail: string, password: string){
        const user = await userRepository.findByLoginOrEmail(loginOrEmail)
        if (!user) return false
        const passwordHash = await this._generateHash(password, user.passwordSalt)
        if (user.passwordHash !== passwordHash) {
            return false
        }
        return true
    }
}