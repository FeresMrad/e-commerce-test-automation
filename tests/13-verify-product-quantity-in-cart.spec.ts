import { test, expect } from '@playwright/test';

test('TC-13: Verify Product quantity in Cart', async ({ page }) => {
  // 1-2
  await page.goto('/');

  // 3
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. View Product on first homepage product
  await page.getByRole('link', { name: 'View Product' }).first().click();

  // 5
  await expect(page).toHaveURL(/\/product_details\//);
  await expect(page.locator('.product-information')).toBeVisible();

  // 6. Set quantity to 4
  await page.locator('#quantity').fill('4');

  // 7. Add to cart
  await page.getByRole('button', { name: /add to cart/i }).click();

  // 8. View Cart from the modal
  await page.getByRole('link', { name: 'View Cart' }).click();
  await expect(page).toHaveURL(/\/view_cart/);

  // 9. Verify cart row shows quantity 4
  const quantityCell = page.locator('#cart_info_table tbody tr').first().locator('.cart_quantity');
  await expect(quantityCell).toContainText('4');
});
