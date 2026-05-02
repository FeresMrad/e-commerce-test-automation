import { test, expect } from '@playwright/test';

test('TC-09: Search Product', async ({ page }) => {
  // 1-2
  await page.goto('/');

  // 3
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4
  await page.getByRole('link', { name: 'Products' }).first().click();

  // 5
  await expect(page).toHaveURL(/\/products/);
  await expect(page.getByRole('heading', { name: /all products/i })).toBeVisible();

  // 6. Search
  const searchTerm = 'top';
  await page.locator('#search_product').fill(searchTerm);
  await page.locator('#submit_search').click();

  // 7
  await expect(page.getByRole('heading', { name: /searched products/i })).toBeVisible();

  // 8. At least one product card is visible
  const productCards = page.locator('.features_items .product-image-wrapper');
  await expect(productCards.first()).toBeVisible();
  expect(await productCards.count()).toBeGreaterThan(0);
});
