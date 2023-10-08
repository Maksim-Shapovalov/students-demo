import {dbBlogsPosts} from "../db-items/db-blogs-posts";
import {BlogsType} from "../types/blogs-type";

export const blogsRepository = {
    getAllBlogs(){
        return dbBlogsPosts.blogs
    },
    getBlogsById(id:string){
        if (!id){
            return dbBlogsPosts.blogs
        }
        return dbBlogsPosts.blogs.find(b=>b.id===id)
    },
    createNewBlogs(name:string, description: string, websiteUrl: string) {
        console.log('trash1')
        const newBlogs : BlogsType = {
            id: (+new Date()).toString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl
        }
        console.log('trash 2', newBlogs)
        dbBlogsPosts.blogs.push(newBlogs)

        return newBlogs
    },
    updateBlogById(id: string, name:string, description: string, websiteUrl: string) {
        const findBlog: BlogsType | undefined = dbBlogsPosts.blogs.find(b => b.id === id)
        if (!findBlog){
            return false
        }else{
            findBlog.name = name
            findBlog.description = description
            findBlog.websiteUrl = websiteUrl
            return true
        }
    },
    deleteBlogsById(id: string){
        const findBlog = dbBlogsPosts.blogs.findIndex(b=>b.id === id)
        if (findBlog === -1){
            return false
        }else{
            dbBlogsPosts.blogs.splice(findBlog,1)
            return true
        }
    }

}