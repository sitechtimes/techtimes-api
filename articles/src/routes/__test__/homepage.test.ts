import request from 'supertest';
import {app} from "../../app";
//PRIORITY, CHANGE "connectToDatabase" and "verify.ts" (in services) can read info from env file.
it ("fetches homepage articles || DOES NOT WORK, NO WAY TO PUBLISH ARTICLES YET", async()=>{

    let articles = await request(app).get('/articles/homepage')
    expect(articles.status).toBe(200)

})

it ("fetches articles with a certain category || DOES NOT WORK, NO WAY TO PUBLISH ARTICLES YET", async()=>{
    await request(app).get('/articles?category=covid')
        .expect(200)
})

it ("fetches articles with a certain limit || DOES NOT WORK, NO WAY TO PUBLISH ARTICLES YET", async()=>{
    let limit = 10
    let response = await request(app).get(`/articles?q=${limit}`)
    expect(response.status).toBe(200)
    expect(response.body.length).toBe(limit)
})