import request from 'supertest';
import {app} from "../../app";
import faker from "faker";
//PRIORITY, CHANGE "connectToDatabase" and "verify.ts" (in services) can read info from env file.

it('returns a 400 when signin is attempted with an email does not exist', async () => {
<<<<<<< HEAD
    let email = faker.internet.email()
    await request(app).post('/auth/signin')
        .send({
            email: email,
            password: 'password'
        })
        .expect(400);
});

it('returns a 400 when signin is attempted with an incorrect password', async () => {
    let email = faker.internet.email()
    await request(app).post('/auth/signup')
        .send({
            name: "Test Name",
            email: email,
            password: 'password'
        })
        .expect(201);

    await request(app).post('/auth/signin')
        .send({
            email: email,
            password: 'wrongpassword'
        })
        .expect(400);
});

it('returns a cookie when valid credentials are given', async () => {
    let email = faker.internet.email()
    await request(app).post('/auth/signup')
        .send({
            name: "Test Name",
            email: email,
            password: 'password'
        })
        .expect(201);

    const response = await request(app).post('/auth/signin')
        .send({
            email: email,
            password: 'password'
        })
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});

=======
     await request(app).post('/auth/signin')
         .send({
             email: 'doesnotexist@sitechhs.com',
             password: 'password'
         })
         .expect(400);
});
// 
// it('returns a 400 when signin is attempted with an incorrect password', async () => {
//     await request(app).post('/auth/signup')
//         .send({
//             name: "Test Name",
//             email: 'test@sitechhs.com',
//             password: 'password'
//         })
//         .expect(201);
// 
//     await request(app).post('/auth/signin')
//         .send({
//             email: 'test@sitechhs.com',
//             password: 'wrongpassword'
//         })
//         .expect(400);
// });
// 
// it('returns a cookie when valid credentials are given', async () => {
//     await request(app).post('/auth/signup')
//         .send({
//             name: "Test Name",
//             email: 'test@sitechhs.com',
//             password: 'password'
//         })
//         .expect(201);
// 
//     const response = await request(app).post('/auth/signin')
//         .send({
//             email: 'test@sitechhs.com',
//             password: 'password'
//         })
//         .expect(200);
// 
//     expect(response.get('Set-Cookie')).toBeDefined();
// });
// 
>>>>>>> 0b5294430e96a6305491105d53ce7599d86cdf8a
