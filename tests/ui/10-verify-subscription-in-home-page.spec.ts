import { test, expect } from '@playwright/test';

test('TC-10: Verify Subscription in home page', async ({ page }) => {
  // 1-2
  await page.goto('/');

  // 3
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. Scroll to footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  // 5
  await expect(page.getByText('SUBSCRIPTION').first()).toBeVisible();

  // 6. Enter email and click the arrow button
  await page.locator('#susbscribe_email').fill('subscribe.test@example.com');
  await page.locator('#subscribe').click();

  // 7
  await expect(page.getByText(/you have been successfully subscribed!/i)).toBeVisible();
});
