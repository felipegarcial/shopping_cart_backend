import app from '../server.js';
import request from 'supertest';

describe('GET /api/products', () => {
  it('should return a list of products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('products');
  });
});

describe('POST /api/products', () => {
  it('should create a new product', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({
        name: 'New Product',
        price: 10.99,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('product');
  });
});
