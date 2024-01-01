import Joi from "joi";

const getUserSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1).messages({
    "number.base": "Page should be an integer",
  }),

  size: Joi.number().integer().min(1).max(40).default(10).messages({
    "number.base": "Page should be an integer",
  }),

  email: Joi.string().email().messages({
    "string.email": "Email must be a valid format",
  }),
});

export { getUserSchema };
