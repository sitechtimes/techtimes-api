import request from 'supertest';
import {app} from '../../app';

it("When left empty topic defaults to correct value", async () => {
    const response = (await request(app).get('/api/articles')).body;
    expect(response[0]).toEqual("");
});

it("When left empty limit defaults to correct value", async () => {
    const response = (await request(app).get('/api/articles')).body;
    expect(response[1]).toEqual(20);
});

it("When left empty query defaults to correct value", async () => {
    const response = (await request(app).get('/api/articles')).body;
    expect(response[2]).toEqual("");
});

it("When left empty page defaults to correct value", async () => {
    const response = (await request(app).get('/api/articles')).body;
    expect(response[3]).toEqual(0);
});


it('Successfully extracts topic', async () => {
    const response = (await request(app).get('/api/articles?topic=news')).body[0];
    expect(response).toEqual("news");
});

it('Successfully extracts limit', async () => {
    expect((await request(app).get('/api/articles?q=10')).body[1]).toEqual(10);
});

it('Will not accept a string as a limit and will return an error', async () => {
    await request(app).get('/api/articles?q=yup')
    .send()
    .expect(400);
});

it('Will not accept a negative as a limit and will return an error', async () => {
    await request(app).get('/api/articles?q=yup')
    .send()
    .expect(400);
});

it('Can extract all types of of queries at once', async () => {
    const response = (await request(app).get('/api/articles?q=10&topic=news&page=0&query=help')).body;
    console.log(response);
    expect(response).toEqual(["news", 10, "help", 0]);
});

