const Boom = require("@hapi/boom");

const Image = require("../../models/Image");
const { uploadImage, deleteImage } = require("../../services/cloudinary");

class ImageHandler {

    /**
     * Upload one or more images.
     *
     * @param {import('@hapi/hapi').Request} request
     * @param {import('@hapi/hapi').ResponseToolkit} h
     */
    static async UploadImages(request, h) {
        try {
            let {
                payload: { images, visibility = 'public' },
                user
            } = request;

            let res, isMoreThanOneImage = Array.isArray(images);
            if (isMoreThanOneImage) {
                res = await uploadImage(images);
            } else res = await uploadImage([images]);
            images = res.map(img => ({
                url: img.url,
                upload_id: img.public_id,
                visibility,
                user
            }));
            images = await Image.insertMany(images);
            let message = `Image${isMoreThanOneImage ? 's' : ''} uploaded successfully.`;
            return h.response({ message, data: images }).code(201);

        } catch (error) {
            console.log(error)
            return Boom.internal(error.message);
        }
    }


    /**
     * Fetch an image object by it's id.
     *
     * @param {import('@hapi/hapi').Request} request
     * @param {import('@hapi/hapi').ResponseToolkit} h
     */
    static async FetchImageById(request, h) {
        try {
            const { image_id } = request.params;
            let image = await Image.findById(image_id);
            if (!image) return Boom.notFound("Image not found.");
            if (image.visibility == 'private' && image.user != request.user) {
                Boom.unauthorized("Only the uploader has access to this image.");
            }
            return h.response({ message: "Image fetched.", data: image }).code(200);
        } catch (error) {
            return Boom.internal(error.message);
        }
    }


    /**
     * Fetch all public images.
     *
     * @param {import('@hapi/hapi').Request} request
     * @param {import('@hapi/hapi').ResponseToolkit} h
     */
    static async FetchPublicImages(request, h) {
        try {
            let images = await Image.find({ visibility: 'public' })
                .populate({ path: 'user', select: '-password-_id' });
            return h.response({ message: "Images fetched.", data: images }).code(200);

        } catch (error) {
            return Boom.internal(error.message);
        }
    }


    /**
     * Fetch all images uploaded by the authenticated user.
     *
     * @param {import('@hapi/hapi').Request} request
     * @param {import('@hapi/hapi').ResponseToolkit} h
     */
    static async FetchImagesByUser(request, h) {
        try {
            const { user, query } = request;
            let images = await Image.find({ user, ...query });
            return h.response({ message: "Images fetched.", data: images }).code(200);

        } catch (error) {
            return Boom.internal(error.message);
        }
    }


    /**
     * Delete an image by it's ID. Only the uploader acn delete an image.
     *
     * @param {import('@hapi/hapi').Request} request
     * @param {import('@hapi/hapi').ResponseToolkit} h
     */
    static async DeleteImageById(request, h) {
        try {
            const { image_id } = request.params;
            let image = await Image.findById(image_id);
            if (!image) return Boom.notFound("Image not found.");
            if (image.user != request.user) {
                Boom.forbidden("You are not authorized to perform this action.");
            }
            await deleteImage(image);
            await Image.findByIdAndDelete(image_id);
            return h.response({ message: "Image deleted.", data: image }).code(200);

        } catch (error) {
            return Boom.internal(error.message);
        }
    }


    /**
     * Delete many images at once. If the `image_ids` field is passed in the
     * payload, it deletes only the listed images. if on the other hand this
     * field is not passed, all the images uploaded by the current user are deleted.
     *
     * @param {import('@hapi/hapi').Request} request
     * @param {import('@hapi/hapi').ResponseToolkit} h
     */
    static async DeleteManyImages(request, h) {
        try {
            let images;
            const { user } = request;
            const { payload } = request;

            if (payload && payload.image_ids) {
                let { image_ids } = payload;
                images = await Image.find({ _id: image_ids, user });
                await Promise.all([ ...(images.map(deleteImage)), Image.deleteMany({ _id: image_ids }) ]);
                let message = `All images with the provided IDs have been deleted.`;
                return h.response({ message, data: images }).code(200);
            }

            images = await Image.find({ user });
            await Promise.all([ ...(images.map(deleteImage)), Image.deleteMany({ user }) ]);
            let message = `All images uploaded by current user deleted.`;
            return h.response({ message, data: images }).code(200);

        } catch (error) {
            console.log(error)
            return Boom.internal(error.message);
        }
    }
}

module.exports = ImageHandler;

