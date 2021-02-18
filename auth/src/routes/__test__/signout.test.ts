import request from 'supertest';
import {app} from "../../app";

it('clear the cookie after signing out', async () => {
    await request(app).post('/api/auth/signout')
        .send({
            email: 'test@sitechhs',
            password: 'password'
        });

    const response = await request(app).post('/api/auth/signout')
        .send({})
        .expect(204);

    expect(response.get('Set-Cookie')[0])
        .toEqual('express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly')
});