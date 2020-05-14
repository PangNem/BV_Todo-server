import * as request from 'supertest';
import app from '../src/app';

describe('app.test', () => {
  it('GET /', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });

  it('GET /unknown', async () => {
    const response = await request(app).get('/unknown').expect(404);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Not Found');
  });

});

describe('Sample Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true);
  });
});
