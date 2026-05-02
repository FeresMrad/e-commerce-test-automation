import { test, expect } from '@playwright/test';
import path from 'path';

test('TC-06: Contact Us Form', async ({ page }) => {
  // 1-2
  await page.goto('/');

  // 3
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4
  await page.getByRole('link', { name: /contact us/i }).first().click();

  // 5
  await expect(page.getByRole('heading', { name: /get in touch/i })).toBeVisible();

  // 6. Fill form
  await page.locator('input[name="name"]').fill('Test User');
  await page.locator('input[name="email"]').fill('test@example.com');
  await page.locator('input[name="subject"]').fill('Test Subject');
  await page.locator('textarea[name="message"]').fill('This is a test message.');

  // 7. Upload file
  await page
    .locator('input[name="upload_file"]')
    .setInputFiles(path.join(__dirname, '../fixtures/upload-sample.txt'));

  // 9 (pre-armed). The site fires a confirm() dialog after Submit — the handler must be
  // registered BEFORE the click. dialog.accept() = clicking OK.
  page.once('dialog', (dialog) => dialog.accept());

  // 8. Submit
  await page.locator('input[name="submit"]').click();

  // 10. Scope to #contact-page — same success text exists in a hidden #success-subscribe div
  await expect(
    page.locator('#contact-page').getByText(/success! your details have been submitted successfully\./i),
  ).toBeVisible();

  // 11. Home and verify
  await page.getByRole('link', { name: 'Home' }).first().click();
  await expect(page).toHaveURL(/automationexercise\.com\/?$/);
  await expect(page.locator('#slider').first()).toBeVisible();
});
