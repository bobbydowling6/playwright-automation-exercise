import { test, expect } from '@playwright/test';

test('Verify that user can scroll down to footer and subscribes website on the Home Page', async ({ page }) => {
await test.step('Go to https://automationexercise.com/', async () => {
  await page.goto('https://automationexercise.com/');
  await test.step('Verify that home page is visible successfully', async () => {
  await expect(page).toHaveTitle('Automation Exercise');
  });
})
await test.step('Scroll down to footer', async () => {
  await page.locator('footer').scrollIntoViewIfNeeded();
  await test.step('Verify that \'SUBSCRIPTION\' is visible', async () => {
    await expect(page.getByRole('heading', { name: 'Subscription' })).toBeVisible();
  });
});
await test.step('Enter email address in input and click arrow button', async () => {
  await page.getByPlaceholder('Your email address').click();
  await page.getByPlaceholder('Your email address').fill('btestuser@example.com');
  await page.locator('#subscribe').click();
    await test.step('Verify success message \'You have been successfully subscribed!\' is visible', async () => {   
        await expect(page.getByText('You have been successfully subscribed!')).toBeVisible();
    });
});
});