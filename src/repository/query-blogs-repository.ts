import {BlogsOutputModel, BlogsType} from "../types/blogs-type";
import {dataBlog} from "../DB/data-base";
import {blogMapper} from "./blogs-repository";

// const blogsQueryRepo = {
//     getBlogs(): BlogsOutputModel[] {
//         const dbBlogs: BlogsType [] = []
//
//         return dbBlogs.map(blog => {
//             return {
//                 name: blog.name,
//                 description: blog.description,
//                 websiteUrl: blog.websiteUrl,
//                 createdAt: blog.createdAt,
//                 isMembership: blog.isMembership
//             }
//         })
//
//     }
//
//
// }
export type PaginationType<I> = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: I[]
}