import {Request, Response, Router} from "express";
import {blogsRepository} from "../repository/blogs-repository";
import {HTTP_STATUS} from "../index";
import {authGuardMiddleware} from "../middleware/register-middleware";
import {BlogsValidation} from "../middleware/input-middleware/blogs-validation";
import {ErrorMiddleware} from "../middleware/error-middleware";
import {BlogsOutputModel, BlogsType} from "../types/blogs-type";
import {WithId} from "mongodb";


export const blogsRouter = Router()


blogsRouter.get('/', async (req:Request, res: Response) =>{
    const allBlogs = await blogsRepository.getAllBlogs();
    res.status(HTTP_STATUS.OK_200).send(allBlogs)
})
blogsRouter.get('/:id',
    async (req: Request, res: Response) => {
        const blog = await blogsRepository.getBlogsById(req.params.id)
        if (blog){
            res.status(HTTP_STATUS.OK_200).send(blog)
        } else {
            res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
        }

})
blogsRouter.post('/',
    authGuardMiddleware,
    BlogsValidation(),
    ErrorMiddleware,
    async (req:Request, res: Response) =>{
    const newBlog = await blogsRepository.createNewBlogs(req.body.name, req.body.description, req.body.websiteUrl)
    res.status(HTTP_STATUS.CREATED_201).send(newBlog)
})
blogsRouter.put('/:id',
    authGuardMiddleware,
    BlogsValidation(),
    ErrorMiddleware,
    async (req:Request, res: Response) => {
    const result = await blogsRepository.updateBlogById(req.params.id, req.body.name,req.body.description,req.body.websiteUrl)
    if (!result){
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
       return
    }
    res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
})
blogsRouter.delete('/:id',
    authGuardMiddleware,
    async (req:Request, res: Response) => {
        const deleted = await blogsRepository.deleteBlogsById(req.params.id)

        if (!deleted) {
            res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
            return
        }

        res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
})

