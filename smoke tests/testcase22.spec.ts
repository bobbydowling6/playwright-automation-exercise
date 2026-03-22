import { test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
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

test('User is able to add product to cart from Recommended items', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    await test.step('Go to https://automationexercise.com/', async () => {
        await homePage.navigate();
        await test.step('Verify that home page is visible successfully', async () => {
            await homePage.isHomePageVisible();
        });
    });

    await test.step('Scroll down to bottom of page', async () => {
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    });

    await test.step('Verify that \'RECOMMENDED ITEMS\' are visible', async () => {
        await homePage.recommendedItemsVisible();
    });

    await test.step('Click on \'Add To Cart\' button on Recommended item', async () => {
       await homePage.addRecommendedItemToCart();
    });

    await test.step('Click on \'View Cart\' button in the modal', async () => {
        await homePage.viewCartInModal();
    });

    await test.step('Verify that user is navigated to cart page successfully', async () => {
        await cartPage.cartPageUrl();
    });

    await test.step('Verify that cart is not empty', async () => {
        await cartPage.verifyCartNotEmpty();
    });

    await test.step('Verify that the product is displayed in the cart', async () => {
        await cartPage.blueTopProductInCart();
    });
});