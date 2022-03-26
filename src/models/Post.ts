import { client } from "../utils/dbConnect.ts"
import { Bson } from "../../deps.ts"

type PostSchema = {
  _id: Bson.ObjectId
  title: string
  description: string
}

const db = client.database("dataUsersDBTest")

const postsCollection = db.collection<PostSchema>("posts")

export { postsCollection }
