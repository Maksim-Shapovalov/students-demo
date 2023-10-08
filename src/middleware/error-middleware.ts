import {ValidationError, validationResult} from "express-validator";
import {Request, Response, NextFunction} from "express";
import {HTTP_STATUS} from "../index";

const ErrorFormatter = (e : ValidationError) => {
    return {
            message: e. msg,
        //@ts-ignore
            field: e.path
    }

}

export const ErrorMiddleware = (req:Request, res:Response, next: NextFunction) => {
    const result = validationResult(req).formatWith(ErrorFormatter);

    if (!result.isEmpty()) {
        const errorsMessage = { errorsMessages: result.array({onlyFirstError: true})}
        return res.status(HTTP_STATUS.BAD_REQUEST_400).send(errorsMessage);
    }

    next()
}