import { Bson, RouterContext } from "../../deps.ts";
import Post from "../models/Post.ts";

const getPosts = async ({ response }: RouterContext<'/api/posts'>) => {
  try {
    const posts = await Post.find({}, {
      noCursorTimeout: false,
    }).toArray();
    console.log(posts);
    response.body = posts;
  } catch (err) {
    console.error("Error on find");
    throw err;
  }
};

const getPost = async ({ response, params }: RouterContext<'/api/posts/:id'>) => {
  const { id } = params;

  const user = await Post.findOne({ _id: new Bson.ObjectId(id) }, {
    noCursorTimeout: false,
  });
  
  response.status = 200;
  response.body = user;
};

const createPost = async ({ response, request }: RouterContext<'/api/posts'>) => {
  const { value } = request.body();
  const data = await value;

  if (!request.hasBody) {
    response.status = 404;
    response.body = {
      msg: "No hay contenido :(",
    };
    return;
  }

  const newUser = {
    ...data,
  };


  await Post.insertOne(newUser);
  
  response.status = 200;
  response.body = newUser;
};

const updatePost = async ({response, request , params}: RouterContext<'/api/posts/:id'>) => {
  const { value } = request.body();
  const { title, description } = await value;

  if (!request.hasBody) {
    response.status = 404;
    response.body = {
      msg: "No hay contenido :(",
    };
    return;
  }

  const { id } = params;

  await Post.updateOne({ _id: new Bson.ObjectId(id) }, {
    $set: {
      title,
      description,
    },
  });

  response.status = 200;
  response.body = await Post.find({}, {
    noCursorTimeout: false,
  }).toArray()
};

const deletePost = async ({response, params}: RouterContext<'/api/posts/:id'>) => {

  const { id } = params

  await Post.deleteOne({ _id: new Bson.ObjectId(id) });

  response.status = 200;
  response.body = await Post.find({}, {
    noCursorTimeout: false,
  }).toArray()
}

export { createPost, getPost, getPosts, updatePost, deletePost };
