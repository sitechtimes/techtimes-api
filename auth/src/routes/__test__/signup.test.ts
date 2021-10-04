import request from 'supertest';
import { app } from '../../app';
import faker from "faker";
//PRIORITY, CHANGE "connectToDatabase" and "verify.ts" (in services) can read info from env file.

it('returns a 201 on successful signup', async () => {
    let email = faker.internet.email()
    return request(app).post('/auth/signup')
        .send({
            name: "Test Name",
            email: email,
            password: '123456789'
        })
        .expect(201);

});

it('returns a 400 with an invalid formatted email', async () => {
    return request(app).post('/auth/signup')
        .send({
            name: "Test Name",
            email: 'test',
            password: 'password'
        })
        .expect(400);
});

// it('returns a 400 with an invalid sitechhs email', async () => {
//     return request(app).post('/auth/signup')
//         .send({
//             name: "Test Name",
//             email: 'test@gmail.com',
//             password: 'password'
//         })
//         .expect(400);
// });

it('returns a 400 with a missing email, password, or name', async () => {
    await request(app).post('/auth/signup')
        .send({
            name: "Test Name",
            email: 'test@sitechhs.com',
        })
        .expect(400);

    await request(app).post('/auth/signup')
        .send({
            name: "Test Name",
            password: 'password',
        })
        .expect(400);

    await request(app).post('/auth/signup')
        .send({
            email: 'test@sitechhs.com',
            password: 'password',
        })
        .expect(400);
});

it('returns a 400 if signup with existing email is attempted', async () => {
    let email = faker.internet.email()
    await request(app).post('/auth/signup')
        .send({
            name: "Test Name",
            email: email,
            password: 'password'
        })
        .expect(201);

    await request(app).post('/auth/signup')
        .send({
            name: "Test Name",
            email: email,
            password: 'password',
        })
        .expect(400);
});

//
it('sets a cookie after a successful signup', async () => {
    let email = faker.internet.email()
    const response:any =  await request(app).post('/auth/signup')
        .send({
            name: "Test Name",
            email: email,
            password: 'password'
        })
        .expect(201);

    console.log(Object.keys(response.text))

    expect(response).toBeDefined();
});
