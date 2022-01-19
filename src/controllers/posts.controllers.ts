import { Context } from "../../deps.ts"
import Post from '../models/Post.ts'

const getPosts =  async ({ response }: Context) => {
    try {
        const posts = await Post.find({}, {
            noCursorTimeout: false
        }).toArray()
        console.log(posts)
        response.body = posts
    } catch (err) {
        console.error("Error on find");
        throw err;
    }
}

const getPost = () => {

}

const createPost = () => {

}

export {
    getPosts,
    getPost, 
    createPost
}