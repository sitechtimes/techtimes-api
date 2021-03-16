import request from 'supertest';
import {app} from '../../app';

it('return 200 for sample articles route', async () => {
    await request(app).get('/api/articles')
        .send()
        .expect(200);
});