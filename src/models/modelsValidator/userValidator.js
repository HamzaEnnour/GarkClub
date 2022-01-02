const Joi = require('joi')

const validateUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    firstName: Joi.string().min(5).max(255).required(),
    lastName: Joi.string().min(5).max(255).required(),
    gender: Joi.any()
      .valid('Male', 'Female')
      .required()
      .error(() => 'Gender should be Male (or) Female'),
    telephone: Joi.string().required(),
    address: Joi.string().min(5).max(255).required(),
    role: Joi.string().required()
  })

  return schema.validate(user)
}

const validateLoginInput = (input) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(5).max(255).required()
  })

  return schema.validate(input)
}

const validateRegisterInput = (input) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    confirmPassword: Joi.string().required().equal(Joi.ref('password')),
    firstName: Joi.string().min(5).max(255).required(),
    lastName: Joi.string().min(5).max(255).required()
  })

  return schema.validate(input)
}

const validateEmail = (input) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email()
  })

  return schema.validate(input)
}

const validatePassword = (input) => {
  const schema = Joi.object({
    password: Joi.string().min(5).max(255).required()
  })
  return schema.validate(input)
}

exports.validateUser = validateUser
exports.validateRegisterInput = validateRegisterInput
exports.validateEmail = validateEmail
exports.validateLoginInput = validateLoginInput
exports.validatePassword = validatePassword
