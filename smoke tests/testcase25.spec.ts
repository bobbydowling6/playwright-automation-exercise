import { test, expect} from '@playwright/test';
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

test('Test Case 25: Verify Scroll Up using Arrow button and Scroll Down Functionality', async ({ page }) => {
  const homePage = new HomePage(page);
  await test.step('Go to https://automationexercise.com/', async () => {
  await homePage.navigate();
  await test.step('Verify that home page is visible successfully', async () => {
  await homePage.isHomePageVisible();
  });
})
await test.step('Scroll down to footer', async () => {
  await page.locator('footer').scrollIntoViewIfNeeded();
  await test.step('Verify that \'SUBSCRIPTION\' is visible', async () => {
    await homePage.subscription();
  });
});
await test.step('Click on scroll up button and verify that page is scrolled up', async () => {
  await page.locator('#scrollUp').click();
  await test.step('Verify that top of the page is visible after clicking scroll up button', async () => {
    await homePage.imageBannerVisible();
  });
});
});