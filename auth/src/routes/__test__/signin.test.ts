import request from 'supertest';
import {app} from "../../app";

it('returns a 400 when signin is attempted with an email does not exist', async () => {
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
