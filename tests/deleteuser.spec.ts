import { test, expect } from '@playwright/test';

test('User is able to register as a new user', async ({ page }) => {
// Go to https://automationexercise.com/
await page.goto('http://automationexercise.com/');
//Verify that home page is visible successfully
await expect(page).toHaveTitle('Automation Exercise');
// Click on 'Signup / Login' button
await page.getByRole('link', { name: ' Signup / Login' }).click();
// Verify Login to your account
await expect(page.getByText('Login to your account')).toBeVisible();
// Enter correct email address and password
await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').click()
await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('btestuser@example.com')
await page.getByRole('textbox', { name: 'Password' }).click();
await page.getByRole('textbox', { name: 'Password' }).fill('Test@1234');
// Click on 'Login' button
await page.getByRole('button', { name: 'Login' }).click();
// Verify that 'Logged in as username' is visible
  await page.getByRole('listitem').filter({ hasText: 'Logged in as Btestuser' });
  //await page.waitForTimeout(4000); // Small wait before proceeding
  await page.getByText('Logged in as Btestuser').click(); // Click to ensure focus

// Click on 'Delete Account' button
  await page.getByRole('link', { name: ' Delete Account' }).click();
  //await page.waitForLoadState('networkidle');
  //await page.waitForTimeout(4000); // Wait for 4 seconds to ensure the next page loads

  // Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
  await expect(page.getByText('Account Deleted!')).toBeVisible();
  //await page.waitForTimeout(4000); // Small wait before clicking continue
  //await page.waitForLoadState('networkidle');
  await page.getByRole('link', { name: 'Continue' }).click();
  //await page.waitForLoadState('networkidle');
  //await page.waitForTimeout(4000); // Wait for 4 seconds to ensure the next page loads
  await expect(page).toHaveTitle('Automation Exercise');

})