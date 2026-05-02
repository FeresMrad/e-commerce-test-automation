import { test, expect } from '@playwright/test';

test.describe('Brands API', () => {
  test('API 3: GET brandsList returns the brand catalog', async ({ request }) => {
    const res = await request.get('/api/brandsList');
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.brands)).toBe(true);
    expect(body.brands.length).toBeGreaterThan(0);
    expect(body.brands[0]).toMatchObject({
      id: expect.any(Number),
      brand: expect.any(String),
    });
  });

  test('API 4: PUT to brandsList is not supported', async ({ request }) => {
    const res = await request.put('/api/brandsList');

    const body = await res.json();
    expect(body.responseCode).toBe(405);
    expect(body.message).toMatch(/this request method is not supported/i);
  });
});
