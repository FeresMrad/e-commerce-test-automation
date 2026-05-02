import { test, expect } from '@playwright/test';

test('TC-03: Login User with incorrect email and password', async ({ page }) => {
  const invalidCreds = {
    email: 'wrong@example.com',
    password: 'WrongPass',
  };

  // 1-2
  await page.goto('/');

  // 3
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4
  await page.getByRole('link', { name: 'Signup / Login' }).click();

  // 5
  await expect(page.getByRole('heading', { name: /login to your account/i })).toBeVisible();

  // 6
  const loginForm = page.locator('form[action="/login"]');
  await loginForm.getByPlaceholder('Email Address').fill(invalidCreds.email);
  await loginForm.getByPlaceholder('Password').fill(invalidCreds.password);

  // 7
  await page.getByRole('button', { name: 'Login' }).click();

  // 8
  await expect(page.getByText(/your email or password is incorrect!/i)).toBeVisible();
});
