const Joi = require("joi");

exports.validateSignUp = {
    payload: Joi.object({
        email: Joi.string().required(),
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        password: Joi.string().required()
    }).options({ stripUnknown: true })
};

exports.validateSignIn = {
    payload: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    }).options({ stripUnknown: true })
};