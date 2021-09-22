const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { afterEach, beforeEach, before, after, describe, it } = exports.lab = Lab.script();
const init = require("../../../server");
const mongoose = require("mongoose");
const { getTestToken } = require("../../helpers");

describe('All tests regarding FETCHING of images', () => {
    let server;

    before(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    after(async () => {
        await mongoose.connection.close();
    });

    describe("GET /api/images", () => {
        it('should return all public images.', async () => {
            const res = await server.inject({
                method: 'GET',
                url: '/api/images'
            });
            expect(res.statusCode).to.equal(200);
            expect(res.data).to.be.truthy;
        });
    });

    describe("GET /api/images/me", () => {
        it('should return 401 error without auth token.', async () => {
            const res = await server.inject({
                method: 'GET',
                url: '/api/images/me'
            });
            expect(res.statusCode).to.equal(401);
            expect(res.error).to.be.truthy;
        });
    });

    describe("GET /api/images/me", () => {
        it('should return all the images uploaded by the current user.', async () => {
            const res = await server.inject({
                method: 'GET',
                url: '/api/images/me',
                headers: {
                    authorization: await getTestToken()
                }
            });
            expect(res.statusCode).to.equal(200);
            expect(res.data).to.be.truthy;
        });
    });

});