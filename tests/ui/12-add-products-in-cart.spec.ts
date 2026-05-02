import { test, expect } from '@playwright/test';

test('TC-12: Add Products in Cart', async ({ page }) => {
  // 1-2
  await page.goto('/');

  // 3
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4
  await page.getByRole('link', { name: 'Products' }).first().click();
  await expect(page).toHaveURL(/\/products/);

  // 5. Hover first product, click Add to cart
  const products = page.locator('.features_items .product-image-wrapper');
  await products.nth(0).hover();
  await products.nth(0).locator('.add-to-cart').first().click();

  // 6. Continue Shopping
  await page.getByRole('button', { name: 'Continue Shopping' }).click();

  // 7. Hover second product, click Add to cart
  await products.nth(1).hover();
  await products.nth(1).locator('.add-to-cart').first().click();

  // 8. View Cart (from the modal)
  await page.getByRole('link', { name: 'View Cart' }).click();
  await expect(page).toHaveURL(/\/view_cart/);

  // 9. Verify both products are in the cart
  const cartRows = page.locator('#cart_info_table tbody tr');
  await expect(cartRows).toHaveCount(2);

  // 10. Each row shows price, quantity, total
  for (let i = 0; i < 2; i++) {
    await expect(cartRows.nth(i).locator('.cart_price')).toBeVisible();
    await expect(cartRows.nth(i).locator('.cart_quantity')).toBeVisible();
    await expect(cartRows.nth(i).locator('.cart_total')).toBeVisible();
  }
});
