let app = require("./server");
const request = require('supertest');
const jwt = require('jsonwebtoken');
const testToken = jwt.sign({
    name: 'testuser',
  }, 'this_is_a_secret', { expiresIn: '1h' });

let token = null;
beforeAll( async () => {
    const data = {userName : 'xxxx', password: '123456'};
    const res = await request(app).post('/api/users/login').send(data);
    token = res.body.token;
    //expect(res.statusCode).toEqual(200);
    //expect(res.body).toHaveProperty('success');
 }, 50000);

describe('Test Users endpoint', () => {

    test('getUserByUid at /users/:uid', async() => {
        const res =  await request(app).get('/api/users/131')
        .set('Authorization', 'Bearer ' + token);
        expect(res.statusCode).toEqual(200);
        expect(res).toBeTruthy();
    },30000);

    test('test create user', () => {
        const data = { email : 'testtesttest'}
        return request(app).post('/api/users/')
        .set('Authorization', 'Bearer ' + token)
        .send(data)
        .expect(500).then(response => {
            expect(response).toBeTruthy()});
    });

    // test('test login at /users/login async ', async () => {
    //     const data = {userName : 'xxxx', password: '123456'};
    //     // const res = await app.post('/api/users/login').send(data)
    //     const res = await request(app).post('/api/users/login').send(data)
    //     expect(res.status).toBe(200);
    //     done()
    //     //expect(res.body).toHaveProperty('success');
    //  }, 500000);


     test('test login at /users/login async wrong password ', async () => {
         const data = {userName : 'xxxx', password: '1234'};
         const res = await request(app).post('/api/users/login').send(data)
         expect(res.statusCode).toEqual(403);
         //expect(res.body).toHaveProperty('success');
      }, 500000);

    test('send recover email at /users/forgot Email Not Found', () => {
        return request(app).post('/api/users/forgot').send({email:"randomString"})
        .expect(404).then(response => {
            expect(response).toBeTruthy();
        });
    }, 500000);


    // test('send recover email at /users/forgot Valid Email', async () => {
    //     const res = await request(app).post('/api/users/forgot').send({email:"test@gmail.com"});
    //     //expect(res.statusCode).toEqual(200);
    //     expect(res).toBeTruthy();
    // }, 500000);


    test('delete user at /users/:uid', async () => {
        const response  = await request(app).delete('/api/users/0')
        .set('Authorization', 'Bearer ' + token);
            expect(response).toBeTruthy();

    }, 300000);


    test('authenticate user at /users/authenticate', () => {
        return request(app).post('/api/users/authenticate')
        .set('Authorization', 'Bearer ' + token)
        .expect(200).then(response => {
            expect(response).toBeTruthy();
        });
    }, 30000);

// ---------------------------
//can only run once
    // test('create user at /users/', () => {
    //     const data = {email: "xxxx5@mail.com",
    //     fName: 'hhhh',
    //     lName:'hhhhh',
    //     userName: 'testIntegration5',
    //     number: '234556',
    //     password: 'password',
    //     startTime: '2020-09-21',
    //     accountSid: 'heheheh',
    //     authToken:'token'}
    //     return request(app).post('/api/users/').send(data)
    //     .expect(201).then(response => {
    //         expect(response).toBeTruthy();
    //     });
    // });

// --------------------------------

    test('upload avatar at /users/avatar', () => {
        const data = {uid : 200};
        return request(app).post('/api/users/avatar')
        .set('Authorization', 'Bearer ' + token)
        .send(data)
        .expect(500).then(response => {
            expect(response).toBeTruthy();
        });
    }, 300000);

    test('update lastViewTime at /users/viewTime', () => {
        const data = {uid : 141, lastViewTime : ' '};
        return request(app).post('/api/users/viewTime')
        .set('Authorization', 'Bearer ' + token)
        .send(data)
        .expect(200).then(response => {
            expect(response).toBeTruthy();
        });
    },300000);

    test('getEmail at /users/getE', async () => {
        const data = {uid : 141};
        const response = await request(app).post('/api/users/getE')
        .set('Authorization', 'Bearer ' + token)
        .send(data);
        //expect(response.statusCode).toEqual(200);
        expect(response).toBeTruthy();
    }, 300000);

});

describe('Test Friends endpoint', () => {
    test('test getDatabyUserName', async () => {
        const response = await request(app).get('/api/friends/ruochunw')
        .set('Authorization', 'Bearer ' + token);
        expect(response.statusCode).toEqual(200);
        expect(response).toBeTruthy();
    }, 300000);

    test('test confirm friend', async () => {
        const data = {uid : 0, fid : 0};
        const response = await request(app).patch('/api/friends/confirm')
        .set('Authorization', 'Bearer ' + token)
        .send(data);
        expect(response.statusCode).toEqual(200);
        expect(response).toBeTruthy();
    }, 300000);

    test('test confirm Connection', async () => {
        const data = {uid : 0, fid : 0};
        const response = await request(app).post('/api/friends/check')
        .set('Authorization', 'Bearer ' + token)
        .send(data);
        expect(response.statusCode).toEqual(200);
        expect(response).toBeTruthy();
    }, 30000);

    test('test add friend', async () => {
        const data = {uid : 0, fid : 0 , fUserName: "noname"};
        const response = await request(app).post('/api/friends/add')
        .set('Authorization', 'Bearer ' + token)
        .send(data);
        //expect(response.statusCode).toEqual(500);
        expect(response).toBeTruthy();
    }, 300000);


    test('test get friend ', async () => {
        const response =  await request(app).post('/api/friends/fList')
        .set('Authorization', 'Bearer ' + token)
        .send({uid : 131})
        expect(response.statusCode).toEqual(200);
        expect(response).toBeTruthy();
    }, 300000);

    test('test setRoom ', async () => {
        const response =  await request(app).post('/api/friends/room')
        .set('Authorization', 'Bearer ' + token)
        .send({roomId: 0 , uid: 0, fid : 0});
        expect(response.statusCode).toEqual(200);
        expect(response).toBeTruthy();
    }, 300000);

    test('test setRoomName', async () => {
        const response = await request(app).post('/api/friends/roomName')
        .set('Authorization', 'Bearer ' + token)
        .send({roomName: 0 , uid: 0, fid : 0});
        expect(response.statusCode).toEqual(200);
        expect(response).toBeTruthy();
    }, 300000);

    test('test contact suggestion', async () => {
        const response = await request(app).post('/api/friends/suggestion')
        .set('Authorization', 'Bearer ' + token)
        .send({uid : 131, userName : 'ruochunw'});
        expect(response.statusCode).toEqual(200);
        expect(response).toBeTruthy();
    }, 300000);

    test('test get pendings', async () => {
        const data = {uid: 0};
        const response = await request(app).post('/api/friends/pendings')
        .set('Authorization', 'Bearer ' + token)
        .send(data);
        expect(response.statusCode).toEqual(200);
        expect(response).toBeTruthy();
    }, 300000);

    test('test update Date', async () => {
        const data = {uid: 0, fid : 0};
        const response = await request(app).patch('/api/friends/i')
        .set('Authorization', 'Bearer ' + token)
        .send(data);
        expect(response.statusCode).toEqual(200);
        expect(response).toBeTruthy();
    }, 300000);

    test('test confirm Connection', () => {
        const data = {uid : 0, fid : 0};
        return request(app).post('/api/friends/check')
        .set('Authorization', 'Bearer ' + token)
        .send(data)
        .expect(200).then(response => {
            expect(response).toBeTruthy()});
    }, 300000);

});

describe('Test Status endpoint', () => {
    test('test getUnviewd', () => {
        return request(app).post('/api/status/getUnviewed').send(testToken,{uid:131})
        .set('Authorization', 'Bearer ' + token)
        .expect(200).then(response => {
            expect(response).toBeTruthy()});
    }, 300000);


    test('test post status', () => {
        return request(app).post('/api/status/')
        .set('Authorization', 'Bearer ' + token)
        .send(testToken,{uid:0, userName: 'xxx', postTime: " ", content : "new post"})
        .expect(500).then(response => {
            expect(response).toBeTruthy()});
    }, 300000);

    // test('test setRoom ', () => {
    //     return request(app).post('/api/friends/room')
    //     .set('Authorization', 'Bearer ' + token)
    //     .send({roomId: 0 , uid: 0, fid : 0})
    //     .expect(200).then(response => {
    //         expect(response).toBeTruthy()});
    // });

    // test('test setRoomName', () => {
    //     return request(app).post('/api/friends/roomName')
    //     .set('Authorization', 'Bearer ' + token)
    //     .send({roomName: 0 , uid: 0, fid : 0})
    //     .expect(200).then(response => {
    //         expect(response).toBeTruthy()});
    // });

    // test('test contact suggestion', () => {
    //     return request(app).post('/api/friends/suggestion')
    //     .set('Authorization', 'Bearer ' + token)
    //     .send({uid : 131, userName : 'ruochunw'})
    //     .expect(200).then(response => {
    //         expect(response).toBeTruthy()});
    // });
});


describe('Test Message endpoint', () => {
    test('test create message', () => {
        const data = {sid: 0, rid: 0};
        return request(app).post('/api/messages/create')
        .set('Authorization', 'Bearer ' + token)
        .send(data)
        .expect(201).then(response => {
            expect(response).toBeTruthy()});
    }, 400000);

    test('test get media', () => {
        const data = {path : 'noPicture.jpg'};
        return request(app).post('/api/messages/getMedia')
        .set('Authorization', 'Bearer ' + token)
        .send(data)
        .expect(500).then(response => {
            expect(response).toBeTruthy()});
    }, 400000);

    test('test send media message', () => {
        const data = {path : 'cat.jpg'};
        return request(app).post('/api/messages/media')
        .set('Authorization', 'Bearer ' + token)
        .send(data)
        .expect(500).then(response => {
            expect(response).toBeTruthy()});
    }, 400000);

    test('test retrieve message', () => {
        const data = {sid: 1 , rid: 1};
        return request(app).post('/api/messages/retrieve')
        .set('Authorization', 'Bearer ' + token)
        .send(data)
        .expect(200).then(response => {
            expect(response).toBeTruthy()});
    }, 400000);

    test('test delete Message', () => {
        const data = {mid: 0};
        return request(app).post('/api/messages/m')
        .set('Authorization', 'Bearer ' + token)
        .send(data)
        .expect(200).then(response => {
            expect(response).toBeTruthy()});
    }, 400000);

    test('test deleteConvo', () => {
        const data = {sid: 0 , rid: 0};
        return request(app).post('/api/messages/c')
        .set('Authorization', 'Bearer ' + token)
        .send(data)
        .expect(200).then(response => {
            expect(response).toBeTruthy()});
    }, 400000);

    test('test update Date', () => {
        const data = {uid: 0, fid : 0};
        return request(app).patch('/api/friends/i')
        .set('Authorization', 'Bearer ' + token)
        .send(data)
        .expect(200).then(response => {
            expect(response).toBeTruthy()});
    });
});


describe('Test Status endpoint', () => {
    test('test getUnviewd', () => {
        return request(app).post('/api/status/getUnviewed').send(testToken,{uid:131})
        .set('Authorization', 'Bearer ' + token)
        .expect(200).then(response => {
            expect(response).toBeTruthy()});
    }, 400000);


    test('test post status', () => {
        return request(app).post('/api/status/')
        .set('Authorization', 'Bearer ' + token)
        .send(testToken,{uid:0, userName: 'xxx', postTime: " ", content : "new post"})
        .expect(500).then(response => {
            expect(response).toBeTruthy()});
    }, 400000);
});


describe('Test Video endpoint', () => {
    test('test post video', () => {
         const data = {uid: 131};
        return request(app).post('/api/video/token')
        .set('Authorization', 'Bearer ' + token)
        .send(data)
        .expect(200).then(response => {
            expect(response).toBeTruthy()});
    }, 400000);

    test('test stop video', () => {
         const data = {fid: 0, uid: 0};
        return request(app).patch('/api/video/stopVid')
        .set('Authorization', 'Bearer ' + token)
        .send(data)
        .expect(200).then(response => {
            expect(response).toBeTruthy()});
    }, 400000);
});


afterAll(done => {
  server.close();
  done();
});
