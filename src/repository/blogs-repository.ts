import {dbBlogsPosts} from "../db-items/db-blogs-posts";
import {BlogsType} from "../types/blogs-type";
import {dataBlog} from "../DB/data-base";
import {ObjectId} from "mongodb";

export const blogsRepository = {
    async getAllBlogs(): Promise<BlogsType[]>{
        return await dataBlog.find({}).toArray()

    },
    async getBlogsById(id:string): Promise<BlogsType | undefined>{
        const findCursor = await dataBlog.findOne({_id: new ObjectId(id)});
        if (!findCursor){
            return undefined
        }
        return findCursor
    },
   async createNewBlogs(name:string, description: string, websiteUrl: string): Promise<BlogsType> {
        const newBlogs : BlogsType = {
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
       const res = await dataBlog.updateOne({_id: new ObjectId(id)}, {$set: {name,description, websiteUrl}})
       return res.matchedCount === 1
    },
   async deleteBlogsById(id: string) :Promise<boolean> {
        const findBlog = await dataBlog.deleteOne({_id: new ObjectId(id) })
       return findBlog.deletedCount === 1

    }

}