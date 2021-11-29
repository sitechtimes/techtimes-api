import request from 'supertest';
import {app} from "../../app";
//PRIORITY, CHANGE "connectToDatabase" and "verify.ts" (in services) can read info from env file.
it ("fetches all articles and find them by slug || DOES NOT WORK, NO WAY TO PUBLISH ARTICLES YET", async()=>{

    let articles = await request(app).get('/articles/homepage')
    expect(articles.status).toBe(200)

    let chosen = articles.body[0]

    let found = await request(app).get(`/show/${chosen!.slug}`)

    expect(chosen).toEqual(found.body)

})
