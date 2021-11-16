import {app} from "../../app";
import {app as authApp} from "../../../../auth/src/app"
import request from 'supertest';
import faker from "faker";

it('creates a new article', async () => {
    let email = faker.internet.email()
    const signupResponse = await request(authApp).post('/auth/signup')
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

    const user = signupResponse.text

    const token = JSON.parse(signinResponse.text).token

    let response:any = await request(app).post('/cms/')
        .set({currentUser: token})
    
    let parsed = JSON.parse(JSON.stringify(response))
    console.log(parsed)
    // console.log(Object.keys(parsed))
    expect(response.status).toBe(201)
});

