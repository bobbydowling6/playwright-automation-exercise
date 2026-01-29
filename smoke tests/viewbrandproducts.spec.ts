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

test('Verify that user is able to view brand products', async ({ page }) => {
    await test.step('Go to https://automationexercise.com/', async () => {
        await page.goto('http://automationexercise.com/');
        await test.step('Verify that home page is visible successfully', async () => {
            await expect(page).toHaveTitle('Automation Exercise');
        });
    });

    await test.step('click on Products button', async () => {
        await page.getByRole('link', { name: ' Products' }).click();
        await test.step('Verify user is navigated to ALL PRODUCTS page successfully', async () => {
            await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
        });
    });

    await test.step('Click on any brand name link under Brands section', async () => {
        await page.getByRole('link', { name: 'Polo' }).click();
        await test.step('Verify that user is navigated to brand products page', async () => {
            await expect(page.getByRole('heading', { name: 'BRAND - POLO PRODUCTS' })).toBeVisible();
        });
    });

    await test.step('On the left side bar, click on another brand link', async () => {
        await page.getByRole('link', { name: 'Madame' }).click();
        await test.step('Verify that user is navigated to that brand products page', async () => {
            await expect(page.getByRole('heading', { name: 'BRAND - MADAME PRODUCTS' })).toBeVisible();
        });
    });
});