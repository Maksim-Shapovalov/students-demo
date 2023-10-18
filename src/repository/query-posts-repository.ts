import {body, param} from "express-validator";
import {blogsRepository} from "./blogs-repository";

export const PostspParamsValidation = ()=>(
    [
        body('title')
            .trim()
            .isString()
            .isLength({min:1,max:30})
            .notEmpty()
            .withMessage('Invalid title'),
        body('shortDescription')
            .trim()
            .isString()
            .isLength({min:1,max:100})
            .notEmpty()
            .withMessage('Invalid shortDescription'),
        body('content')
            .trim()
            .isString()
            .isLength({min:1,max:1000})
            .notEmpty()
            .withMessage('Invalid content'),
        param('blogId')
            .custom(async (value) => {
                const findBlog = await blogsRepository.getBlogsById(value)
                if (!findBlog){
                    throw new Error('Blog not exist')
                }
                return true
            })
            .notEmpty()
            .trim()
            .isString()
            .withMessage('Invalid blogId')
    ]
)