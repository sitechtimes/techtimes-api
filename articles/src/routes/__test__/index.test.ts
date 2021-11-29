import request from 'supertest';
import {app} from "../../app";
//PRIORITY, CHANGE "connectToDatabase" and "verify.ts" (in services) can read info from env file.
it ("fetches all the articles", async()=>{

    let articles = await request(app).get('/articles/')
    expect(articles.status).toBe(200)

})

it ("fetches articles with a certain category", async()=>{
    await request(app).get('/articles/homepage?category=covid')
        .expect(200)
})