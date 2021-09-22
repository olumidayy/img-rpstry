const Cloudinary = require("cloudinary").v2;

let k = Cloudinary.config({
    cloud_name: 'dtjayg0jm',
    api_key: '383992744848153',
    api_secret: 'kj3o_4qfx3129efHL9CXw2v2Boo'
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
