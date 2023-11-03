import {Request, Response, Router} from "express";
import { HTTP_STATUS} from "../index";
import {dataBlog, dataComments, dataPost, dataUser} from "../DB/data-base";


export const AllDataClear = Router();

AllDataClear.delete('/', (req:Request, res: Response) => {
    dataPost.deleteMany({})
    dataBlog.deleteMany({})
    dataUser.deleteMany({})
    dataComments.deleteMany({})
    res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
})