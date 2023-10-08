import {Request, Response, NextFunction} from "express";
import {HTTP_STATUS} from "../index";

const registerValid = 'admin:qwerty'

export const authGuardMiddleware = (req: Request, res: Response, next: NextFunction)=> {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Basic')){
        res.sendStatus(HTTP_STATUS.UNAUTHORIZED_401)
        return
    }

    const splitHeader =authHeader.split(' ')[1]

    let enCodeHeader = null
    try {
        enCodeHeader = atob(splitHeader)
    } catch (e) {
        return res.sendStatus(HTTP_STATUS.UNAUTHORIZED_401)
    }
    if (enCodeHeader !== registerValid ){
        return res.sendStatus(HTTP_STATUS.UNAUTHORIZED_401)
    }
    next()
}