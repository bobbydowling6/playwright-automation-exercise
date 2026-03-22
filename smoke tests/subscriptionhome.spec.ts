import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

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

test('Verify that user can scroll down to footer and subscribes website on the Home Page', async ({ page }) => {
  const homePage = new HomePage(page);
await test.step('Go to https://automationexercise.com/', async () => {
  await homePage.navigate();
  await test.step('Verify that home page is visible successfully', async () => {
  await homePage.title();
  await homePage.isHomePageVisible();
  });
})
await test.step('Scroll down to footer', async () => {
  await page.locator('footer').scrollIntoViewIfNeeded();
  await test.step('Verify that \'SUBSCRIPTION\' is visible', async () => {
    await homePage.subscription();
  });
});
await test.step('Enter email address in input and click arrow button', async () => {
  await homePage.subscribe();
    await test.step('Verify success message \'You have been successfully subscribed!\' is visible', async () => {   
        await homePage.subscribeSuccessMessage();
    });
});
});