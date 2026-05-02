import { test, expect } from '@playwright/test';

test("TC-26: Verify Scroll Up without 'Arrow' button and Scroll Down functionality", async ({ page }) => {
  // 1-2
  await page.goto('/');

  // 3
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. Scroll to bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  // 5. Verify SUBSCRIPTION (footer) is visible
  await expect(page.getByText('SUBSCRIPTION').first()).toBeVisible();

  // 6. Scroll back to top programmatically (no arrow button)
  await page.evaluate(() => window.scrollTo(0, 0));

  // 7. Verify hero text is in viewport.
  // The hero is a carousel with 3 stacked <h2>s — first() picks one to assert against.
  await expect(
    page.getByRole('heading', { name: /full-fledged practice website/i }).first(),
  ).toBeInViewport();
});
