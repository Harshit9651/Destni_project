const Joi = require('joi');

const postSchema = Joi.object({
  caption: Joi.string().allow(''),
  postImageUrl: Joi.string().uri().required(),
  title: Joi.string().required(),
  mediaType: Joi.string().valid('video', 'photo').default('photo'),
  postStatus: Joi.string().valid('publish', 'draft', 'hidden').default('draft'),
  audienceVisibility: Joi.number().integer().valid(0, 1, 2, 3).default(1),
 
});

module.exports = {
  postSchema
};
