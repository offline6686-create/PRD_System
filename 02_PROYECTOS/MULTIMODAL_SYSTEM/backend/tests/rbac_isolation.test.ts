import request from 'supertest';
import { createApp } from '../src/app/app';

const app = createApp();

describe('PRD_SYSTEM — RBAC & Isolation Security Suite', () => {

  let adminToken: string;
  let teacherToken: string;
  let studentToken: string;
  let clientToken: string;

  beforeAll(async () => {
    // Authenticate all 4 roles
    const adminRes = await request(app).post('/api/auth/login').send({ usernameOrEmail: 'admin', password: 'admin123' });
    adminToken = adminRes.body.accessToken;

    const teacherRes = await request(app).post('/api/auth/login').send({ usernameOrEmail: 'docente', password: 'admin123' });
    teacherToken = teacherRes.body.accessToken;

    const studentRes = await request(app).post('/api/auth/login').send({ usernameOrEmail: 'alumno', password: 'admin123' });
    studentToken = studentRes.body.accessToken;

    const clientRes = await request(app).post('/api/auth/login').send({ usernameOrEmail: 'cliente', password: 'admin123' });
    clientToken = clientRes.body.accessToken;
  });

  test('STUDENT intentando acceder a /api/admin/stats debe retornar 403 Forbidden', async () => {
    const res = await request(app)
      .get('/api/admin/stats')
      .set('Authorization', `Bearer ${studentToken}`);

    expect(res.status).toBe(403);
    expect(res.body.error).toBe(true);
  });

  test('TEACHER intentando acceder a /api/economy/providers debe retornar 403 Forbidden', async () => {
    const res = await request(app)
      .get('/api/economy/providers')
      .set('Authorization', `Bearer ${teacherToken}`);

    expect(res.status).toBe(403);
    expect(res.body.error).toBe(true);
  });

  test('CLIENT intentando acceder a /api/music/courses debe retornar 403 Forbidden', async () => {
    const res = await request(app)
      .get('/api/music/courses')
      .set('Authorization', `Bearer ${clientToken}`);

    expect(res.status).toBe(403);
    expect(res.body.error).toBe(true);
  });

  test('CLIENT intentando consultar pedido de otro cliente debe retornar 403 Forbidden', async () => {
    const res = await request(app)
      .get('/api/ecommerce/orders/other-client-id')
      .set('Authorization', `Bearer ${clientToken}`);

    expect(res.status).toBe(403);
    expect(res.body.error).toBe(true);
  });

  test('ADMIN intentando acceder a /api/admin/stats debe permitir (200 OK)', async () => {
    const res = await request(app)
      .get('/api/admin/stats')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

});
