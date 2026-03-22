import { test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
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

test('Verify that user is able to verify all products and views first product details page', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    await test.step('Go to https://automationexercise.com/', async () => {
        await homePage.navigate();
        await test.step('Verify that home page is visible successfully', async () => {
            await homePage.isHomePageUrl();
        });
    });
    await test.step('Click on \'Products\' button', async () => {
        await homePage.clickProducts();
        await test.step('Verify that user is navigated to ALL PRODUCTS page successfully', async () => {
            await productsPage.productsPageUrl();
            await test.step('Verify that \'ALL PRODUCTS\' is visible', async () => {
                await productsPage.verifyProductsPageVisible();
            });
        });
    });
    await test.step('Verify that products are visible', async () => {
        await productsPage.searchProductInitialCount();
    });
    await test.step('Click on \'View Product\' of first product', async () => {
        await productsPage.clickViewProductOfFirstProduct();
        await test.step('Verify that user is navigated to product detail page', async () => {
            await productsPage.verifyProductDetailPageUrl();
            await test.step('Verify that product detail is visible', async () => {
                await productsPage.verifyProductDetailPage();
                await productsPage.verifyProductDetailsBlueTop();
            });
        });
    });
});