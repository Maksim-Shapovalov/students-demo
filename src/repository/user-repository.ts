import { PaginationType, UserPaginationQueryType} from "./qurey-repo/query-filter";
import {dataPost, dataUser} from "../DB/data-base";
import {UserDbType, UserOutputModel} from "../types/user-type";
import {ObjectId, WithId} from "mongodb";

export const userRepository = {
    async getAllUsers(filter:UserPaginationQueryType): Promise<PaginationType<UserOutputModel> | null>{
        const pageSizeInQuery: number = filter.pageSize;
        const totalCountBlogs = await dataPost.countDocuments({})

        const pageCountBlogs: number = Math.ceil(totalCountBlogs / pageSizeInQuery)
        const pageBlog: number = ((filter.pageNumber - 1) * pageSizeInQuery)
        const result = await dataUser
            .find({})
            .sort({[filter.sortBy]: filter.sortDirection})
            .skip(pageBlog)
            .limit(pageSizeInQuery)
            .toArray()
        const items = result.map((u) => userMapper(u))
        return {
            pagesCount: pageCountBlogs,
            page: filter.pageNumber,
            pageSize: pageSizeInQuery,
            totalCount: totalCountBlogs,
            items: items
        }
    },
    async findByLoginOrEmail(loginOrEmail: string){
        const findUser = await dataUser.findOne({ $or: [{login: loginOrEmail}, {email: loginOrEmail}]})
        return findUser
    },
    async getNewUser(newUser: UserDbType): Promise<UserOutputModel>{
        const result = await dataUser.insertOne({...newUser})
        return userMapper({...newUser, _id: result.insertedId})
    },
    async deleteUserById(userId:string): Promise<boolean>{
        const findUser = await dataUser.deleteOne({_id:new ObjectId(userId)})
        return findUser.deletedCount === 1
    }
}

export const userMapper = (user: WithId<UserDbType>): UserOutputModel => {
    return {
        id: user._id.toHexString(),
        login: user.login,
        email: user.email,
        passwordHash: user.passwordHash,
        passwordSalt: user.passwordSalt,
        createdAt: user.createdAt
    }
}