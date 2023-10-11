import {PostOutputModel, PostsType} from "../types/posts-type";
import {dataBlog, dataPost} from "../DB/data-base";
import {ObjectId, WithId} from "mongodb";

export const postsRepository = {
    async getAllPosts(): Promise<PostOutputModel[]>{
        const result = await dataPost.find({}).toArray();
        return result.map((p) => postMapper(p))
    },
    async getPostsById(id: string):Promise<PostOutputModel | null> {
        const findPosts = await dataPost.findOne({_id: new ObjectId(id)});
        console.log(findPosts)
        if (!findPosts){
            return null
        }
        return postMapper(findPosts)
    },
    async createNewPosts
    (title:string,shortDescription:string,content:string,blogId:string): Promise<PostOutputModel> {
        const findBlogName = await dataBlog.findOne({_id:new ObjectId(blogId)})
        console.log(findBlogName)
        const newPosts: PostsType  = {
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: findBlogName!.name,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        const result = await dataPost.insertOne({...newPosts})
        return postMapper({...newPosts, _id: result.insertedId})
    },
    async updatePostsById
    (id: string, title:string,shortDescription:string,content:string,blogId:string): Promise<boolean> {
        const res = await dataPost.updateOne({_id: new ObjectId(id)}, {$set: {title,shortDescription, content, blogId}})
        return res.matchedCount === 1
    },
    async deletePostsById(id: string): Promise<boolean>{
        const findPost = await dataPost.deleteOne({_id: new ObjectId(id)})
        return findPost.deletedCount === 1

    }

}

const postMapper = (post: WithId<PostsType>): PostOutputModel => {
    return {
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt,
        isMembership: post.isMembership
    }
}