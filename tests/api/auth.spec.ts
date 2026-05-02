import { test, expect } from '@playwright/test';
import { existingUser } from '../../fixtures/users';

test.describe('Auth API (verifyLogin)', () => {
  test('API 7: POST verifyLogin with valid credentials succeeds', async ({ request }) => {
    const res = await request.post('/api/verifyLogin', {
      form: { email: existingUser.email, password: existingUser.password },
    });
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body.responseCode).toBe(200);
    expect(body.message).toMatch(/user exists/i);
  });

  test('API 8: POST verifyLogin without email returns 400', async ({ request }) => {
    const res = await request.post('/api/verifyLogin', {
      form: { password: existingUser.password },
    });

    const body = await res.json();
    expect(body.responseCode).toBe(400);
    expect(body.message).toMatch(/email or password parameter is missing/i);
  });

  test('API 9: DELETE verifyLogin is not supported', async ({ request }) => {
    const res = await request.delete('/api/verifyLogin');

    const body = await res.json();
    expect(body.responseCode).toBe(405);
    expect(body.message).toMatch(/this request method is not supported/i);
  });

  test('API 10: POST verifyLogin with invalid credentials returns 404', async ({ request }) => {
    const res = await request.post('/api/verifyLogin', {
      form: { email: 'nobody-here@example.invalid', password: 'wrong-password' },
    });

    const body = await res.json();
    expect(body.responseCode).toBe(404);
    expect(body.message).toMatch(/user not found/i);
  });
});
