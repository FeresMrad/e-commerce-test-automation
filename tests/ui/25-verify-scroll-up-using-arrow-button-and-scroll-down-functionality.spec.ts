import { test, expect } from '@playwright/test';

test("TC-25: Verify Scroll Up using 'Arrow' button and Scroll Down functionality", async ({ page }) => {
  // 1-2
  await page.goto('/');

  // 3
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. Scroll to bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  // 5. Verify SUBSCRIPTION (footer) is visible
  await expect(page.getByText('SUBSCRIPTION').first()).toBeVisible();

  // 6. Click the scroll-up arrow (only appears after scrolling down)
  await page.locator('#scrollUp').click();

  // 7. Verify hero text is actually in the viewport, not just in the DOM.
  // The hero is a carousel with 3 stacked <h2>s — first() picks one to assert against.
  await expect(
    page.getByRole('heading', { name: /full-fledged practice website/i }).first(),
  ).toBeInViewport();
});
