import {dbBlogsPosts} from "../db-items/db-blogs-posts";
import {BlogsType} from "../types/blogs-type";
import {PostsType} from "../types/posts-type";

export const postsRepository = {
    getAllPosts(){
        return dbBlogsPosts.posts
    },
    getPostsById(id:string){
        return dbBlogsPosts.posts.find(p=>p.id===id)
    },
    createNewPosts
    (title:string,shortDescription:string,content:string,blogId:string) {
        const findBlogName = dbBlogsPosts.blogs.find(b=>b.id=== blogId)
        const newPosts: PostsType  = {
            id: (+new Date()).toString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: findBlogName!.name
        }
        dbBlogsPosts.posts.push(newPosts)
        return newPosts
    },
    updatePostsById
    (id: string, title:string,shortDescription:string,content:string,blogId:string) {
        const findPosts: PostsType | undefined = dbBlogsPosts.posts.find(p => p.id === id)
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
    deletePostsById(id: string){
        const findPosts = dbBlogsPosts.posts.findIndex(b=>b.id === id)
        if (findPosts === -1){
            return false
        }else{
            dbBlogsPosts.posts.splice(findPosts,1)
            return true
        }
    }

}