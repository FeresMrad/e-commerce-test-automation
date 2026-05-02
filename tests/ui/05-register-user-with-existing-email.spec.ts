import { test, expect } from '@playwright/test';
import { existingUser } from '../fixtures/users';

test('TC-05: Register User with existing email', async ({ page }) => {
  // 1-2
  await page.goto('/');

  // 3
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4
  await page.getByRole('link', { name: 'Signup / Login' }).click();

  // 5
  await expect(page.getByRole('heading', { name: /new user signup!/i })).toBeVisible();

  // 6
  const signupForm = page.locator('form[action="/signup"]');
  await signupForm.getByPlaceholder('Name').fill(existingUser.name);
  await signupForm.getByPlaceholder('Email Address').fill(existingUser.email);

  // 7
  await page.getByRole('button', { name: 'Signup' }).click();

  // 8
  await expect(page.getByText(/email address already exist!/i)).toBeVisible();
});
