import request from 'supertest';
import {app} from '../../app';

it('allows user to successfully create draft', async () => {
   return app.post('/api/cms')
});