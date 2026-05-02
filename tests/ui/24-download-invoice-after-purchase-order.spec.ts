import { test, expect } from '@playwright/test';
import { newUser } from '../fixtures/users';
import { card } from '../fixtures/payment';

test('TC-24: Download Invoice after purchase order', async ({ page }) => {
  // 1-2
  await page.goto('/');
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. Add a product to cart
  await page.getByRole('link', { name: 'Products' }).first().click();
  const products = page.locator('.features_items .product-image-wrapper');
  await products.nth(0).hover();
  await products.nth(0).locator('.add-to-cart').first().click();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();

  // 5-6
  await page.getByRole('link', { name: 'Cart' }).first().click();
  await expect(page).toHaveURL(/\/view_cart/);

  // 7
  await page.getByText('Proceed To Checkout').click();

  // 8. Register / Login from modal
  await page.getByRole('link', { name: /register \/ login/i }).click();

  // 9. Signup
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

  // 10
  await expect(page.getByRole('heading', { name: /account created!/i })).toBeVisible();
  await page.getByRole('link', { name: 'Continue' }).click();

  // 11
  await expect(page.getByText(`Logged in as ${newUser.name}`)).toBeVisible();

  // 12-13
  await page.getByRole('link', { name: 'Cart' }).first().click();
  await page.getByText('Proceed To Checkout').click();

  // 14
  await expect(page.getByRole('heading', { name: /address details/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /review your order/i })).toBeVisible();

  // 15
  await page.locator('textarea[name="message"]').fill('Test order — please process.');
  await page.getByRole('link', { name: /place order/i }).click();

  // 16
  await page.locator('input[name="name_on_card"]').fill(newUser.name);
  await page.locator('input[name="card_number"]').fill(card.number);
  await page.locator('input[name="cvc"]').fill(card.cvc);
  await page.locator('input[name="expiry_month"]').fill(card.expiryMonth);
  await page.locator('input[name="expiry_year"]').fill(card.expiryYear);

  // 17
  await page.locator('button#submit').click();

  // 18
  await expect(page.getByText(/your order has been placed successfully|order placed/i)).toBeVisible();

  // 19. Download invoice. Listener registered BEFORE the click, same pattern as the dialog in TC-06.
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: /download invoice/i }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/\.txt$|\.pdf$|invoice/i);

  // 20
  await page.getByRole('link', { name: 'Continue' }).click();

  // 21-22
  await page.getByRole('link', { name: 'Delete Account' }).click();
  await expect(page.getByRole('heading', { name: /account deleted!/i })).toBeVisible();
  await page.getByRole('link', { name: 'Continue' }).click();
});
