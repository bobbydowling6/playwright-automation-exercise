import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

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
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    await test.step('Go to Home Page', async () => {
        await homePage.navigate();
        await homePage.title();
    });

    await test.step('Navigate to Products', async () => {
        // Use regex for the link name to avoid icon character issues
        await homePage.clickProducts();
        await productsPage.productsPageUrl();
        await productsPage.verifyProductsPageVisible();
    });

    await test.step('Add products to cart', async () => {
        await productsPage.addProductToCart();
    });

    await test.step('Remove products from cart', async () => {
        await cartPage.verifyCartItemsBeforeRemoval();
        await cartPage.removeItemsFromCart();
    });

    await test.step('Verify cart is empty', async () => {
        await cartPage.verifyCartEmptyAfterRemoval();
    });
});