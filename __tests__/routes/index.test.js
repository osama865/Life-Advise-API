const request = require('supertest');
const app = require('../../app');
const axios = require('axios').default;
const { findUser } = require("../../Services")
// fetch
const fetchData = () => {
    // fetch()
}

// tests
describe.only('routes testing', () => {
    describe.skip('root', () => {
        it('should response with welcoming sentence', (done) => {
            request(app).get('/').then(response => {
                expect(response.statusCode).toBe(200)
                done()
            })
        });
    });

    describe.only('registration route tests', () => {
        it('should response with 200, OK', () => {
            request.post('/register').expect(300)
        });

        it('should response with 204 no content', () => {
            request.post('/register').expect()
        });

        it('should response with 500, internal server error', () => {
            request.post('/register').expect()
        });

        it('should response with 503, sevice unavailable', () => {
            request.post('/register').expect()
        });

        it('should have body', async () => {
            const body = {
                name: "1003232122",
                email: "osama02sd2121212d@osa",
                password: "hello shitty code"
            }
            axios.post("http://localhost:3000/register", body).then((response) => {
                expect(response.data).toEqual({})
            })
        });

        it.only('should not be duplicate name and email, response with 409, conflict or 400, bad request', () => {
            const body = {
                name: "osama",
                email: "osama20002002@gmail.com",
                password: "hello shitty code"
            }

            request(app).post('/register').set(body).then((response) => {
                console.log(response);
                expect(response.statusCode).toBe(400)
            })
        });

        it('should response with 201, Created', () => {
            req.post('/register').expect()
        });
    });

    describe('random ', () => {
        it('should be true', () => {
            const a = true
            expect(a).toBe(true)
        });
    });

    describe('multiple ', () => {
        it('should be true', () => {
            const a = true
            expect(a).toBe(true)
        });
    });

    describe('author', () => {
        it('should be true', () => {
            const a = true
            expect(a).toBe(true)
        });
    });

    describe('language', () => {
        it('should be true', () => {
            const a = true
            expect(a).toBe(true)
        });
    });

    describe('not found', () => {
        it('should be true', () => {
            const a = true
            expect(a).toBe(true)
        });
    });

});