import {dbBlogsPosts} from "../db-items/db-blogs-posts";
import {BlogsType} from "../types/blogs-type";
import {PostsType} from "../types/posts-type";
import {dataBlog, dataPost} from "../DB/data-base";
import {raw} from "express";
import {ObjectId} from "mongodb";

export const postsRepository = {
    async getAllPosts(): Promise<PostsType[]>{
        return await dataPost.find({}).toArray()
    },
    async getPostsById(id: string):Promise<PostsType | undefined> {
        const findPosts = await dataPost.findOne({_id: new ObjectId(id)});
        if (!findPosts){
            return undefined
        }
        return findPosts
    },
    async createNewPosts
    (title:string,shortDescription:string,content:string,blogId:string): Promise<PostsType> {
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
        dataPost.insertOne(newPosts)
        return newPosts
    },
    async updatePostsById
    (id: string, title:string,shortDescription:string,content:string,blogId:string): Promise<boolean> {
        const findPosts = await dataPost.findOne({_id: new ObjectId(id)})
        if (!findPosts){
            return false
        }else{
            findPosts.title = title
            findPosts.shortDescription = shortDescription
            findPosts.content = content
            findPosts.blogId = blogId
            return true
        }
    },
    async deletePostsById(id: string): Promise<boolean>{
        const findPost = await dataPost.deleteOne({_id: new ObjectId(id)})
        return findPost.deletedCount === 1

    }

}