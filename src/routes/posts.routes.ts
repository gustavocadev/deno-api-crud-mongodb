import { Router } from '../../deps.ts'

import {getPosts,getPost, createPost} from '../controllers/posts.controllers.ts'

const router = new Router()

router.get('/api/posts', getPosts)
router.get('/api/posts/:id', getPost)
router.post('/api/posts', createPost)

export default router
