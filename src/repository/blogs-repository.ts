import {BlogsOutputModel, BlogsType} from "../types/blogs-type";
import {dataBlog} from "../DB/data-base";
import {ObjectId, WithId} from "mongodb";

export const blogsRepository = {
    async getAllBlogs(): Promise<BlogsOutputModel[]>{
        const res =  await dataBlog.find({}).toArray()
        return res.map((b) => blogMapper(b))

    },
    async getBlogsById(id:string): Promise<BlogsOutputModel | undefined>{
        const findCursor = await dataBlog.findOne({_id: new ObjectId(id)});
        if (!findCursor){
            return undefined
        }
        return blogMapper(findCursor)
    },
   async createNewBlogs(name:string, description: string, websiteUrl: string): Promise<BlogsOutputModel> {
        const newBlogs : BlogsType = {
            name: name,
            description: description,
            websiteUrl: websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
       // const result = await dataBlog.insertOne(newBlogs);
       // newBlogs.id = result.insertedId.toString();
       // await dataBlog.insertOne(newBlogs)
       const res = await dataBlog.insertOne({...newBlogs})
       return blogMapper({...newBlogs, _id: res.insertedId})
    },
   async updateBlogById(id: string, name:string, description: string, websiteUrl: string): Promise<boolean> {
       const res = await dataBlog.updateOne({_id: new ObjectId(id)}, {$set: {name:name,description:description, websiteUrl:websiteUrl}})
       return res.matchedCount === 1
    },
   async deleteBlogsById(id: string) :Promise<boolean> {
        const findBlog = await dataBlog.deleteOne({_id: new ObjectId(id) })
       return findBlog.deletedCount === 1

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