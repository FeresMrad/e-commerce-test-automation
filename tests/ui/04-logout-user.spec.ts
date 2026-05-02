import { test, expect } from '@playwright/test';
import { existingUser } from '../fixtures/users';

test('TC-04: Logout User', async ({ page }) => {
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
  await loginForm.getByPlaceholder('Email Address').fill(existingUser.email);
  await loginForm.getByPlaceholder('Password').fill(existingUser.password);

  // 7
  await page.getByRole('button', { name: 'Login' }).click();

  // 8
  await expect(page.getByText(`Logged in as ${existingUser.name}`)).toBeVisible();

  // 9
  await page.getByRole('link', { name: 'Logout' }).click();

  // 10
  await expect(page).toHaveURL(/\/login/);
  await expect(page.getByRole('heading', { name: /login to your account/i })).toBeVisible();
});
