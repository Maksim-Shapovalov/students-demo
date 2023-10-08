import {Request, Response, Router} from "express";
import {blogsRepository} from "../repository/blogs-repository";
import {HTTP_STATUS} from "../index";
import {blogsRouter} from "./blogs-router";
import {postsRepository} from "../repository/posts-repository";
import {PostsValidation} from "../middleware/input-middleware/posts-validation";
import {ErrorMiddleware} from "../middleware/error-middleware";
import {authGuardMiddleware} from "../middleware/register-middleware";

export const postsRouter = Router()
postsRouter.get('/', (req:Request, res: Response) =>{
    res.send(postsRepository.getAllPosts())
})
postsRouter.get('/id', (req:Request, res: Response) =>{
    const findPosts = postsRepository.getPostsById(req.params.id)
    if (!findPosts){
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
    }
    res.status(HTTP_STATUS.OK_200).send(findPosts)
})
postsRouter.post('/',
    authGuardMiddleware,
    PostsValidation(),
    ErrorMiddleware,
    (req:Request, res: Response) =>{
    const {title, shortDescription, content, blogId} = req.body
    const newBlogs = postsRepository.createNewPosts(title,shortDescription,content,blogId)
    res.status(HTTP_STATUS.CREATED_201).send(newBlogs)
})
postsRouter.put('/:id',
    authGuardMiddleware,
    PostsValidation(),
    ErrorMiddleware,
    (req:Request, res: Response) => {
    const {title, shortDescription, content, blogId} = req.body
    const result: boolean = postsRepository.updatePostsById(req.params.id, title, shortDescription, content, blogId)
    if (result){
        res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
    }else {
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
    }
})
postsRouter.delete('/:id',
    authGuardMiddleware,
    (req:Request, res: Response) => {
    const result:boolean = postsRepository.deletePostsById(req.params.id)
    if (result) {
        res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
    }else {
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
    }
})