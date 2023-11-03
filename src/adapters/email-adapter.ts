import nodemailer from "nodemailer";
import {userRepository} from "../repository/user-repository";


export const emailAdapter = {
    async sendEmail(createUser:any, message:string) {
        try{

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'maksim.shapovalov.01@gmail.com',
                pass: 'wewedrlwgkkmoswq'
            }
        });
//createUser.email
        let info =
                {

            from: 'Maksim <maksim.shapovalov.01@gmail.com>',
            to: createUser.email,
            subject: createUser.login,
            html: message
        }
        console.log('info',info)

            const result = await transporter.sendMail(info)
            // const timeToStart = new Date()
        return result

        }catch(e){
        console.log('error',e)
    }
    }


}
