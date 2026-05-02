import { test, expect } from '@playwright/test';
import { newUser } from '../fixtures/users';

test('TC-01: Register User', async ({ page }) => {
  // 1-2. Launch & navigate
  await page.goto('/');

  // 3. Verify home page is visible
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. Click 'Signup / Login'
  await page.getByRole('link', { name: 'Signup / Login' }).click();

  // 5. Verify 'New User Signup!' is visible
  await expect(page.getByRole('heading', { name: /new user signup!/i })).toBeVisible();

  // 6. Enter name and email
  const signupForm = page.locator('form[action="/signup"]');
  await signupForm.getByPlaceholder('Name').fill(newUser.name);
  await signupForm.getByPlaceholder('Email Address').fill(newUser.email);

  // 7. Click 'Signup'
  await page.getByRole('button', { name: 'Signup' }).click();

  // 8. Verify 'ENTER ACCOUNT INFORMATION'
  await expect(page.getByText(/enter account information/i)).toBeVisible();

  // 9. Fill account details
  await page.locator('#id_gender1').check(); // Title: Mr
  // name + email are pre-filled from step 6
  await page.locator('#password').fill(newUser.password);
  await page.locator('#days').selectOption(newUser.dob.day);
  await page.locator('#months').selectOption(newUser.dob.month);
  await page.locator('#years').selectOption(newUser.dob.year);

  // 10. Newsletter
  await page.locator('#newsletter').check();

  // 11. Special offers
  await page.locator('#optin').check();

  // 12. Address details
  await page.locator('#first_name').fill(newUser.firstName);
  await page.locator('#last_name').fill(newUser.lastName);
  await page.locator('#company').fill(newUser.company);
  await page.locator('#address1').fill(newUser.address1);
  await page.locator('#address2').fill(newUser.address2);
  await page.locator('#country').selectOption(newUser.country);
  await page.locator('#state').fill(newUser.state);
  await page.locator('#city').fill(newUser.city);
  await page.locator('#zipcode').fill(newUser.zipcode);
  await page.locator('#mobile_number').fill(newUser.mobile);

  // 13. Click 'Create Account'
  await page.getByRole('button', { name: 'Create Account' }).click();

  // 14. Verify 'ACCOUNT CREATED!'
  await expect(page.getByRole('heading', { name: /account created!/i })).toBeVisible();

  // 15. Click 'Continue'
  await page.getByRole('link', { name: 'Continue' }).click();

  // 16. Verify 'Logged in as username'
  await expect(page.getByText(`Logged in as ${newUser.name}`)).toBeVisible();

  // 17. Click 'Delete Account'
  await page.getByRole('link', { name: 'Delete Account' }).click();

  // 18. Verify 'ACCOUNT DELETED!' and click 'Continue'
  await expect(page.getByRole('heading', { name: /account deleted!/i })).toBeVisible();
  await page.getByRole('link', { name: 'Continue' }).click();
});
