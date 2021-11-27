import {app} from "../../app";
import {app as authApp} from "../../../../auth/src/app"
import request from 'supertest';
import faker from "faker";

var token:string;
var userID:string;

it('creates a new account for user show test', async () => {
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

it('returns 200 when trying to show a user that exists', async()=>{

    let response = await request(app).get(`/users/${userID}`)
        .set({authorization: token})
        .expect(200)

})

it('returns 404 when trying to show a user that does not exist', async()=>{

    await request(app).get(`/users/thisdoesntwork`)
        .set({authorization: token})
        .expect(404)
        
})

it('returns 401 when trying to show a user with invalid auth token', async()=>{

    await request(app).get(`/users/${userID}`)
        .set({authorization: "Random user authorization token that you literally cant get by chance"})
        .expect(401)
        
})