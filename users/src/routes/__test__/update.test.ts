import {app} from "../../app";
import {app as authApp} from "../../../../auth/src/app"
import request from 'supertest';
import faker from "faker";

var token:string;
var userID:string;
var userObject:any;

it('creates a new account for user update test', async () => {
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

    userObject = JSON.parse(signinResponse.text)
    token = JSON.parse(signinResponse.text).token
    userID = JSON.parse(signinResponse.text).id
});

it('updates the user', async()=>{
    let changedValue = "something"

    let response = await request(app).put(`/users/${userID}`)
        .set({authorization: token})
        .send({imageUrl: changedValue})
        
    userObject!.imageUrl = changedValue
    
    delete userObject!.token

    expect(response.status).toBe(200)
    expect(userObject).toEqual(response.body)
    

})

it('return 401 when trying to update the user without right authorization', async()=>{

    await request(app).put(`/users/${userID}`)
        .set({authorization: "Random user authorization token that you literally cant get by chance"})
        .expect(401)
        
})