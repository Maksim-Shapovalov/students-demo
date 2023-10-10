import {Request, Response, Router} from "express";
import {blogsRepository} from "../repository/blogs-repository";
import {HTTP_STATUS} from "../index";
import {blogsRouter} from "./blogs-router";
import {postsRepository} from "../repository/posts-repository";
import {PostsValidation} from "../middleware/input-middleware/posts-validation";
import {ErrorMiddleware} from "../middleware/error-middleware";
import {authGuardMiddleware} from "../middleware/register-middleware";

export const postsRouter = Router()
postsRouter.get('/', async (req:Request, res: Response) =>{
    res.send(postsRepository.getAllPosts())
})
postsRouter.get('/:id', async (req:Request, res: Response) =>{
    let post = await postsRepository.getPostsById(req.params.id)
    if (post){
        res.status(200).send(post)
    } else {
        res.sendStatus(404)
    }
})
postsRouter.post('/',
    authGuardMiddleware,
    PostsValidation(),
    ErrorMiddleware,
    async (req:Request, res: Response) =>{
    const {title, shortDescription, content, blogId} = req.body
    const newBlogs = await postsRepository.createNewPosts(title,shortDescription,content,blogId)
    res.status(HTTP_STATUS.CREATED_201).send(newBlogs)
})
postsRouter.put('/:id',
    authGuardMiddleware,
    PostsValidation(),
    ErrorMiddleware,
    async (req: Request, res: Response) => {
        const {title, shortDescription, content, blogId} = req.body
        const result = await postsRepository.updatePostsById(req.params.id, title, shortDescription, content, blogId)
        if (result) {
            res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
        } else {
            res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
        }
    })
postsRouter.delete('/:id',
    authGuardMiddleware,
    async (req: Request, res: Response) => {
        const result: boolean = await postsRepository.deletePostsById(req.params.id)
        if (result) {
            return res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
        } else {
            return res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
        }
    })