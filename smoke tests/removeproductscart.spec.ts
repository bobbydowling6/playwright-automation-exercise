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

test('Verify products removed from cart', async ({ page }) => {
    await test.step('Go to Home Page', async () => {
        await page.goto('http://automationexercise.com/');
        await expect(page).toHaveTitle(/Automation Exercise/);
    });

    await test.step('Navigate to Products', async () => {
        // Use regex for the link name to avoid icon character issues
        await page.getByRole('link', { name: /Products/i }).click();
        await expect(page).toHaveURL(/\/products/);
        await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
    });

    await test.step('Add products to cart', async () => {
        const products = page.locator('.single-products');

        // Add First Product
        await products.first().hover();
        await page.locator('.overlay-content').first().getByText('Add to cart').click();
        await page.getByRole('button', { name: 'Continue Shopping' }).click();

        // Add Second Product
        await products.nth(1).hover();
        await page.locator('.overlay-content').nth(1).getByText('Add to cart').click();
        
        // Go to Cart
        await page.getByRole('link', { name: 'View Cart' }).click();
    });

    await test.step('Remove products from cart', async () => {
        const cartRows = page.locator('#cart_info_table tbody tr');
        const initialCount = await cartRows.count();
        expect(initialCount).toBe(2);

        // Loop through and delete items
        // We always target the new "first" element because the list shrinks
        for (let i = 0; i < initialCount; i++) {
            const deleteButton = page.locator('.cart_quantity_delete').first();
            await deleteButton.click();
            
            // Wait for the row count to decrease instead of waiting for button to hide
            // This makes the test much faster and more stable
            await expect(cartRows).toHaveCount(initialCount - i - 1);
        }
    });

    await test.step('Verify cart is empty', async () => {
        const cartRows = page.locator('#cart_info_table tbody tr');
        
        // Check that the rows are gone
        await expect(cartRows).toHaveCount(0);
        
        // Automation Exercise shows a specific span when empty
        const emptyCartMessage = page.locator('#empty_cart');
        await expect(emptyCartMessage).toBeVisible();
        await expect(emptyCartMessage).toContainText('Cart is empty!');
    });
});