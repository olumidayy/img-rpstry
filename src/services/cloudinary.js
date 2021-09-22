const Cloudinary = require("cloudinary").v2;
const { CLOUDINARY_KEY, CLOUDINARY_NAME, CLOUDINARY_SECRET } = require("../config");

let k = Cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_KEY,
    api_secret: CLOUDINARY_SECRET
});

exports.uploadImage = async (images) => {
    try {
        let res = await Promise.all(
            images.map(img => Cloudinary.uploader.upload(img.path))
        );
        return res;
    } catch (error) {
        throw error;
    }
}

exports.deleteImage = async (image) => {
    try {
        let res = await Cloudinary.uploader.destroy(image.upload_id);
        return res;
    } catch (error) {
        throw error;
    }
}
