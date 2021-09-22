const Lab = require('@hapi/lab');
const fs = require("fs");
const { expect } = require('@hapi/code');
const { afterEach, beforeEach, before, after, describe, it } = exports.lab = Lab.script();
const init = require("../../../server");
const mongoose = require("mongoose");
const { getTestToken } = require("../../helpers");

describe('All tests regarding the UPLOAD of images', () => {
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

    describe.skip("POST /api/images", () => {
        it('should upload.', async () => {
            const res = await server.inject({
                method: 'POST',
                url: '/api/images',
                headers: {
                    authorization: await getTestToken()
                },
                payload: {
                    images: [
                        fs.createReadStream(__dirname + '/assets/test1.jpg'),
                        fs.createReadStream(__dirname + '/assets/test2.png')
                    ]
                }
            });

            expect(res.statusCode).to.equal(200);
            expect(res.data).to.be.truthy;
        });
    });

});