import {body} from "express-validator";


export const ValidationBlog = () => (
    [
        body('title')
            .trim()
            .isString()
            .isLength({min:1,max:40})
            .notEmpty(),
        body('author')
            .notEmpty()
            .trim()
            .isString()
            .isLength({min:1,max:20}),
        body('availableResolutions')
            .trim()
            .isString()
            .isLength({min:1,max:100})

    ]
)
