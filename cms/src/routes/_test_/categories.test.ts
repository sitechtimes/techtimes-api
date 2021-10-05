import request from 'supertest';
import {app} from "../../app";

it('returns a 400 when signin is attempted with an email does not exist', async () => {
     await request(app).post('/auth/signin')
         .send({
             email: 'doesnotexist@sitechhs.com',
             password: 'password'
         })
         .expect(400);
});