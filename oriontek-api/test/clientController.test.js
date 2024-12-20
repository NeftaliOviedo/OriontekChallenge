const request = require('supertest');
const express = require('express');
const clientRoutes = require('../routes/clientRoutes');

const app = express();
app.use(express.json());
app.use('/api/clients', clientRoutes);

describe('Client Controller Tests', () => {
  it('should fetch all clients', async () => {
    const res = await request(app).get('/api/clients');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should create a new client', async () => {
    const newClient = { name: 'John Doe', email: 'john.doe@example.com', phone: '1234567890' };
    const res = await request(app).post('/api/clients').send(newClient);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });
});