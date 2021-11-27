import request from 'supertest';
import {app} from "../../app";
import faker from "faker";
import { EmitFlags } from 'typescript';

it('returns current user if authenticated', async () => {

    let email = faker.internet.email()
    await request(app).post('/auth/signup')
        .send({
            name: "Test Name",
            email: email,
            password: 'password'
        })
        .expect(201);

    const signin = await request(app).post('/auth/signin')
        .send({
            email: email,
            password: 'password'
        })
        .expect(200);

    const token = JSON.parse(signin.text).token

    const response:any = await request(app).get('/auth/current-user')
        .set({authorization: token})
        .expect(200);

    //literally no idea what this is doing
    expect(response.body.email).toEqual(email);
});

it('returns null if not authenticated', async () => {
    const response = await request(app).get('/auth/current-user')
        .send()
        .expect(200);

    expect(response.body.email).toEqual(undefined);
});
