let app = require("./server");
const request = require('supertest');
const jwt = require('jsonwebtoken');
const fs = require('file-system');
const FormData = require('form-data');
const { sign } = require("jsonwebtoken");

describe('Test User Creation', () => {
    it('serves unprocessable entity for no password in body', () => {
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

describe('Test Image Creation', () => {
    const token = sign({ result: "results" }, "qwe1234", { expiresIn: "3h" });
    const uid = 4;
    const validFile = fs.createReadStream('mediaTest/test.png');
    //const validFile = Buffer.from('mediaTest/test.png');

    beforeEach(() => {
        fs.writeFileSync('media/test.png');
    })
    afterEach(() => {
        fs.unlinkSync('media/test.png');
    });
    afterAll(() => {
        fs.writeFileSync('media/test.png');
    })
    /*
    it('serves unprocessable entity if file is not given', async () => {
        return request(app).post('/api/media/add')
        .field('uid', uid)
        .field('name', 'testFile')
        .field('description', 't')
        .set('Authorization', 'Bearer ' + token)
        .expect(422).then(response => {
            expect(response).toBeTruthy()});
    }, 10000);

    it('serves unprocessable entity if uid is not given', async () => {
        return request(app).post('/api/media/add')
        .field('name', 'testFile')
        .field('description', 't')
        .attach('file', validFile)
        .set('Authorization', 'Bearer ' + token)
        .expect(422).then(response => {
            expect(response).toBeTruthy()});
    }, 10000);

    it('serves unprocessable entity if file name is not given', async () => {
        return request(app).post('/api/media/add')
        .field('uid', uid)
        .field('description', 't')
        .attach('file', validFile)
        .set('Authorization', 'Bearer ' + token)
        .expect(422).then(response => {
            expect(response).toBeTruthy()});
    }, 10000);

    it('serves unprocessable entity if file name is greater than 20 characters', () => {
        const fileName = 't'.repeat(21);
        return request(app).post('/api/media/add')
        .field('uid', uid)
        .field('name', fileName)
        .field('description', 't')
        .attach('file', validFile)
        .set('Authorization', 'Bearer ' + token)
        .expect(422).then(response => {
            expect(response).toBeTruthy()});
    }, 10000);
    */
    it('processes a valid file creation request', () => {
        fs.unlinkSync('media/test.png');

        return request(app).post('/api/media/add')
        .field('uid', uid)
        .field('name', 'testFile')
        .field('description', 't')
        .attach('file', validFile)
        .set('Authorization', 'Bearer ' + token)
        .expect(201).then(response => {
            expect(response).toBeTruthy()});
    }, 10000);
});

describe('Test Image Deletion', () => {
    const token = sign({ result: "results" }, "qwe1234", { expiresIn: "3h" });
    const uid = 4;

    it('processes a valid file deletion request', () => {
        const data = { uid: 4, name: "testFile" };

        return request(app).post('/api/media/delete')
        .set('Authorization', 'Bearer ' + token)
        .send(data)
        .expect(200).then(response => {
            expect(response).toBeTruthy()});
    }, 10000);
});

afterAll(done => {
    server.close();
    done();
});
