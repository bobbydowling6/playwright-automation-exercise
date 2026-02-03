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

test('User is able to add product to cart from Recommended items', async ({ page }) => {
    await test.step('Go to https://automationexercise.com/', async () => {
        await page.goto('http://automationexercise.com/');
        await test.step('Verify that home page is visible successfully', async () => {
            await expect(page).toHaveTitle('Automation Exercise');
        });
    });

    await test.step('Scroll down to bottom of page', async () => {
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    });

    await test.step('Verify that \'RECOMMENDED ITEMS\' are visible', async () => {
        await expect(page.getByRole('heading', { name: 'RECOMMENDED ITEMS' })).toBeVisible();
    });

    await test.step('Click on \'Add To Cart\' button on Recommended item', async () => {
       await page.locator('.item > div > .product-image-wrapper > .single-products > .productinfo > .btn').first().click();
    });

    await test.step('Click on \'View Cart\' button in the modal', async () => {
        await page.getByRole('link', { name: 'View Cart' }).click();
    });

    await test.step('Verify that the product is displayed in the cart', async () => {
        await page.getByRole('row', { name: 'Product Image Blue Top Women' }).click();
    });
});