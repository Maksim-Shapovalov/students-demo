import {Request, Response, Router} from "express";
import {app} from "../index";
import {dbVideos} from "../db-items/db-videos";
import {dbBlogsPosts} from "../db-items/db-blogs-posts";


export const AllDataClear = Router();

AllDataClear.delete('/', (req:Request, res: Response) => {
    dbVideos.videos = []
    dbBlogsPosts.blogs = []
    dbBlogsPosts.posts = []
    res.sendStatus(204)
})