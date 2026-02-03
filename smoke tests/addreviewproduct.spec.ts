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

test('User is able to add review to product', async ({ page }) => {
    await test.step('Go to https://automationexercise.com/', async () => {
        await page.goto('http://automationexercise.com/');
        await test.step('Verify that home page is visible successfully', async () => {
            await expect(page).toHaveTitle('Automation Exercise');
        });
    });

    await test.step('Click on \'Products\' button', async () => {
       await page.getByRole('link', { name: ' Products' }).click();
    });

    await test.step('Verify that user is navigated to ALL PRODUCTS page successfully', async () => {
        await expect(page.getByRole('heading', { name: 'ALL PRODUCTS' })).toBeVisible();
    });

    await test.step('Click on \'View Product\' of first product', async () => {
        await page.getByRole('link', { name: ' View Product' }).first().click();
    });

    await test.step('Verify that \'Write Your Review\' is visible', async () => {
    await expect(page.getByRole('list').filter({ hasText: 'Write Your Review' })).toBeVisible();
    });

    await test.step('Fill out name, email and review fields', async () => {
       await page.getByRole('textbox', { name: 'Your Name' }).fill('Test User');
       await page.getByRole('textbox', { name: 'Email Address', exact: true }).fill('testuser@example.com');
       await page.getByRole('textbox', { name: 'Add Review Here!' }).fill('I am adding a review for this product');
       await page.getByRole('textbox', { name: 'Add Review Here!' }).fill('I am adding a review for this product');
    });

    await test.step('Click on \'Submit\' button', async () => {
       await page.getByRole('button', { name: 'Submit' }).click();
    });

    await test.step('Verify success message \'Thank you for your review.\' is visible', async () => {
        await expect(page.getByText('Thank you for your review.')).toBeVisible();
    });
});