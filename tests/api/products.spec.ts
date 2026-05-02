import { test, expect } from '@playwright/test';

test.describe('Products API', () => {
  test('API 1: GET productsList returns the catalog', async ({ request }) => {
    const res = await request.get('/api/productsList');
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBeGreaterThan(0);
    expect(body.products[0]).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      price: expect.any(String),
    });
  });

  test('API 2: POST to productsList is not supported', async ({ request }) => {
    const res = await request.post('/api/productsList');

    // automationexercise returns HTTP 200 even for "method not supported" —
    // the real status code lives in the JSON body's responseCode field.
    const body = await res.json();
    expect(body.responseCode).toBe(405);
    expect(body.message).toMatch(/this request method is not supported/i);
  });

  test('API 5: POST searchProduct returns matching items', async ({ request }) => {
    const res = await request.post('/api/searchProduct', {
      // form-encoded, NOT JSON — the endpoint reads from form data
      form: { search_product: 'top' },
    });
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBeGreaterThan(0);
  });

  test('API 6: POST searchProduct without param returns 400', async ({ request }) => {
    const res = await request.post('/api/searchProduct');

    const body = await res.json();
    expect(body.responseCode).toBe(400);
    expect(body.message).toMatch(/search_product parameter is missing/i);
  });
});
