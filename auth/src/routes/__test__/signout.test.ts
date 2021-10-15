import request from 'supertest';
import {app} from "../../app";
import faker from "faker";

it('clear the cookie after signing out', async () => {
    let email = faker.internet.email()
    await request(app).post('/auth/signup')
        .send({
            name: "Test Name",
            email: email,
            password: '123456789'
        })
        .expect(201);

    await request(app).post('/auth/signin')
    .send({
        email: email,
        password: 'password'
    })
    .expect(400);

    const response = await request(app).post('/auth/signout')
        .send({})
        .expect(204);

    expect(response.get('Set-Cookie')[0])
        .toEqual('express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly')
});