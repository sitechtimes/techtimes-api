import {app} from "../../app";
import {app as authApp} from "../../../../auth/src/app"
import request from 'supertest';
import faker from "faker";

var token:string;

it('creates an account with admin role for ready test', async () => {
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

    token = JSON.parse(signinResponse.text).token

});

it('fetches drafts that are ready || DOES NOT WORK YET, REQUIRES ROLE ADMIN FOR THE USER TO DO SO', async()=>{
    await request(app).get('/cms/ready/')
        .set({authorization: token})
        .expect(200)
})