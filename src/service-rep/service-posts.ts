import {PostOutputModel, PostsType} from "../types/posts-type";
import {dataBlog, dataPost} from "../DB/data-base";
import {ObjectId, WithId} from "mongodb";
import {postsRepository} from "../repository/posts-repository";
import {blogsRepository} from "../repository/blogs-repository";

export const postsService = {
    async createNewPosts
    (title:string,shortDescription:string,content:string,blogId:string): Promise<PostOutputModel> {
        const findBlogName = await dataBlog.findOne({_id:new ObjectId(blogId)})
        const newPosts: PostsType  = {
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: findBlogName!.name,
            createdAt: new Date().toISOString(),
        }
        const result = await postsRepository.createNewPosts(newPosts)
        return result
    },
    async createNewPostsInBlog
    (blogId: string,title :string,shortDescription:string,content:string): Promise<PostOutputModel> {
        const findBlogName = await blogsRepository.getBlogsById(blogId)
        const newPosts: PostsType  = {
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: findBlogName!.name,
            createdAt: new Date().toISOString(),
        }
        const result = await postsRepository.createNewPosts(newPosts)
        return result
    },
    async updatePostsById
    (id: string, title:string,shortDescription:string,content:string,blogId:string): Promise<boolean> {
        return await postsRepository.updatePostsById(id,title,shortDescription,content,blogId)
    },
    async deletePostsById(id: string): Promise<boolean>{
        return await postsRepository.deletePostsById(id)

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
        createdAt: post.createdAt
    }
}