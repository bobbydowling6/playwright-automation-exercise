import { test, expect } from '@playwright/test';

test('Verify that user is able to add products to cart with different quantities', async ({ page }) => {    
    
    await test.step('Navigate to home page', async () => {
        await test.step('Go to https://automationexercise.com/', async () => {
        await page.goto('https://automationexercise.com/');
        await test.step('Verify that home page is visible successfully', async () => {
        await expect(page).toHaveTitle('Automation Exercise');
  });
    });

    await test.step('View a specific product on the home page', async () => {   
        await page.locator('div:nth-child(25) > .product-image-wrapper > .choose > .nav > li > a').click({force: true}); 
    });

    await test.step('Verify product details page is visible', async () => {
        await expect(page.getByRole('heading', { name: 'Green Side Placket Detail' })).toBeVisible();
        await expect(page.locator('.product-information')).toBeVisible();
    });

    await test.step('Add product to cart with quantity 4', async () => {   
        const quantityInput = page.locator('#quantity');
        await quantityInput.fill('4'); 
        
        await page.getByRole('button', { name: 'Add to cart' }).click();
    });

    await test.step('Navigate to cart', async () => {
        // Wait for the modal to appear and click 'View Cart'
        const viewCartLink = page.getByRole('link', { name: 'View Cart' });
        await expect(viewCartLink).toBeVisible();
        await viewCartLink.click();
    });

    await test.step('Verify correct quantity in cart', async () => {
        // Verify the product name exists in the table
        await expect(page.getByRole('cell', { name: 'Green Side Placket Detail' })).toBeVisible();
        
        // Verify the quantity specifically within the quantity cell
        // Playwright's toHaveText is better than parseInt because it includes auto-retries
        const quantityCell = page.locator('td.cart_quantity button');
        await expect(quantityCell).toHaveText('4');
    });
});
});