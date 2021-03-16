<<<<<<< HEAD
import request from 'supertest';
import {app} from '../../app';

it('return 200 for sample articles route', async () => {
    await request(app).get('/api/articles')
        .send()
        .expect(200);
=======
import request from "supertest";
import { app } from "../../app";

it('returns 200 when users tries to get sample route', async () => {
    await request(app).get('/api/articles')
        .send()
        .expect(200)
>>>>>>> 4ba4ffe3a06a262f951fbb044a68e653bbb68614
});