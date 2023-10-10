import {dbBlogsPosts} from "../db-items/db-blogs-posts";
import {BlogsType} from "../types/blogs-type";
import {dataBlog} from "../DB/data-base";

export const blogsRepository = {
    async getAllBlogs(): Promise<BlogsType[]>{
        return await dataBlog.find({}).toArray()

    },
    async getBlogsById(id:string): Promise<BlogsType | undefined>{
        const findCursor = await dataBlog.findOne({_id: new Object(id)});
        if (!findCursor){
            return undefined
        }
        return findCursor
    },
   async createNewBlogs(name:string, description: string, websiteUrl: string): Promise<BlogsType> {
        const newBlogs : BlogsType = {
            id: {}.toString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        await dataBlog.insertOne(newBlogs)
        return newBlogs
    },
   async updateBlogById(id: string, name:string, description: string, websiteUrl: string) {
        const findBlog = await dataBlog.findOne({id: new Object(id)})
        if (!findBlog){
            return false
        }else{
            findBlog.name = name
            findBlog.description = description
            findBlog.websiteUrl = websiteUrl
            return true
        }
    },
   async deleteBlogsById(id: string) :Promise<boolean> {
        const findBlog = await dataBlog.deleteOne({_id: new Object(id) })
       return findBlog.deletedCount === 1

    }

}