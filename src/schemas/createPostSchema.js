import Joi from 'joi';

const createPostSchema = Joi.object({
  link: Joi.string().uri().required(),
  text: Joi.string(),
});

export default createPostSchema;
