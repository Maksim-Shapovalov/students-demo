
import {emailAdapter} from "../adapters/email-adapter";

export const emailManager = {
    async sendEmailRecoveryMessage(createUser: any){
        const textForSend = `<h1>Thank for your registration</h1>
        <p>To finish registration please follow the link below:
        <a href='https://somesite.com/confirm-email?code=${createUser.emailConfirmation.confirmationCode}'>complete registration</a>
        </p>`
        await emailAdapter.sendEmail(createUser, textForSend)
    },
    async repeatSendEmailRecoveryMessage(createUser: any){
        const textForSend = `<h1>Resend a message</h1>
        <p>To finish registration please follow the link below:
        <a href='https://somesite.com/confirm-email?code=${createUser.emailConfirmation.confirmationCode}'>complete registration</a>
        </p>`
        await emailAdapter.resendEmail(createUser, textForSend)
    },


}