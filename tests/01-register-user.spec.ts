import { test, expect } from '@playwright/test';

test('TC-01: Register User', async ({ page }) => {
  const uniqueId = Date.now();
  const user = {
    name: 'Test User',
    email: `test.user.${uniqueId}@example.com`,
    password: 'Password123!',
    firstName: 'Test',
    lastName: 'User',
    company: 'Acme Inc',
    address1: '123 Main St',
    address2: 'Apt 4',
    country: 'United States',
    state: 'California',
    city: 'San Francisco',
    zipcode: '94101',
    mobile: '5551234567',
    dob: { day: '15', month: '6', year: '1990' },
  };

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
  await signupForm.getByPlaceholder('Name').fill(user.name);
  await signupForm.getByPlaceholder('Email Address').fill(user.email);

  // 7. Click 'Signup'
  await page.getByRole('button', { name: 'Signup' }).click();

  // 8. Verify 'ENTER ACCOUNT INFORMATION'
  await expect(page.getByText(/enter account information/i)).toBeVisible();

  // 9. Fill account details
  await page.locator('#id_gender1').check(); // Title: Mr
  // name + email are pre-filled from step 6
  await page.locator('#password').fill(user.password);
  await page.locator('#days').selectOption(user.dob.day);
  await page.locator('#months').selectOption(user.dob.month);
  await page.locator('#years').selectOption(user.dob.year);

  // 10. Newsletter
  await page.locator('#newsletter').check();

  // 11. Special offers
  await page.locator('#optin').check();

  // 12. Address details
  await page.locator('#first_name').fill(user.firstName);
  await page.locator('#last_name').fill(user.lastName);
  await page.locator('#company').fill(user.company);
  await page.locator('#address1').fill(user.address1);
  await page.locator('#address2').fill(user.address2);
  await page.locator('#country').selectOption(user.country);
  await page.locator('#state').fill(user.state);
  await page.locator('#city').fill(user.city);
  await page.locator('#zipcode').fill(user.zipcode);
  await page.locator('#mobile_number').fill(user.mobile);

  // 13. Click 'Create Account'
  await page.getByRole('button', { name: 'Create Account' }).click();

  // 14. Verify 'ACCOUNT CREATED!'
  await expect(page.getByRole('heading', { name: /account created!/i })).toBeVisible();

  // 15. Click 'Continue'
  await page.getByRole('link', { name: 'Continue' }).click();

  // 16. Verify 'Logged in as username'
  await expect(page.getByText(`Logged in as ${user.name}`)).toBeVisible();

  // 17. Click 'Delete Account'
  await page.getByRole('link', { name: 'Delete Account' }).click();

  // 18. Verify 'ACCOUNT DELETED!' and click 'Continue'
  await expect(page.getByRole('heading', { name: /account deleted!/i })).toBeVisible();
  await page.getByRole('link', { name: 'Continue' }).click();
});
