import { test, expect } from '@playwright/test';

test('TC-22: Add to cart from Recommended items', async ({ page }) => {
  // 1-2
  await page.goto('/');

  // 3. Scroll to bottom (recommended items section sits near the footer)
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  // 4
  const recommended = page.locator('.recommended_items');
  await expect(recommended.getByRole('heading', { name: /recommended items/i })).toBeVisible();

  // 5. Add to cart on a recommended product
  await recommended.locator('.add-to-cart').first().click();

  // 6. View Cart (from the modal)
  await page.getByRole('link', { name: 'View Cart' }).click();
  await expect(page).toHaveURL(/\/view_cart/);

  // 7. Product is in the cart
  await expect(page.locator('#cart_info_table tbody tr')).toHaveCount(1);
});
