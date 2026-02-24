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

test('Verify that search functionality works correctly', async ({ page }) => {
await test.step('Go to https://automationexercise.com/', async () => {
  await page.goto('https://automationexercise.com/');
  await test.step('Verify that home page is visible successfully', async () => {
  await expect(page).toHaveTitle('Automation Exercise');
  });
});
await test.step('Click on \'Products\' button', async () => {    
  await page.getByRole('link', { name: ' Products' }).click();
  await page.getByRole('heading', { name: 'All Products' }).isVisible();
});
await test.step('Search for a product using the search input field', async () => {
  await page.getByRole('textbox', { name: 'Search Product' }).click();
  await page.getByRole('textbox', { name: 'Search Product' }).fill('Polo');
  await page.locator('#submit_search').click();
  await page.getByRole('heading', { name: 'Searched Products' }).isVisible();
});
await test.step('Verify that all the products related to search are visible', async () => {
  const searchedProducts = page.locator('.features_items .product-image-wrapper');
  await expect(searchedProducts).toHaveCount(1); // Assuming there are 1 products related to 'Polo'
});
await test.step('Search for another product using the search input field', async () => {
  await page.getByRole('textbox', { name: 'Search Product' }).click();
  await page.getByRole('textbox', { name: 'Search Product' }).fill('Jeans');
  await page.locator('#submit_search').click();
  await page.getByRole('heading', { name: 'Searched Products' }).isVisible();
});
await test.step('Verify that all the products related to search are visible', async () => {
  const searchedProducts = page.locator('.features_items .product-image-wrapper');
  await expect(searchedProducts).toHaveCount(3); // Assuming there are 3 products related to 'Jeans'
});
});

test('Search with empty query should return all products', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');
    
    // Get the count of products BEFORE searching
    const initialCount = await page.locator('.features_items .product-image-wrapper').count();
    
    // Perform empty search
    await page.click('#submit_search');
    
    // Assert: The URL changed to include the search parameter
    await expect(page).toHaveURL(/search/);
    
    // Assert: We still see the same amount of products (the "Show All" behavior)
    const finalCount = page.locator('.features_items .product-image-wrapper');
    await expect(finalCount).toHaveCount(initialCount);
});