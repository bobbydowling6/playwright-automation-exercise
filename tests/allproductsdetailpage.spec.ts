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

test('Verify that user is able to verify all products and views first product details page', async ({ page }) => {
    await test.step('Go to https://automationexercise.com/', async () => {
        await page.goto('http://automationexercise.com/');
        await test.step('Verify that home page is visible successfully', async () => {
            await expect(page).toHaveTitle('Automation Exercise');
        });
    });
    await test.step('Click on \'Products\' button', async () => {
        await page.getByRole('link', { name: ' Products' }).click({force: true}); // Note: site uses icons in text
        await test.step('Verify that user is navigated to ALL PRODUCTS page successfully', async () => {
            await expect(page).toHaveURL(/\/products/);
            await test.step('Verify that \'ALL PRODUCTS\' is visible', async () => {
                await expect(page.getByRole('heading', { name: 'All Products', exact: true })).toBeVisible();
            });
        });
    });
    await test.step('Verify that products are visible', async () => {
        const products = page.locator('.features_items .product-image-wrapper');
        await expect(products).toHaveCount(34); // Assuming there are 34 products listed);
    });
    await test.step('Click on \'View Product\' of first product', async () => {
        const firstProduct = page.locator('.features_items .product-image-wrapper').first();
        await firstProduct.getByRole('link', { name: 'View Product' }).click();
        await test.step('Verify that user is navigated to product detail page', async () => {
            await expect(page).toHaveURL(/\/product_details\/\d+/);
            await test.step('Verify that product detail is visible', async () => {
                await expect(page.locator('.product-information')).toBeVisible();
                await expect(page.getByRole('heading', { name: 'Blue Top' })).toBeVisible();
                await expect(page.getByText('Category: Women > Tops')).toBeVisible();
                await expect(page.getByText('Rs.')).toBeVisible();
                await expect(page.getByText('Availability: In Stock')).toBeVisible();
                await expect(page.getByText('Condition: New')).toBeVisible();
                await expect(page.getByText('Brand: Polo')).toBeVisible();
                // Alternatively, using regex to match text patterns
                await expect(page.getByText(/Category: .+/)).toBeVisible();
                await expect(page.getByText(/Rs\..+/)).toBeVisible();
                await expect(page.getByText(/Availability: .+/)).toBeVisible();
                await expect(page.getByText(/Condition: .+/)).toBeVisible();
                await expect(page.getByText(/Brand: .+/)).toBeVisible();
            });
        });
    });
});