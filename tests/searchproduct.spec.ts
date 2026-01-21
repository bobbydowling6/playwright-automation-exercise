import { test, expect } from '@playwright/test';

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
