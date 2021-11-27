import {app} from "../../app";
import {app as authApp} from "../../../../auth/src/app"
import request from 'supertest';
import faker from "faker";

var token:string;
var userID:string;

it('creates a new account for user index test', async () => {
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

    token = JSON.parse(signinResponse.text).token
    userID = JSON.parse(signinResponse.text).id

    expect(signinResponse.status).toEqual(200)
});

it('returns 200 when get users with permission || DOES NOT WORK, CANNOT FIND A WAY TO CHANGE ROLE TO ADMIN ', async()=>{

    await request(app).get(`/users/`)
        .set({authorization: token})
        .expect(200)

})

it('returns 401 when get users without permission', async()=>{

    await request(app).get(`/users/`)
        .set({authorization: token})
        .expect(401)

})
