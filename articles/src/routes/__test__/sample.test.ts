import request from "supertest";
import { app } from "../../app";

it('returns 200 when users tries to get sample route', async () => {
    await request(app).get('/api/articles')
        .send()
        .expect(200)
});