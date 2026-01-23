import { test, expect } from '@playwright/test';

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

test('Verify products added in cart', async ({ page }) => {
    await test.step('Go to https://automationexercise.com/', async () => {
    await page.goto('http://automationexercise.com/');
    await test.step('Verify that home page is visible successfully', async () => {
      await expect(page).toHaveTitle('Automation Exercise');
    });
    });
    await test.step('Navigate to Products', async () => {
        await page.getByRole('link', { name: ' Products' }).click({force: true}); // Note: site uses icons in text
        await test.step('Verify that user is navigated to ALL PRODUCTS page successfully', async () => {
            await expect(page).toHaveURL(/\/products/);
            await test.step('Verify that \'ALL PRODUCTS\' is visible', async () => {
                await expect(page.getByRole('heading', { name: 'All Products', exact: true })).toBeVisible();
            });
        });
    });

    await test.step('Add products to cart', async () => {
        const products = page.locator('.single-products');

        // First Product: Hover and click
        await products.first().hover();
        // Targeting the 'Add to cart' in the overlay to ensure visibility
        await products.first().locator('.overlay-content .add-to-cart').click();
        await page.getByRole('button', { name: 'Continue Shopping' }).click();

        // Second Product: Hover and click
        await products.nth(1).hover();
        await products.nth(1).locator('.overlay-content .add-to-cart').click();
        
        // Use the link inside the modal to go to cart
        await page.locator('#cartModal').getByRole('link', { name: 'View Cart' }).click();
    });

    await test.step('Verify cart items', async () => {
        const cartRows = page.locator('table#cart_info_table tbody tr');
        await expect(cartRows).toHaveCount(2);

        for (let i = 0; i < 2; i++) {
            const row = cartRows.nth(i);
            
            // Extract text and clean it
            const priceText = await row.locator('.cart_price p').innerText();
            const quantityText = await row.locator('.cart_quantity button').innerText(); // Usually a button/text in view cart
            const totalText = await row.locator('.cart_total_price').innerText();

            const price = parseFloat(priceText.replace('Rs. ', ''));
            const quantity = parseInt(quantityText, 10);
            const total = parseFloat(totalText.replace('Rs. ', ''));

            expect(price * quantity).toBe(total);
        }
    });
});
