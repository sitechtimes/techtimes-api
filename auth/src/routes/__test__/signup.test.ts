import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
    return request(app).post('/api/auth/signup')
        .send({
            name: "Test",
            email: 'test@sitechhs.com',
            password: 'password'
        })
        .expect(201);
});

it('returns a 400 with an invalid formatted email', async () => {
    return request(app).post('/api/auth/signup')
        .send({
            name: "Test",
            email: 'test',
            password: 'password'
        })
        .expect(400);
});

it('returns a 400 with an invalid sitechhs email', async () => {
    return request(app).post('/api/auth/signup')
        .send({
            name: "Test",
            email: 'test@gmail.com',
            password: 'password'
        })
        .expect(400);
});

it('returns a 400 with a missing email, password, or name', async () => {
    await request(app).post('/api/auth/signup')
        .send({
            name: "Test",
            email: 'test@sitechhs.com',
        })
        .expect(400);

    await request(app).post('/api/auth/signup')
        .send({
            name: "Test",
            password: 'password',
        })
        .expect(400);

    await request(app).post('/api/auth/signup')
        .send({
            email: 'test@sitechhs.com',
            password: 'password',
        })
        .expect(400);
});

it('returns a 400 if signup with existing email is attempted', async () => {
    await request(app).post('/api/auth/signup')
        .send({
            name: "Test",
            email: 'test@sitechhs.com',
            password: 'password'
        })
        .expect(201);

    await request(app).post('/api/auth/signup')
        .send({
            name: "Test",
            email: 'test@sitechhs.com',
            password: 'password',
        })
        .expect(400);
});


it('sets a cookie after a succesful signup', async () => {
    const response =  await request(app).post('/api/auth/signup')
        .send({
            name: "Test",
            email: 'test@sitechhs.com',
            password: 'password'
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
});
