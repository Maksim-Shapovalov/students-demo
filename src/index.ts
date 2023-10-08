import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import {VideoRouter} from "./routers/video-router";
import {AllDataClear} from "./routers/all-data-clear";
import {blogsRouter} from "./routers/blogs-router";
import {postsRouter} from "./routers/posts-router";


export const app = express()
const port = process.env.PORT || 3000

export const HTTP_STATUS = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    UNAUTHORIZED_401: 401,
    NOT_FOUND_404: 404
}


const parserMiddleware = bodyParser()
app.use(parserMiddleware)

app.use("/videos", VideoRouter)
app.use("/testing/all-data", AllDataClear)
app.use("/blogs", blogsRouter)
app.use("/posts", postsRouter)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})