import {app} from "../../app";
import {app as authApp} from "../../../../auth/src/app"
import request from 'supertest';
import faker from "faker";

var token:string;
var userID:string;

it('creates a new account for user delete test', async () => {
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
    userID = JSON.parse(signinResponse.text).id
});

it('deletes the user', async()=>{

    await request(app).delete(`/users/${userID}`)
        .set({authorization: token})
        .expect(204)

})

it('deletes the user without right authorization', async()=>{

    await request(app).delete(`/users/${userID}`)
        .set({authorization: "Random user authorization token that you literally cant get by chance"})
        .expect(401)
        
})