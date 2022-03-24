import Joi from "joi";

const publicationSchema = Joi.object({
    link: Joi.string().uri().required(),
    text: Joi.string(),
});
  
export default publicationSchema;