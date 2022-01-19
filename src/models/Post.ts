import { db } from '../utils/dbConnect.ts';
import { Bson } from "../../deps.ts"

interface PostSchema {
    _id: Bson.ObjectId
    title: string
    description: string
}

const Post = db.collection<PostSchema>("posts")

export default Post