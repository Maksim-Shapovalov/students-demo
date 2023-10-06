import {Request, Response, Router} from "express";
import {db} from "../db-items/db-videos";
import {HTTP_STATUS} from "../index";
import {availableResolutionsEnum, VideoType} from "../types/video-type";
import {ValidationErrorType} from "../validation/Error-validation";
import {ValidationVideo} from "../validation/video-validation";




export const VideoRouter = Router();



VideoRouter.get('/', (req: Request, res: Response) => {
    res.status(HTTP_STATUS.OK_200).send(db.videos)
})
VideoRouter.get('/:id', (req: Request, res: Response) => {
    let video = db.videos.find(v => v.id === +req.params.id);
    console.log(video, 'get by id')
    if(!video) return res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
    res.status(HTTP_STATUS.OK_200).send(video)
})

const nextDay = new Date()
VideoRouter.post('/',
    ValidationVideo(),
    (req: Request, res: Response) => {
    const {availableResolutions} = req.body
    const newVideo: VideoType = {
        id: +(new Date()),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date((nextDay.setDate(nextDay.getDate() + 1))).toISOString(),
        availableResolutions: req.body.availableResolutions
    }
    console.log(newVideo)
    const errorsMessages: ValidationErrorType[] = []
    if (!newVideo.title){
        errorsMessages.push({
            message: 'Incorrect title',
            field: 'title'
            }
        )
    }
    if (!newVideo.author){
        errorsMessages.push({
                message: 'Incorrect author',
                field: 'author'
            }
        )
    }
    if (!newVideo.availableResolutions ){
        errorsMessages.push({
                message: 'Incorrect availableResolutions',
                field: 'availableResolutions'
            }
        )
    }
    for (const resolution of availableResolutions){
        if (!Object.values(availableResolutionsEnum).includes(resolution)){
            errorsMessages.push({
                    message: 'Incorrect availableResolutions',
                    field: 'availableResolutions'
                }
            )
        }
    }
    if (errorsMessages.length){
        return res.status(HTTP_STATUS.BAD_REQUEST_400).send({errorsMessages})
    }
    db.videos.push(newVideo);
    res.status(HTTP_STATUS.CREATED_201).send(newVideo)
})

VideoRouter.put('/:id',
    ValidationVideo(),
    (req: Request, res: Response) => {
    let video  = db.videos.find(v => v.id === +req.params.id);
    console.log(video, 'update')
    if(!video) return res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
    const {availableResolutions} = req.body

    const errorsMessages: ValidationErrorType[] = []

    if (!req.body.title || req.body.title.length > 40){
        errorsMessages.push({
                'message': 'Incorrect title',
                'field': 'title'
            }
        )
    }
    if (!req.body.author){
        errorsMessages.push({
                'message': 'Incorrect author',
                'field': 'author'
            }
        )
    }
    if (!req.body.availableResolutions ){
        errorsMessages.push({
                'message': 'Incorrect availableResolutions',
                'field': 'availableResolutions'
            }
        )
    }
    for (const resolution of availableResolutions){
        if (!Object.values(availableResolutionsEnum).includes(resolution)){
            errorsMessages.push({
                'message': 'Incorrect availableResolutions',
                'field': 'availableResolutions'
                }
            )
        }
    }
    if (!req.body.canBeDownloaded || typeof req.body.canBeDownloaded !== 'boolean' ){
        errorsMessages.push({
                'message': 'Incorrect availableResolutions',
                'field': 'availableResolutions'
            }
        )
    }
    if (errorsMessages.length){
        return res.status(HTTP_STATUS.BAD_REQUEST_400).send({errorsMessages})
    }else {
        video.title = req.body.title;
        video.author = req.body.author;
        video.availableResolutions = req.body.availableResolutions;
        video.canBeDownloaded = req.body.canBeDownloaded;
        video.minAgeRestriction = req.body.minAgeRestriction;
        video.publicationDate = req.body.publicationDate
        res.status(HTTP_STATUS.NO_CONTENT_204).send(video)
    }



})


VideoRouter.delete('/:id', (req: Request, res: Response) => {
    for (let i=0;i<db.videos.length;i++){
        if (db.videos[i].id === +req.params.id){
            db.videos.splice(i,1)
            return res.sendStatus(204)
        }
    }
    return res.sendStatus(404)
})