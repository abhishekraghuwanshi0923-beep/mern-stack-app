const request = require('supertest');
const fs = require('fs/promises');
const path = require('path');
const app = require('../restapi-app/app');

const dataFile = path.resolve(__dirname, '..', 'data', 'items.json');
const initialItems = [
  { id: 1, name: 'Laptop', description: 'A portable computer' },
  { id: 2, name: 'Book', description: 'A collection of pages with text' },
  { id: 3, name: 'Phone', description: 'A mobile communication device' }
];

describe('Items API', () => {
  beforeEach(async () => {
    await fs.writeFile(dataFile, JSON.stringify(initialItems, null, 2), 'utf8');
  });

  it('should get all items', async () => {
    const res = await request(app).get('/api/items');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(initialItems.length);
  });

  it('should create a new item', async () => {
    const res = await request(app).post('/api/items').send({ name: 'Test Item', description: 'A test item' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test Item');
  });

  it('should get a single item', async () => {
    // First create an item
    const createRes = await request(app).post('/api/items').send({ name: 'Another Item' });
    const id = createRes.body.id;

    const res = await request(app).get(`/api/items/${id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toBe(id);
  });

  it('should update an item', async () => {
    // First create an item
    const createRes = await request(app).post('/api/items').send({ name: 'Update Me' });
    const id = createRes.body.id;

    const res = await request(app).put(`/api/items/${id}`).send({ name: 'Updated Item' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('Updated Item');
  });

  it('should delete an item', async () => {
    // First create an item
    const createRes = await request(app).post('/api/items').send({ name: 'Delete Me' });
    const id = createRes.body.id;

    const deleteRes = await request(app).delete(`/api/items/${id}`);
    expect(deleteRes.statusCode).toEqual(204);

    // Verify it's gone
    const getRes = await request(app).get(`/api/items/${id}`);
    expect(getRes.statusCode).toEqual(404);
  });
});