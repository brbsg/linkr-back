import Joi from 'joi';

const createPostSchema = Joi.object({
  link: Joi.string().uri().required(),
  text: Joi.string(),
  hashtags: Joi.array()
});

export default createPostSchema;
