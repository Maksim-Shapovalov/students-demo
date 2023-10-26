import {NextFunction, Request, Response} from "express";
import {HTTP_STATUS} from "../index";
import {jwtService} from "../application/jwt-service";
import {userRepository} from "../repository/user-repository";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization){
        res.send(HTTP_STATUS.UNAUTHORIZED_401)
        return
    }

    const token = req.headers.authorization.split(' ')[1]

    const userId = await jwtService.getUserIdByToken(token)
    if (req.headers.authorization != token){
        res.sendStatus(HTTP_STATUS.Forbidden_403)
    }


    if (userId){
        const user = await userRepository.getUserById(userId)

        if(user){
            req.body.user = await userRepository.getUserById(userId)
            return next()
        }
    }

    res.sendStatus(HTTP_STATUS.UNAUTHORIZED_401)
}