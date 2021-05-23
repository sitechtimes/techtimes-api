// import mongoose from 'mongoose';
// import { MongoMemoryServer } from 'mongodb-memory-server';
// import request from 'supertest';
// import { slsApp } from "../app";
//
// declare global {
//     namespace NodeJS {
//         interface Global {
//             signin(): Promise<string[]>
//         }
//     }
// }
//
// let mongo: any;
//
// beforeAll(async () => {
//     process.env.JWT_KEY = "testjwtkey";
//
//     mongo = new MongoMemoryServer();
//     const mongoUri = await mongo.getUri();
//
//     await mongoose.connect(mongoUri, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     });
// });
//
// beforeEach(async () => {
//     const collections = await mongoose.connection.db.collections();
//
//     for (let collection of collections){
//         await collection.deleteMany({});
//     }
// });
//
// afterAll(async () => {
//     await mongo.stop();
//     await mongoose.connection.close();
// });
//
// global.signin = async () => {
//     const name = "Test Name"
//     const email = "test@sitechhs.com";
//     const password = "password";
//
//     const response = await request(slsApp)
//         .post('/api/auth/signup')
//         .send({
//             name, email, password
//         })
//         .expect(201);
//
//     const cookie = response.get('Set-Cookie');
//     return cookie;
// };