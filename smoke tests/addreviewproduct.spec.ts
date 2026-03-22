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

test('User is able to add review to product', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    await test.step('Go to https://automationexercise.com/', async () => {
        homePage.navigate();
        await test.step('Verify that home page is visible successfully', async () => {
            homePage.title();
        });
    });

    await test.step('Click on \'Products\' button', async () => {
       await homePage.clickProducts();
    });

    await test.step('Verify that user is navigated to ALL PRODUCTS page successfully', async () => {
        await productsPage.verifyProductsPageVisible();
    });

    await test.step('Click on \'View Product\' of first product', async () => {
        await productsPage.viewFirstProduct();
    });

    await test.step('Verify that \'Write Your Review\' is visible', async () => {
        await productsPage.verifyWriteYourReviewVisible();
    });

    await test.step('Fill out name, email and review fields', async () => {
       await productsPage.fillReviewForm('Test User', 'testuser@example.com', 'I am adding a review for this product');
    });

    await test.step('Click on \'Submit\' button', async () => {
       await productsPage.submitReview();
    });

    await test.step('Verify success message \'Thank you for your review.\' is visible', async () => {
        await productsPage.verifyReviewSubmissionSuccess();
    });
});