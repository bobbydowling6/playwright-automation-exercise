import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { HomePage } from '../pages/HomePage';

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
  let homePage = new HomePage(page);
  let productsPage = new ProductsPage(page);
await test.step('Go to https://automationexercise.com/', async () => {
  await homePage.navigate();
  await test.step('Verify that home page is visible successfully', async () => {
  await homePage.title();
  });
});
await test.step('Click on \'Products\' button', async () => {    
  await homePage.clickProducts();
  await test.step('Verify user is navigated to ALL PRODUCTS page successfully', async () => {
  await productsPage.verifyProductsPageVisible();
  });
});
await test.step('Search for a product using the search input field', async () => {
  await productsPage.searchProduct('Polo');
  await productsPage.searchProductWithResults('Polo');
});
await test.step('Verify that all the products related to search are visible', async () => {
  await productsPage.searchProductsCount(1); // Assuming there is 1 product related to 'Polo'
});
await test.step('Search for another product using the search input field', async () => {
  await productsPage.searchProduct('Jeans');
  await productsPage.searchProductWithResults('Jeans');
});
await test.step('Verify that all the products related to search are visible', async () => {
  const searchedProducts = page.locator('.features_items .product-image-wrapper');
  await expect(searchedProducts).toHaveCount(3); // Assuming there are 3 products related to 'Jeans'
});
});

test('Search with empty query should return all products', async ({ page }) => {
  let productsPage = new ProductsPage(page);
    await productsPage.navigate();
    
    // Get the count of products BEFORE searching
    const initialCount = await productsPage.searchProductInitialCount();
    
    // Perform empty search
    await productsPage.emptySearch();
    
    // Assert: The URL changed to include the search parameter
    await productsPage.searchProductUrl();
    
    // Assert: We still see the same amount of products (the "Show All" behavior)
    await productsPage.searchProductFinalCount(initialCount);
});