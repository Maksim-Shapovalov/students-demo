import { PaginationType, UserPaginationQueryType} from "./qurey-repo/query-filter";
import {dataPost, dataUser} from "../DB/data-base";
import {UserDbType, UserOutputModel, UserToPostsDBModel, UserToPostsOutputModel} from "../types/user-type";
import {ObjectId, WithId} from "mongodb";

export const userRepository = {
    async getAllUsers(filter:UserPaginationQueryType): Promise<PaginationType<UserToPostsOutputModel> | null>{
        const filterQuery = {$or: [
            {login: {$regex:filter.searchLoginTerm, $options: 'i'}},
                {email: {$regex: filter.searchEmailTerm, $options: 'i'}}
            ]}

        const pageSizeInQuery: number = filter.pageSize;
        const totalCountUsers = await dataUser.countDocuments({filterQuery})

        const pageCountUsers: number = Math.ceil(totalCountUsers / pageSizeInQuery)
        const pageBlog: number = ((filter.pageNumber - 1) * pageSizeInQuery)
        const result = await dataUser
            .find(filterQuery)
            .sort({[filter.sortBy]: filter.sortDirection})
            .skip(pageBlog)
            .limit(pageSizeInQuery)
            .toArray()
        const items = result.map((u) => userToPostMapper(u))
        return {
            pagesCount: pageCountUsers,
            page: filter.pageNumber,
            pageSize: pageSizeInQuery,
            totalCount: totalCountUsers,
            items: items
        }
    },
    async findByLoginOrEmail(loginOrEmail: string){
        const findUser = await dataUser.findOne({ $or: [{login: loginOrEmail}, {email: loginOrEmail}]})
        return findUser
    },
    async getNewUser(newUser: UserDbType): Promise<UserToPostsOutputModel>{
        const result = await dataUser.insertOne({...newUser})
        return userToPostMapper({...newUser, _id: result.insertedId})
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
export const userToPostMapper = (user: WithId<UserToPostsDBModel>): UserToPostsOutputModel => {
    return {
        id: user._id.toHexString(),
        login: user.login,
        email: user.email,
        // passwordHash: user.passwordHash,
        // passwordSalt: user.passwordSalt,
        createdAt: user.createdAt
    }
}