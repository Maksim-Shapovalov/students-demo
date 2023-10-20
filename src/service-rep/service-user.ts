import {UserDbType, UserOutputModel} from "../types/user-type";
import {userRepository} from "../repository/user-repository";
import {genSalt, hash} from "bcrypt"

export const serviceUser = {
    async getNewUser(login: string, password: string, email: string): Promise<UserOutputModel> {

        const passwordSalt = await genSalt(10)
        const passwordHash = await hash(password, passwordSalt)

        const newUser: UserDbType = {
            login,
            email,
            passwordHash: passwordHash,
            passwordSalt: passwordSalt,
            createdAt: new Date().toISOString()
        }
        const result = userRepository.getNewUser(newUser)
        return result
    },
    async deleteUserById (userId: string): Promise<boolean> {
        return await userRepository.deleteUserById(userId)
    },
    async _generateHash(password: string, salt: string) {
        const hashPassword = await hash(password, salt)
        return hashPassword
    },
    async checkCredentials(loginOrEmail: string, password: string){
        const user = await userRepository.findByLoginOrEmail(loginOrEmail)
        if (!user) return false
        const passwordHash = await hash(password, user.passwordSalt)
        if (user.passwordHash !== passwordHash) {
            return false
        }
        return true
    }
}