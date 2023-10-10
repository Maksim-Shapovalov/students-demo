import {Request, Response, Router} from "express";
import {app, HTTP_STATUS} from "../index";
import {dbVideos} from "../db-items/db-videos";
import {dbBlogsPosts} from "../db-items/db-blogs-posts";
import {dataBlog, dataPost} from "../DB/data-base";


export const AllDataClear = Router();

AllDataClear.delete('/', (req:Request, res: Response) => {
    dataPost.deleteMany({})
    dataBlog.deleteMany({})
    res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
})