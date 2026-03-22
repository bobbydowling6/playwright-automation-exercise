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

test('Verify that user is able to view brand products', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    await test.step('Go to https://automationexercise.com/', async () => {
        await homePage.navigate();
        await test.step('Verify that home page is visible successfully', async () => {
            await homePage.isHomePageVisible();
        });
    });

    await test.step('click on Products button', async () => {
        await homePage.clickProducts();
        await test.step('Verify user is navigated to ALL PRODUCTS page successfully', async () => {
            await productsPage.verifyProductsPageVisible();
        });
    });

    await test.step('Click on any brand name link under Brands section', async () => {
        await productsPage.poloBrandProduct();
        await test.step('Verify that user is navigated to brand products page', async () => {
            await productsPage.poloBrandProductsVisible();
        });
    });

    await test.step('On the left side bar, click on another brand link', async () => {
        await productsPage.madameBrandProduct();
        await test.step('Verify that user is navigated to that brand products page', async () => {
            await productsPage.madameBrandProductsVisible();
        });
    });
});