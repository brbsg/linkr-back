import { Router } from 'express';
import {
  getAllPosts,
  createPost,
  deletePost,
  editPost,
  newPostsAlert,
} from '../controllers/postsController.js';
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js';
import { validateTokenMiddleware } from '../middlewares/validateTokenMiddleware.js';
import createPostSchema from '../schemas/createPostSchema.js';

const postsRouter = Router();

postsRouter.get('/timeline', validateTokenMiddleware, getAllPosts);
postsRouter.get('/timeline/newPosts', validateTokenMiddleware, newPostsAlert);
postsRouter.post(
  '/timeline',
  validateTokenMiddleware,
  validateSchemaMiddleware(createPostSchema),
  createPost
);
postsRouter.put('/timeline/:id', editPost);
postsRouter.delete('/timeline/:id', deletePost);

export default postsRouter;
