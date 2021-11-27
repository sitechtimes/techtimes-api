import {app} from "../../app";
import {app as authApp} from "../../../../auth/src/app"
import request from 'supertest';
import faker from "faker";

var token:string;
var articleID:String;

it('creates a new article for publish test', async () => {
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

    let article = await request(app).post('/cms/')
        .set({authorization: token})

    articleID = JSON.parse(article.text).id

    expect(article.status).toBe(201)

});

it('publishes an article || DOES NOT WORK YET, REQUIRES ROLE ADMIN FOR THE USER TO DO SO', async()=>{
    await request(app).post(`/cms/${articleID}/publish`)
        .set({authorization: token})
        .expect(200)
})