import {Request, Response, Router} from "express";
import {HTTP_STATUS} from "../index";
import {postsRepository} from "../repository/posts-repository";
import {PostsValidation} from "../middleware/input-middleware/posts-validation";
import {ErrorMiddleware} from "../middleware/error-middleware";
import {authGuardMiddleware} from "../middleware/register-middleware";
import {PostsType} from "../types/posts-type";

export const postsRouter = Router()
postsRouter.get('/', async (req:Request, res: Response) =>{
    const allPostsPromise: Promise<PostsType[]> = postsRepository.getAllPosts();
    const allBlogs: PostsType[] = await allPostsPromise
    res.send(allBlogs)
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
        const deleted = await postsRepository.deletePostsById(req.params.id)

        if (!deleted) {
            res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
            return
        }

        res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
    })

