import {app} from "../../app";
import {app as authApp} from "../../../../auth/src/app"
import request from 'supertest';
import faker from "faker";

var token:string;
var draft:any;

it('creates a new article for index test', async () => {
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

    let response = await request(app).post('/cms/')
        .set({authorization: token})
        .expect(201)

    draft = JSON.parse(response.text)
});

it("finds the draft", async()=>{
    let response = await request(app).get('/cms/')
        .set({authorization: token})
        .expect(200)

    let articles = JSON.parse(response.text)

    expect(articles).toContainEqual(draft)
})

