import {app} from "../../app";
import {app as authApp} from "../../../../auth/src/app"
import request from 'supertest';
import faker from "faker";

var authorizationToken:string;

it('creates an account with editor/admin permission', async () => {
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

    authorizationToken = JSON.parse(signinResponse.text).token

});

it('fetch articles for review || DOES NOT WORK YET, REQUIRES ROLE ADMIN FOR THE USER TO DO SO', async()=>{
    await request(app).post('/cms/review/')
        .set({authorization: authorizationToken})
        .expect(200)
})