import {NextFunction, Request, Response} from "express";
import {HTTP_STATUS} from "../index";

const expectedAuthHeader = 'admin:qwerty'
// const expectedAuthHeaderCode =

export const authGuardMiddleware = (req: Request, res: Response , next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Basic')){
        res.sendStatus(HTTP_STATUS.UNAUTHORIZED_401)
        return
    }

    const splitHeader = authHeader.split(' ')[1]

    console.log(splitHeader, 'splitHeader')
    let enCodeHeader = null;
    try{
        enCodeHeader = atob(splitHeader)
        console.log(enCodeHeader, 'encoded')
    } catch (e) {
        console.log('Error in encoding Basic auth')
        return res.sendStatus(HTTP_STATUS.UNAUTHORIZED_401)
    }

    if (enCodeHeader !== expectedAuthHeader){
        return res.sendStatus(HTTP_STATUS.UNAUTHORIZED_401)
    }

    console.log('auth ok')
    next()
}