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

test('Verify that user is able to view testcase page', async ({ page }) => {
  await test.step('Go to https://automationexercise.com/', async () => {
    await page.goto('http://automationexercise.com/');
    await test.step('Verify that home page is visible successfully', async () => {
      await expect(page).toHaveTitle('Automation Exercise');
    });
    });
    
  await test.step('Click on \'Test Cases\' button', async () => {
    await page.getByRole('link', { name: ' Test Cases' }).click();
    await test.step('Verify that user is navigated to test cases page successfully', async () => {
      await expect(page).toHaveURL(/\/test_cases/);
      await test.step('Verify that \'Test Cases\' page is visible', async () => {
        await expect(page.getByRole('heading', { name: 'Test Cases', exact: true })).toBeVisible();
      });
    });
  });
});