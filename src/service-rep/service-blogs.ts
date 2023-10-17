import {BlogsOutputModel, BlogsType} from "../types/blogs-type";
import {WithId} from "mongodb";
import {blogsRepository} from '../repository/blogs-repository'
import {PostOutputModel} from "../types/posts-type";
import {dataPost} from "../DB/data-base";
import {postMapper} from "../repository/posts-repository";
import {blogsRouter} from "../routers/blogs-router";
import {PaginationType} from "../repository/query-blogs-repository";

export const blogsService = {
    async createNewBlogs(name:string, description: string, websiteUrl: string): Promise<BlogsOutputModel> {
        const newBlogs : BlogsType = {
            name: name,
            description: description,
            websiteUrl: websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        const res = await blogsRepository.createNewBlogs(newBlogs)
        return res
    },
    async updateBlogById(id: string, name:string, description: string, websiteUrl: string): Promise<boolean> {
        return await blogsRepository.updateBlogById(id, name, description, websiteUrl)
    },
    async deleteBlogsById(id: string) :Promise<boolean> {
        return await blogsRepository.deleteBlogsById(id)

    }

}
const blogMapper = (blog: WithId<BlogsType>): BlogsOutputModel => {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership
    }
}