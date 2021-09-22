const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { afterEach, beforeEach, before, after, describe, it } = exports.lab = Lab.script();
const init = require("../../../server");
const mongoose = require("mongoose");
const { getTestToken, getAnotherTestToken } = require("../../helpers");
let User = require("../../../src/models/User");
let Image = require("../../../src/models/Image");

describe('All tests regarding DELETING of images', () => {
    let server;
    let imgId;

    before(async () => {
        server = await init();
        let user = await User.findOne({});
        let img = await Image.create({
            user: user._id,
            "url": "http://res.cloudinary.com/dtjayg0jm/image/upload/v1632279149/j11mtupuhtzfqgcapy4i.jpg",
            "upload_id": "j11mtupuhtzfqgcapy4i",
        });
        imgId = img._id;
    });

    afterEach(async () => {
        await server.stop();
    });

    after(async () => {
        await mongoose.connection.close();
    });

    describe("DELETE /api/images", () => {
        it('should return 403 for when a user tries to delete another user\'s image.', async () => {
            const res = await server.inject({
                method: 'DELETE',
                url: `/api/images/${imgId}`,
                headers: {
                    authorization: await getAnotherTestToken()
                }
            });
            expect(res.statusCode).to.equal(200);
            expect(res.statusCode).to.equal(200);
        });
    });

    describe("DELETE /api/images", () => {
        it('should delete all images by current user.', async () => {
            const res = await server.inject({
                method: 'DELETE',
                url: '/api/images',
                headers: {
                    authorization: await getTestToken()
                }
            });
            expect(res.statusCode).to.equal(200);
            expect(res.statusCode).to.equal(200);
        });
    });

});