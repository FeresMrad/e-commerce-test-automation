import { test, expect } from '@playwright/test';
import { newUser } from '../fixtures/users';

test('TC-23: Verify address details in checkout page', async ({ page }) => {
  // 1-2
  await page.goto('/');
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. Signup / Login -> register
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  const signupForm = page.locator('form[action="/signup"]');
  await signupForm.getByPlaceholder('Name').fill(newUser.name);
  await signupForm.getByPlaceholder('Email Address').fill(newUser.email);
  await page.getByRole('button', { name: 'Signup' }).click();
  await page.locator('#id_gender1').check();
  await page.locator('#password').fill(newUser.password);
  await page.locator('#days').selectOption(newUser.dob.day);
  await page.locator('#months').selectOption(newUser.dob.month);
  await page.locator('#years').selectOption(newUser.dob.year);
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
  await page.getByRole('button', { name: 'Create Account' }).click();

  // 6
  await expect(page.getByRole('heading', { name: /account created!/i })).toBeVisible();
  await page.getByRole('link', { name: 'Continue' }).click();

  // 7
  await expect(page.getByText(`Logged in as ${newUser.name}`)).toBeVisible();

  // 8. Add a product to cart
  await page.getByRole('link', { name: 'Products' }).first().click();
  const products = page.locator('.features_items .product-image-wrapper');
  await products.nth(0).hover();
  await products.nth(0).locator('.add-to-cart').first().click();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();

  // 9-10
  await page.getByRole('link', { name: 'Cart' }).first().click();
  await expect(page).toHaveURL(/\/view_cart/);

  // 11
  await page.getByText('Proceed To Checkout').click();

  // 12-13. Verify both delivery and invoice addresses contain the registration data
  for (const sel of ['#address_delivery', '#address_invoice']) {
    const block = page.locator(sel);
    await expect(block).toContainText(newUser.firstName);
    await expect(block).toContainText(newUser.lastName);
    await expect(block).toContainText(newUser.address1);
    await expect(block).toContainText(newUser.city);
    await expect(block).toContainText(newUser.zipcode);
    await expect(block).toContainText(newUser.mobile);
  }

  // 14-15. Delete account
  await page.getByRole('link', { name: 'Delete Account' }).click();
  await expect(page.getByRole('heading', { name: /account deleted!/i })).toBeVisible();
  await page.getByRole('link', { name: 'Continue' }).click();
});
