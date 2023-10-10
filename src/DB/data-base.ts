import {MongoClient} from "mongodb";
import {config} from "dotenv"
import {PostsType} from "../types/posts-type";
import {BlogsType} from "../types/blogs-type";
config()


const url = process.env.MONGO_URL || "mongodb://localhost:27017"
if (!url){
    throw new Error('Url doesnt found')
}
export const client = new MongoClient(url)
const db = client.db("duplicate-code")

export const dataBlog = db.collection<BlogsType>("blogs")
export const dataPost = db.collection<PostsType>("posts")

export const runDB = async () => {
    try{
        await client.connect()
        console.log('Connected successfully to server')
    } catch {
        await client.close()
    }
}