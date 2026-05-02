import { test, expect } from '@playwright/test';

test('TC-08: Verify All Products and product detail page', async ({ page }) => {
  // 1-2
  await page.goto('/');

  // 3
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4
  await page.getByRole('link', { name: 'Products' }).first().click();

  // 5
  await expect(page).toHaveURL(/\/products/);
  await expect(page.getByRole('heading', { name: /all products/i })).toBeVisible();

  // 6. Products list is visible
  await expect(page.locator('.features_items .product-image-wrapper').first()).toBeVisible();

  // 7. Click 'View Product' on the first product
  await page.getByRole('link', { name: 'View Product' }).first().click();

  // 8. Landed on product detail page
  await expect(page).toHaveURL(/\/product_details\//);

  // 9. Verify product info section contains expected labels + a name heading
  const productInfo = page.locator('.product-information');
  await expect(productInfo).toBeVisible();
  await expect(productInfo.locator('h2').first()).toBeVisible();
  await expect(productInfo).toContainText('Category:');
  await expect(productInfo).toContainText('Availability:');
  await expect(productInfo).toContainText('Condition:');
  await expect(productInfo).toContainText('Brand:');
});
