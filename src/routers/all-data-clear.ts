import {Request, Response, Router} from "express";
import {app} from "../index";
import {db} from "../db-items/db-videos";


export const AllDataClear = Router();

AllDataClear.delete('/', (req:Request, res: Response) => {
    db.videos = []
    res.sendStatus(204)
})