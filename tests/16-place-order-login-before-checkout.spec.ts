import { test, expect } from '@playwright/test';
import { existingUser } from '../fixtures/users';
import { card } from '../fixtures/payment';

test('TC-16: Place Order: Login before Checkout', async ({ page }) => {
  // 1-2
  await page.goto('/');
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. Signup / Login
  await page.getByRole('link', { name: 'Signup / Login' }).click();

  // 5. Login with existing user
  const loginForm = page.locator('form[action="/login"]');
  await loginForm.getByPlaceholder('Email Address').fill(existingUser.email);
  await loginForm.getByPlaceholder('Password').fill(existingUser.password);
  await page.getByRole('button', { name: 'Login' }).click();

  // 6
  await expect(page.getByText(`Logged in as ${existingUser.name}`)).toBeVisible();

  // 7. Add a product to cart
  await page.getByRole('link', { name: 'Products' }).first().click();
  const products = page.locator('.features_items .product-image-wrapper');
  await products.nth(0).hover();
  await products.nth(0).locator('.add-to-cart').first().click();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();

  // 8-9
  await page.getByRole('link', { name: 'Cart' }).first().click();
  await expect(page).toHaveURL(/\/view_cart/);

  // 10
  await page.getByText('Proceed To Checkout').click();

  // 11
  await expect(page.getByRole('heading', { name: /address details/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /review your order/i })).toBeVisible();

  // 12
  await page.locator('textarea[name="message"]').fill('Test order — please process.');
  await page.getByRole('link', { name: /place order/i }).click();

  // 13
  await page.locator('input[name="name_on_card"]').fill(existingUser.name);
  await page.locator('input[name="card_number"]').fill(card.number);
  await page.locator('input[name="cvc"]').fill(card.cvc);
  await page.locator('input[name="expiry_month"]').fill(card.expiryMonth);
  await page.locator('input[name="expiry_year"]').fill(card.expiryYear);

  // 14
  await page.locator('button#submit').click();

  // 15
  await expect(page.getByText(/your order has been placed successfully|order placed/i)).toBeVisible();

  // 16-17. Logout instead of delete (test case modified per user preference)
  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page).toHaveURL(/\/login/);
});
