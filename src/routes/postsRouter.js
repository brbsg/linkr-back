import { Router } from 'express';
import { getAllPosts, createPost } from '../controllers/postsController.js';
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js';
import { validateTokenMiddleware } from '../middlewares/validateTokenMiddleware.js';
import createPostSchema from '../schemas/createPostSchema.js';

const postsRouter = Router();

postsRouter.get('/timeline', validateTokenMiddleware, getAllPosts);
postsRouter.post(
  '/timeline',
  validateTokenMiddleware,
  validateSchemaMiddleware(createPostSchema),
  createPost
);
postsRouter.put('/timeline');
postsRouter.delete('/timeline');

export default postsRouter;
