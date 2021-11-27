import {app} from "../../app";
import {app as authApp} from "../../../../auth/src/app"
import request from 'supertest';
import faker from "faker";

var articleID:string;
var token:string;

it('creates a new article for delete test', async () => {
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

it("return 401 when deleting an existing article without access", async()=>{
    await request(app).delete(`/cms/${articleID}`)
        .set({authorization: "randomToken That Doesnt Exist Unless You Have The Luck Of A God,But If You did get it might as well try lottery"})
        .expect(401)
})

it("return 204 when deleting an existing article with access", async()=>{

    await request(app).delete(`/cms/${articleID}`)
        .set({authorization: token})
        .expect(204)
})

it("return 404 when deleting a non-existing article", async()=>{
    await request(app).delete(`/cms/${articleID}`)
        .set({authorization: token})
        .expect(404)
})
