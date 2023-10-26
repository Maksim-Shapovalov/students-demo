import {Router, Request, Response} from "express";
import {dataComments} from "../../DB/data-base";
import {ObjectId} from "mongodb";
import {commentsRepository} from "../../repository/comments-repository";
import {HTTP_STATUS} from "../../index";
import {serviceComments} from "../../service-rep/service-comments";
import {authMiddleware} from "../../middleware/auth-middleware";
import {CommentValidation} from "../../middleware/input-middleware/comment-validation";

export const commentsRouter = Router();
commentsRouter.get("/:id",async (req:Request, res:Response)=> {
    const findComments = await commentsRepository.getCommentById(req.params.id)
    if (!findComments){
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
        return
    }
    res.status(HTTP_STATUS.OK_200).send(findComments)
})
commentsRouter.put("/:commentId",
    authMiddleware,
    CommentValidation(),
    async (req:Request, res:Response) => {
    const updateComment = await serviceComments.updateComment(req.params.commentId, req.body.content)
    if (!updateComment){
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
        return
    }
    res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
})
commentsRouter.delete("/:commentId",
    authMiddleware,
    async (req:Request, res:Response) => {
    const deletedComment = await serviceComments.deletedComment(req.params.commentId)
    if (!deletedComment) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
        return
    }
    res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
})