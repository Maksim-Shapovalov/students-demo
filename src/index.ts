import express from 'express'
import {VideoRouter} from "./routers/videos/video-router";
import {AllDataClear} from "./routers/all-data-clear";
import {blogsRouter} from "./routers/blogs&posts/blogs-router";
import {postsRouter} from "./routers/blogs&posts/posts-router";
import {runDB} from "./DB/data-base";
import {userRouter} from "./routers/user&auth/User-router";
import {authRouter} from "./routers/user&auth/auth-router";


export const app = express()
export const port = process.env.PORT || 3000

console.log(port)

export const HTTP_STATUS = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    UNAUTHORIZED_401: 401,
    NOT_FOUND_404: 404
}

app.use(express.json());
app.use("/videos", VideoRouter)
app.use("/testing/all-data", AllDataClear)
app.use("/blogs", blogsRouter)
app.use("/posts", postsRouter)
app.use("/user", userRouter)
app.use("/auth", authRouter)


const startApp = async () => {
    await runDB()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}
startApp()