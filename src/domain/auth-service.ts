import {emailManager} from "../manager/email-manager";
import {userRepository} from "../repository/user-repository";
import {UserToCodeOutputModel} from "../types/user-type";
import {UUID} from "mongodb";
import {v4 as uuidv4} from "uuid";

export const authService = {
    async doOperation(user: any){
       await emailManager.sendEmailRecoveryMessage(user)
    },
    async confirmatorUser(code:string){
        return await userRepository.getUserByCode(code)
    },
    async findUserByEmail(user:any){
        user.emailConfirmation.confirmationCode = uuidv4()
        await emailManager.repeatSendEmailRecoveryMessage(user)
    },
    // async verificationTimeToMessage(user: UserToCodeOutputModel){
    //     if (user.emailConfirmation.expirationDate)
    // }

    // async registrationUser(login: any, password:any, email:any) {
    //     const createUser = {
    //         login: login,
    //         password: password,
    //         email: email
    //     }
    //     await emailManager.sendEmailRecoveryMessage(createUser)
    // },
    // async confirmRegistration(code:string){
    //     await emailManager.sendEmailRecoveryMessage({})
    // }


}