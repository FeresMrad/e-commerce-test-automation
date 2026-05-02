import { test, expect } from '@playwright/test';
import { newUser } from '../../fixtures/users';

// `serial` makes the four lifecycle steps run in order and stops on the first failure —
// downstream tests can't pass if create fails, so retrying them just adds noise.
test.describe.serial('Account API lifecycle', () => {
  // Fresh email per run so createAccount doesn't fail with "user already exists".
  const user = { ...newUser, email: `qa+${Date.now()}@example.invalid` };

  // Maps the fixture user onto the form fields createAccount/updateAccount expect.
  const accountForm = {
    name: user.name,
    email: user.email,
    password: user.password,
    title: 'Mr',
    birth_date: user.dob.day,
    birth_month: user.dob.month,
    birth_year: user.dob.year,
    firstname: user.firstName,
    lastname: user.lastName,
    company: user.company,
    address1: user.address1,
    address2: user.address2,
    country: user.country,
    zipcode: user.zipcode,
    state: user.state,
    city: user.city,
    mobile_number: user.mobile,
  };

  test('API 11: POST createAccount creates a new user', async ({ request }) => {
    const res = await request.post('/api/createAccount', { form: accountForm });

    const body = await res.json();
    expect(body.responseCode).toBe(201);
    expect(body.message).toMatch(/user created/i);
  });

  test('API 14: GET getUserDetailByEmail returns the new user', async ({ request }) => {
    const res = await request.get('/api/getUserDetailByEmail', {
      params: { email: user.email },
    });

    const body = await res.json();
    expect(body.responseCode).toBe(200);
    expect(body.user).toMatchObject({
      email: user.email,
      name: user.name,
    });
  });

  test('API 13: PUT updateAccount updates the user', async ({ request }) => {
    const res = await request.put('/api/updateAccount', {
      form: { ...accountForm, firstname: 'Updated' },
    });

    const body = await res.json();
    expect(body.responseCode).toBe(200);
    expect(body.message).toMatch(/user updated/i);
  });

  test('API 12: DELETE deleteAccount removes the user', async ({ request }) => {
    const res = await request.delete('/api/deleteAccount', {
      form: { email: user.email, password: user.password },
    });

    const body = await res.json();
    expect(body.responseCode).toBe(200);
    expect(body.message).toMatch(/account deleted/i);
  });
});
