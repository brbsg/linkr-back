import Joi from "joi";

const publicationSchema = Joi.object({
    link: joi.string().required(),
    text: joi.string(),
});
  
export default publicationSchema;