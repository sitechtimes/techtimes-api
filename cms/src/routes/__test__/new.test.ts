import {app} from "../../app";
import {app as authApp} from "../../../../auth/src/app"
import request from 'supertest';
import faker from "faker";

it('creates a new article with authorization token', async () => {
    let email = faker.internet.email()
    await request(authApp).post('/auth/signup')
        .send({
            name: "Test Name",
            email: email,
            password: '123456789'
        })
        .expect(201);

    const signinResponse:any = await request(authApp).post('/auth/signin')
        .send({
            email: email,
            password: '123456789'
        })
        .expect(200);

    const token = JSON.parse(signinResponse.text).token

    await request(app).post('/cms/')
        .set({authorization: token})
        .expect(201)
});

it('creates an article without authorization token', async()=>{
    await request(app).post('/cms/')
        .expect(401)
})