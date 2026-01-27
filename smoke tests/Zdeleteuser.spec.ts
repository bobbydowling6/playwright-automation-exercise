import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // Intercept and abort all requests to common ad providers
    await page.route('**/*google*/**', route => {
        const url = route.request().url();
        if (url.includes('googleads') || url.includes('doubleclick') || url.includes('adservice')) {
            return route.abort();
        }
        return route.continue();
    });
});

test('User is able to login as an user and delete account', async ({ page }) => {
  await test.step('Go to https://automationexercise.com/', async () => {
    await page.goto('http://automationexercise.com/');
    await test.step('Verify that home page is visible successfully', async () => {
      await expect(page).toHaveTitle('Automation Exercise');
    });
  });
  await test.step('Click on \'Signup / Login\' button', async () => {
    await page.getByRole('link', { name: ' Signup / Login' }).click();
  });
  await test.step('Verify Login to your account page is visible', async () => {
    await expect(page.getByText('Login to your account')).toBeVisible();
  });
  await test.step('Enter correct email address and password', async () => {
    await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').click();
    await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('btestuser@example.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('Test@1234');
  });
  await test.step('Click on \'Login\' button', async () => {
    await page.getByRole('button', { name: 'Login' }).click();
  });
  await test.step('Verify that \'Logged in as username\' is visible', async () => {
    await expect(page.getByRole('listitem').filter({ hasText: 'Logged in as Btestuser' })).toBeVisible();
    //await page.waitForTimeout(4000); // Small wait before proceeding
    await page.getByText('Logged in as Btestuser').click(); // Click to ensure focus

  await test.step('Click on \'Delete Account\' button', async () => {
    await page.getByRole('link', { name: ' Delete Account' }).click();
  });
  //await page.waitForLoadState('networkidle');
  //await page.waitForTimeout(4000); // Wait for 4 seconds to ensure the next page loads

  await test.step('Verify that \'ACCOUNT DELETED!\' is visible and click \'Continue\' button', async () => {
  await expect(page.getByText('Account Deleted!')).toBeVisible();
  //await page.waitForTimeout(4000); // Small wait before clicking continue
  //await page.waitForLoadState('networkidle');
  await page.getByRole('link', { name: 'Continue' }).click();
  //await page.waitForLoadState('networkidle');
  //await page.waitForTimeout(4000); // Wait for 4 seconds to ensure the next page loads
  await expect(page).toHaveTitle('Automation Exercise');

})
});
});