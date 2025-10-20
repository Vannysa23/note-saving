import Joi from 'joi';

export const registerSchema = Joi.object({
  username: Joi.string()
  .min(3)
  .max(30)
  .pattern(/^[a-zA-Z0-9]+$/)
  .required()
  .messages({
    'string.empty': 'Name cannot be empty',
    'string.pattern.base': 'Name is not valid',
  }),
  email: Joi.string()
  .email({ tlds: { allow: false }})
  .required()
  .messages({
    'string.empty': 'Email cannot be empty',
    'string.email': 'Email is not valid',
  }),
  password: Joi.string()
  .min(6)
  .max(30)
  .required(),
})

