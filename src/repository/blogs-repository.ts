import {BlogsOutputModel, BlogsType} from "../types/blogs-type";
import {dataBlog, dataPost} from "../DB/data-base";
import {ObjectId, WithId} from "mongodb";
import {PaginationType} from "./query-blogs-repository";
import {PaginationQueryType} from "../middleware/query-filter";

export const blogsRepository = {
    async getAllBlogs(filter: PaginationQueryType): Promise<PaginationType<BlogsOutputModel>> {
        const pageSizeInQuery: number = filter.pageSize;
        const totalCountBlogs = await dataBlog.countDocuments({})

        const pageCountBlogs: number = Math.ceil(totalCountBlogs / pageSizeInQuery)
        const pageBlog: number = ((filter.pageNumber - 1) * pageSizeInQuery)
        const res = await dataBlog
            .find({})
            .sort(filter.sortDirection)
            .skip(pageBlog)
            .limit(pageSizeInQuery)
            .toArray()

        const items = res.map((b) => blogMapper(b))
        return {
            pagesCount: pageCountBlogs,
            page: filter.pageNumber,
            pageSize: pageSizeInQuery,
            totalCount: totalCountBlogs,
            items: items
        }
    },

    async getBlogsById(id: string): Promise<BlogsOutputModel | null> {
        if (!ObjectId.isValid(id)) return null
        const findCursor = await dataBlog.findOne({_id: new ObjectId(id)});
        if (!findCursor) return null
        return blogMapper(findCursor)
    },
    async createNewBlogs(newBlogs: BlogsType): Promise<BlogsOutputModel> {
        const res = await dataBlog.insertOne({...newBlogs})
        return blogMapper({...newBlogs, _id: res.insertedId})
    },
    async updateBlogById(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        const res = await dataBlog.updateOne({_id: new ObjectId(id)}, {
            $set: {
                name: name,
                description: description,
                websiteUrl: websiteUrl
            }
        })
        return res.matchedCount === 1
    },
    async deleteBlogsById(id: string): Promise<boolean> {
        const findBlog = await dataBlog.deleteOne({_id: new ObjectId(id)})
        return findBlog.deletedCount === 1

    }

}
export const blogMapper = (blog: WithId<BlogsType>): BlogsOutputModel => {
    return {
        id: blog._id.toHexString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership
    }
}