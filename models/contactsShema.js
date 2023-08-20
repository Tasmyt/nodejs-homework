const Joi = require('joi');

const schema = Joi.object({    
  name: Joi.string().required().messages({"any.required": "missing required name field"}),
  email: Joi.string().required().messages({"any.required": "missing required email field"}),
  phone: Joi.string().required().messages({ "any.required": "missing required phone field" }),
  favorite: Joi.boolean(),
})

const updateFavoriteShema = Joi.object({
  favorite: Joi.boolean().required().messages({ "any.required": "missing field favorite" }),
})

module.exports = {
  schema,
  updateFavoriteShema,
}