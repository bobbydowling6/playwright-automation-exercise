import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
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

test('Verify that user is able to add products to cart with different quantities', async ({ page }) => {    
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    await test.step('Navigate to home page', async () => {
        await test.step('Go to https://automationexercise.com/', async () => {
        await homePage.navigate();
        await test.step('Verify that home page is visible successfully', async () => {
        await homePage.title();
  });
    });

    await test.step('View a specific product on the home page', async () => {   
        await homePage.clickGreenSidePlacketDetail(); 
    });

    await test.step('Verify product details page is visible', async () => {
        await productsPage.verifyGreenSidePlacketDetailPage();
    });

    await test.step('Add product to cart with quantity 4', async () => {   
        await productsPage.addGreenSidePlacketToCartWithQuantity();
    });

    await test.step('Navigate to cart', async () => {
        // Wait for the modal to appear and click 'View Cart'
        await cartPage.navigateToCartFromProducts();
    });

    await test.step('Verify correct quantity in cart', async () => {
        // Verify the product name exists in the table
        await cartPage.verifyGreenSidePlacketInCart();        
        // Verify the quantity specifically within the quantity cell
        // Playwright's toHaveText is better than parseInt because it includes auto-retries
        await cartPage.verifyQuantityInCart('4');
    });
});
});