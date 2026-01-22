import { test, expect } from '@playwright/test';

test('User is able to login with correct credentials', async ({ page }) => {
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
  });
});