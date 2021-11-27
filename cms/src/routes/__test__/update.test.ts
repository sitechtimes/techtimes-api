import {app} from "../../app";
import {app as authApp} from "../../../../auth/src/app"
import request from 'supertest';
import faker from "faker";

var token:string;
var articleParsed:any;
var articleID:string;

it('creates a new article with authorization token', async () => {
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
    
    articleParsed = JSON.parse(article.text)
    articleID = JSON.parse(article.text).id
    
    expect(article.status).toBe(201)
});

it('edit some stuff on the article', async()=>{
    let newValue = "sussy little baka"

    let response = await request(app).put(`/cms/${articleID}/`)
        .set({authorization: token})
        .send({title: newValue})
    
    articleParsed!.title = newValue

    let receievedResponse = JSON.parse(response.text)
    delete receievedResponse!.updatedAt

    delete articleParsed!.updatedAt

    expect(response.status).toEqual(200)
    expect(receievedResponse).toEqual(articleParsed)
})