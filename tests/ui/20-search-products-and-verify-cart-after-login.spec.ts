import { test, expect } from '@playwright/test';
import { existingUser } from '../fixtures/users';

test('TC-20: Search Products and Verify Cart After Login', async ({ page }) => {
  // 1-2
  await page.goto('/');

  // 3
  await page.getByRole('link', { name: 'Products' }).first().click();

  // 4
  await expect(page).toHaveURL(/\/products/);
  await expect(page.getByRole('heading', { name: /all products/i })).toBeVisible();

  // 5. Search
  await page.locator('#search_product').fill('top');
  await page.locator('#submit_search').click();

  // 6
  await expect(page.getByRole('heading', { name: /searched products/i })).toBeVisible();

  // 7. Search results visible
  const results = page.locator('.features_items .product-image-wrapper');
  await expect(results.first()).toBeVisible();

  // 8. Add a few search results to cart
  const productsToAdd = Math.min(await results.count(), 3);
  for (let i = 0; i < productsToAdd; i++) {
    await results.nth(i).hover();
    await results.nth(i).locator('.add-to-cart').first().click();
    // Dismiss the modal between adds (skip on the last one — we'll just navigate away)
    if (i < productsToAdd - 1) {
      await page.getByRole('button', { name: 'Continue Shopping' }).click();
    }
  }

  // 9. Go to cart and verify products are visible
  await page.getByRole('link', { name: 'View Cart' }).click();
  await expect(page).toHaveURL(/\/view_cart/);
  const cartRowsBefore = page.locator('#cart_info_table tbody tr');
  await expect(cartRowsBefore).toHaveCount(productsToAdd);

  // 10. Login
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  const loginForm = page.locator('form[action="/login"]');
  await loginForm.getByPlaceholder('Email Address').fill(existingUser.email);
  await loginForm.getByPlaceholder('Password').fill(existingUser.password);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText(`Logged in as ${existingUser.name}`)).toBeVisible();

  // 11
  await page.getByRole('link', { name: 'Cart' }).first().click();
  await expect(page).toHaveURL(/\/view_cart/);

  // 12. Same products are still in cart after login
  const cartRowsAfter = page.locator('#cart_info_table tbody tr');
  await expect(cartRowsAfter).toHaveCount(productsToAdd);
});
