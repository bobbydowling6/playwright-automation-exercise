import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { ProductsPage } from '../pages/ProductsPage';

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
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const productsPage = new ProductsPage(page);
    await test.step('Go to https://automationexercise.com/', async () => {
    await homePage.navigate();
    await test.step('Verify that home page is visible successfully', async () => {
      await homePage.isHomePageUrl();
    });
    });
    await test.step('Navigate to Products', async () => {
        await homePage.clickProducts();
        await test.step('Verify that user is navigated to ALL PRODUCTS page successfully', async () => {
            await productsPage.productsPageUrl();
            await test.step('Verify that \'ALL PRODUCTS\' is visible', async () => {
                await productsPage.verifyProductsPageVisible();
            });
        });
    });

    await test.step('Add products to cart', async () => {
        await productsPage.addProductToCart();
    });

    await test.step('Verify cart items', async () => {
        await cartPage.verifyCartItems();
    });
});
