import { test, expect } from '@playwright/test';

test('TC-17: Remove Products From Cart', async ({ page }) => {
  // 1-2
  await page.goto('/');

  // 3
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. Add a product to cart (single product is enough to test removal)
  await page.getByRole('link', { name: 'Products' }).first().click();
  const products = page.locator('.features_items .product-image-wrapper');
  await products.nth(0).hover();
  await products.nth(0).locator('.add-to-cart').first().click();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();

  // 5. Cart
  await page.getByRole('link', { name: 'Cart' }).first().click();

  // 6
  await expect(page).toHaveURL(/\/view_cart/);
  const cartRows = page.locator('#cart_info_table tbody tr');
  await expect(cartRows).toHaveCount(1);

  // 7. Click the X to remove
  await cartRows.first().locator('.cart_quantity_delete').click();

  // 8. Verify the product is gone — empty-cart message appears
  await expect(page.locator('#empty_cart')).toBeVisible();
});
