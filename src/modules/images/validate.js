const Joi = require("joi");

exports.getImages = {
    query: Joi.object({
        visibility: Joi.string().allow('public', 'private')
    }).options({ stripUnknown: true })
};

exports.oneImage = {
    params: Joi.object({
        image_id: Joi.string().required()
    }).options({ stripUnknown: true })
};

exports.uploadImage = {
    payload: Joi.object({
        images: Joi.any(),
        visibility: Joi.string().allow('public', 'private')
    }).options({ stripUnknown: true })
};
