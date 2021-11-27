import {app} from "../../app";
import {app as authApp} from "../../../../auth/src/app"
import request from 'supertest';
import faker from "faker";

var articleID:string;
var token:string;
var token2:string;

it('creates a account with authorization token for show test', async () => {
    let email = faker.internet.email()
    let email2 = faker.internet.email()

    //person 1 signup and sigin
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

    //person 2 signup and sigin
    await request(authApp).post('/auth/signup')
        .send({
            name: "Test Name",
            email: email2,
            password: '123456789'
        })
        .expect(201);

    const signinResponse2:any = await request(authApp).post('/auth/signin')
        .send({
            email: email2,
            password: '123456789'
        })
        .expect(200);

    token2 = JSON.parse(signinResponse2.text).token
    
    let article = await request(app).post('/cms/')
        .set({authorization: token})
    
    articleID = JSON.parse(article.text).id
    
    expect(article.status).toBe(201)

});

it('show an article made by the current account', async()=>{
    await request(app).get(`/cms/${articleID}`)
        .set({authorization: token})
        .expect(200)
})

it('does not show an article made by a different person', async()=>{
    await request(app).get(`/cms/${articleID}`)
        .set({authorization: token2})
        .expect(401)
})