let app = require("./server");
const request = require('supertest');
const jwt = require('jsonwebtoken');

describe('Test User Creation', () => {
    it('serves unprocessable entity for no password in body', async() => {
        const data = { userName: 'test'};
        return request(app).post('/api/users/create')
        .send(data)
        .expect(422).then(response => {
            expect(response).toBeTruthy()});
    });

    it('serves unprocessable entity for no username in body', () => {
        const data = { password: 'test'};
        return request(app).post('/api/users/create')
        .send(data)
        .expect(422).then(response => {
            expect(response).toBeTruthy()});
    });

    it('serves unprocessable entity for username length < 5', () => {
        const data = { userName: 'test', password: 'test1'};
        return request(app).post('/api/users/create')
        .send(data)
        .expect(422).then(response => {
            expect(response).toBeTruthy()});
    });

    it('serves unprocessable entity for username length < 5', () => {
        const data = { userName: 'test1', password: 'test'};
        return request(app).post('/api/users/create')
        .send(data)
        .expect(422).then(response => {
            expect(response).toBeTruthy()});
    });

    it('serves conflict for a username aleady taken', () => {
        const data = { userName: 'abc123', password: 'abc123'};
        return request(app).post('/api/users/create')
        .send(data)
        .expect(409).then(response => {
            expect(response).toBeTruthy()});
    });

    /*
    normally i would also add a valid test here for a valid creation
    that would require me to create a new mock database and server in docker,
    right now I am just doing these acceptance tests on the actual server
    so if I create a user once, I wouldn't be able to create that same user again
    unless I also make another endpoint to delete the user after the creation
    */
});

describe('Test User Login', () => {
    it('serves unprocessable entity if password is not given', () => {
        const data = { userName: 'test'};
        return request(app).post('/api/users/login')
        .send(data)
        .expect(422).then(response => {
            expect(response).toBeTruthy()});
    });

    it('serves unprocessable entity if username is not given', () => {
        const data = { password: 'test'};
        return request(app).post('/api/users/login')
        .send(data)
        .expect(422).then(response => {
            expect(response).toBeTruthy()});
    });

    it('serves forbidden if an invalid username is given', () => {
        const data = { userName: 'abc12', password: 'abc123'};
        return request(app).post('/api/users/login')
        .send(data)
        .expect(403).then(response => {
            expect(response).toBeTruthy()});
    });

    it('serves forbidden if an invalid password is given', () => {
        const data = { userName: 'abc123', password: 'abc12'};
        return request(app).post('/api/users/login')
        .send(data)
        .expect(403).then(response => {
            expect(response).toBeTruthy()});
    });

    it('successfully logs user in and returns the proper response body', () => {
        const data = { userName: 'abc123', password: 'abc123'};

        return request(app).post('/api/users/login')
        .send(data)
        .expect(200).then(response => {
            expect(response.body).toHaveProperty('data');

            const mockBodyData = {
                "uid": 4,
                "userName": "abc123"
            }
            expect(response.body.data).toEqual(mockBodyData);
            expect(response.body).toHaveProperty('token');
        });
    });
})

afterAll(done => {
    server.close();
    done();
});
