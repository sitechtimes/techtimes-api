import request from 'supertest';
import {app} from "../../app";

it('returns current user if authenticated', async () => {
    const cookie = await global.signin();

    const response = await request(app).get('/api/auth/current-user')
        .set('Cookie', cookie).send()
        .expect(200);

    expect(response.body.currentUser.email).toEqual('test@sitechhs.com');
});

it('returns null if not authenticated', async () => {
    const response = await request(app).get('/api/auth/current-user')
        .send()
        .expect(200);

    expect(response.body.currentUser).toEqual(null);
});
