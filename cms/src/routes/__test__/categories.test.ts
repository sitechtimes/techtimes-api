import {app} from "../../app";
import request from 'supertest';

it('fetch categories from cms', async () => {
    await request(app).get('/cms/categories')
        .expect(200)
});
