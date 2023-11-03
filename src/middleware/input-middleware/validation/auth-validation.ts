import {body} from "express-validator";

export const AuthValidation = ()=>(
    [
        body('login')
            .trim()
            .isString()
            .isLength({min:3,max:10})
            .matches('^[a-zA-Z0-9_-]*$')
            .notEmpty()
            .withMessage('Invalid login'),
        body('password')
            .trim()
            .isString()
            .isLength({min:6,max:20})
            .notEmpty()
            .withMessage('Invalid password'),
        body('email')
            .trim()
            .isString()
            .matches('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
            .withMessage('Invalid email')

    ]
)
export const AuthValidationEmail = ()=>(
    [
            body('email')
                .trim()
                .isString()
                .matches('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
                .withMessage('Invalid email')
        ]
)