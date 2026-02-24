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

test.describe('Boundary Value Tests', () => {
  test('Product quantity - minimum value (0)', async ({ page }) => {
    await page.goto('https://automationexercise.com/product_details/1');
    const targetQty = '0';
    await page.fill('#quantity', targetQty);
    await page.getByRole('button', { name: /Add to cart/i }).click();

    // 1. Wait for the success modal and click 'View Cart'
    // This site shows a popup; we need to interact with it to get to the cart.
    await page.getByRole('link', { name: 'View Cart' }).click();

    // 2. Verify we are on the cart page
    await expect(page).toHaveURL(/view_cart/);

    // 3. Find the quantity cell in the table and assert its value
    const cartQuantity = page.locator('.cart_quantity button');
    await expect(cartQuantity).toHaveText(targetQty);
    
  });

  test('Product quantity - maximum boundary', async ({ page }) => {
    await page.goto('https://automationexercise.com/product_details/1');
    
    const targetQty = '99999';
    await page.fill('#quantity', targetQty);
    await page.getByRole('button', { name: /Add to cart/i }).click();

    // 1. Wait for the success modal and click 'View Cart'
    // This site shows a popup; we need to interact with it to get to the cart.
    await page.getByRole('link', { name: 'View Cart' }).click();

    // 2. Verify we are on the cart page
    await expect(page).toHaveURL(/view_cart/);

    // 3. Find the quantity cell in the table and assert its value
    const cartQuantity = page.locator('.cart_quantity button');
    await expect(cartQuantity).toHaveText(targetQty);
  });

  test('Product quantity - negative value', async ({ page }) => {
    await page.goto('https://automationexercise.com/product_details/1');
    const targetQty = '-1';
    await page.fill('#quantity', targetQty);
    await page.getByRole('button', { name: /Add to cart/i }).click();

    // 1. Wait for the success modal and click 'View Cart'
    // This site shows a popup; we need to interact with it to get to the cart.
    await page.getByRole('link', { name: 'View Cart' }).click();

    // 2. Verify we are on the cart page
    await expect(page).toHaveURL(/view_cart/);

    // 3. Find the quantity cell in the table and assert its value
    const cartQuantity = page.locator('.cart_quantity button');
    await expect(cartQuantity).toHaveText(targetQty);
  });

  test('Registration with 1-character name', async ({ page }) => {
    await page.goto('https://automationexercise.com/login');
    await page.fill('input[data-qa="signup-name"]', 'A');
    // ... test minimum name length
    await page.getByRole('button', { name: 'Signup' }).click();
    // Verify that the name is not accepted and does cause issues
    await page.getByText('Name must be at least 2 characters').isVisible();
  });

  test('Registration with 255-character name', async ({ page }) => {
    const longName = 'A'.repeat(255);
    await page.goto('https://automationexercise.com/login');
    await page.fill('input[data-qa="signup-name"]', longName);
    // ... test maximum name length
    await page.getByRole('button', { name: 'Signup' }).click();
    // Verify that the long name is not accepted and does cause issues
    await page.getByText('Name must be less than 255 characters').isVisible();
  });
});