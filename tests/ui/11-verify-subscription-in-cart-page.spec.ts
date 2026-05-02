import { test, expect } from '@playwright/test';

test('TC-11: Verify Subscription in Cart page', async ({ page }) => {
  // 1-2
  await page.goto('/');

  // 3
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. Click 'Cart'
  await page.getByRole('link', { name: 'Cart' }).first().click();
  await expect(page).toHaveURL(/\/view_cart/);

  // 5. Scroll to footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  // 6
  await expect(page.getByText('SUBSCRIPTION').first()).toBeVisible();

  // 7. Enter email and click arrow
  await page.locator('#susbscribe_email').fill('subscribe.test@example.com');
  await page.locator('#subscribe').click();

  // 8
  await expect(page.getByText(/you have been successfully subscribed!/i)).toBeVisible();
});
