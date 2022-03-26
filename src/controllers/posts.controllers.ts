import { Bson, RouterContext } from "../../deps.ts"
import { postsCollection } from "../models/Post.ts"

const getPosts = async ({ response }: RouterContext<"/api/posts">) => {
  try {
    const posts = await postsCollection.find().toArray()
    console.log(posts)
    response.body = posts
  } catch (error) {
    console.error("Error on find")
    throw error
  }
}

const getPost = async (ctx: RouterContext<"/api/posts/:id">) => {
  const { params, response } = ctx
  const { id } = params

  const user = await postsCollection.findOne({ _id: new Bson.ObjectId(id) })

  response.status = 200
  response.body = user
}

const createPost = async (ctx: RouterContext<"/api/posts">) => {
  const { request, response } = ctx
  const { value } = request.body()
  const data = await value

  if (!request.hasBody) {
    response.status = 404
    response.body = {
      msg: "No hay contenido :(",
    }
    return
  }

  const newUser = {
    ...data,
  }

  await postsCollection.insertOne(newUser)

  response.status = 200
  response.body = newUser
}

const updatePost = async (ctx: RouterContext<"/api/posts/:id">) => {
  const { request, response, params } = ctx
  const { value } = request.body()
  const { title, description } = await value

  if (!request.hasBody) {
    response.status = 404
    response.body = {
      msg: "No hay contenido :(",
    }
    return
  }

  const { id } = params

  await postsCollection.updateOne(
    { _id: new Bson.ObjectId(id) },
    {
      $set: {
        title,
        description,
      },
    }
  )

  response.status = 200
  response.body = await postsCollection.find().toArray()
}

const deletePost = async (ctx: RouterContext<"/api/posts/:id">) => {
  const { id } = ctx.params

  await postsCollection.deleteOne({ _id: new Bson.ObjectId(id) })

  ctx.response.status = 200
  ctx.response.body = await postsCollection.find().toArray()
}

export { createPost, getPost, getPosts, updatePost, deletePost }
