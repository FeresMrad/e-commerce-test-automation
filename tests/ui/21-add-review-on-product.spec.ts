import { test, expect } from '@playwright/test';

test('TC-21: Add review on product', async ({ page }) => {
  // 1-2
  await page.goto('/');

  // 3
  await page.getByRole('link', { name: 'Products' }).first().click();

  // 4
  await expect(page).toHaveURL(/\/products/);
  await expect(page.getByRole('heading', { name: /all products/i })).toBeVisible();

  // 5. View first product
  await page.getByRole('link', { name: 'View Product' }).first().click();
  await expect(page).toHaveURL(/\/product_details\//);

  // 6
  await expect(page.getByText(/write your review/i)).toBeVisible();

  // 7. Fill review form
  await page.locator('#name').fill('Test Reviewer');
  await page.locator('#email').fill('reviewer@example.com');
  await page.locator('#review').fill('Great product, highly recommend.');

  // 8. Submit
  await page.locator('#button-review').click();

  // 9
  await expect(page.getByText(/thank you for your review\./i)).toBeVisible();
});
