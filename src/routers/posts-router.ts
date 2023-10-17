import {Request, Response, Router} from "express";
import {HTTP_STATUS} from "../index";
import {postsService} from "../service-rep/service-posts";
import {PostsValidation} from "../middleware/input-middleware/posts-validation";
import {ErrorMiddleware} from "../middleware/error-middleware";
import {authGuardMiddleware} from "../middleware/register-middleware";
import {queryFilter} from "../middleware/query-filter";
import {postsRepository} from "../repository/posts-repository";

export const postsRouter = Router()
postsRouter.get('/', async (req:Request, res: Response) =>{
    const filter = queryFilter(req.query);
    const allPosts = postsRepository.getAllPosts(filter);
    res.status(HTTP_STATUS.OK_200).send(allPosts)
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
    const newBlogs = await postsService.createNewPosts(title,shortDescription,content,blogId)
    res.status(HTTP_STATUS.CREATED_201).send(newBlogs)
})
postsRouter.put('/:id',
    authGuardMiddleware,
    PostsValidation(),
    ErrorMiddleware,
    async (req: Request, res: Response) => {
        const {title, shortDescription, content, blogId} = req.body
        const result = await postsService.updatePostsById(req.params.id, title, shortDescription, content, blogId)
        if (result) {
            res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
        } else {
            res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
        }
    })
postsRouter.delete('/:id',
    authGuardMiddleware,
    async (req: Request, res: Response) => {
        const deleted = await postsService.deletePostsById(req.params.id)

        if (!deleted) {
            res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
            return
        }

        res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
    })

