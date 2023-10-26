import {NextFunction, Request, Response} from "express";
import {HTTP_STATUS} from "../index";
import {jwtService} from "../application/jwt-service";
import {userRepository} from "../repository/user-repository";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const registr = req.headers.authorization
    if (!registr || registr?.startsWith('Basic')){
        res.send(HTTP_STATUS.UNAUTHORIZED_401)
        return
    }

    const token = registr.split(' ')[1]

    const userId = await jwtService.getUserIdByToken(token)


    if (userId){
        const user = await userRepository.getUserById(userId)

        if(user){
            req.body.user = await userRepository.getUserById(userId)
            return next()
        }
    }

    res.sendStatus(HTTP_STATUS.Forbidden_403)
}