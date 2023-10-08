import {Request, Response, Router} from "express";
import {blogsRepository} from "../repository/blogs-repository";
import {HTTP_STATUS} from "../index";
import {authGuardMiddleware} from "../middleware/register-middleware";
import {BlogsValidation} from "../middleware/input-middleware/blogs-validation";
import {ErrorMiddleware} from "../middleware/error-middleware";

export const blogsRouter = Router()


blogsRouter.get('/', (req:Request, res: Response) =>{
    let allBlogs = blogsRepository.getAllBlogs();
    res.status(HTTP_STATUS.OK_200).send(allBlogs)
})
blogsRouter.get('/id', (req:Request, res: Response) =>{
    const findBlog = blogsRepository.getBlogsById(req.params.id)
    if (!findBlog){
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
        return
    }
    res.status(HTTP_STATUS.OK_200).send(findBlog)
})
blogsRouter.post('/',
    authGuardMiddleware,
    BlogsValidation(),
    ErrorMiddleware,
    (req:Request, res: Response) =>{
    const newBlog = blogsRepository.createNewBlogs(req.body.name, req.body.description, req.body.websiteUrl)
    res.status(HTTP_STATUS.CREATED_201).send(newBlog)
})
blogsRouter.put('/:id',
    authGuardMiddleware,
    BlogsValidation(),
    ErrorMiddleware,
    (req:Request, res: Response) => {
    const {name, description, websiteUrl} = req.body
    const result: boolean = blogsRepository.updateBlogById(req.params.id, name,description,websiteUrl)
    if (result){
       return res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
    }else {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
    }
})
blogsRouter.delete('/:id',
    authGuardMiddleware,
    (req:Request, res: Response) => {
    const result:boolean = blogsRepository.deleteBlogsById(req.params.id)
    if (result) {
        return res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
    }else {
       return res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
    }
})