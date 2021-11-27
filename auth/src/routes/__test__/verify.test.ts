import request from 'supertest';
import { app } from '../../app';
import faker from "faker";
//PRIORITY, CHANGE everything in routes so that they can read info from env file.
//USER.TS send verification email is disabled for testing.

it('verify with valid verificationCode returns 200', async () => {
    let email = faker.internet.email()
    const signup: any = await request(app).post('/auth/signup')
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

    let oldCookie = response.get('Set-Cookie')

    const auth = await request(app).get(`/auth/verify/${JSON.parse(signup.text).verificationCode}`)
        .expect(200);
    
    let newCookie = auth.get('Set-Cookie')

    expect(newCookie).not.toBe(oldCookie)
});

it('verify with invalid verificationCode returns 404', async () => {

    await request(app).get(`/auth/verify/${faker.random.alphaNumeric(50)}`)
        .expect(404);
    

});