import { test, expect} from '@playwright/test';

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
await test.step('Click on scroll up button and verify that page is scrolled up', async () => {
  await page.locator('#scrollUp').click();
  await test.step('Verify that top of the page is visible after clicking scroll up button', async () => {
    await expect(page.getByRole('img', { name: 'Website for automation practice' })).toBeVisible();
  });
});
});