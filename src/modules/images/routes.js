const PREFIX = '/api/images';
const ImageHandler = require("../images/handler");
const {
    getImages,
    oneImage,
    deleteImages,
    uploadImage
} = require("./validate");


module.exports = (server) => {

    const routes = [
        server.route({
            method: 'GET',
            path: `${PREFIX}/me`,
            options: {
                auth: 'jwt',
                description: 'Get images uploaded by the current user.',
                handler: ImageHandler.FetchImagesByUser,
                validate: getImages
            }
        }),

        server.route({
            method: 'GET',
            path: PREFIX,
            options: {
                auth: false,
                description: 'Get all public images.',
                handler: ImageHandler.FetchPublicImages,
                validate: getImages
            }
        }),

        server.route({
            method: 'GET',
            path: `${PREFIX}/{image_id}`,
            options: {
                auth: 'jwt',
                description: 'Get an image by its ID.',
                handler: ImageHandler.FetchImageById,
                validate: oneImage
            }
        }),

        server.route({
            method: 'POST',
            path: PREFIX,
            options: {
                payload: {
                    output: 'file',
                    parse: true,
                    multipart: { output: 'file' },
                    allow: ['multipart/form-data', "application/JSON"]
                },
                auth: 'jwt',
                description: 'Upload an image or a group of images.',
                handler: ImageHandler.UploadImages,
                validate: uploadImage
            }
        }),

        server.route({
            method: 'DELETE',
            path: `${PREFIX}/{image_id}`,
            options: {
                auth: 'jwt',
                description: 'Delete an image by its ID.',
                handler: ImageHandler.DeleteImageById,
                validate: oneImage
            }
        }),

        server.route({
            method: 'DELETE',
            path: PREFIX,
            options: {
                auth: 'jwt',
                description: 'Delete all images added by a user.',
                handler: ImageHandler.DeleteManyImages,
                validate: deleteImages
            }
        })
    ];

    return routes;
};