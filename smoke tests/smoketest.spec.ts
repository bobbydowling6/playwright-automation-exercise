import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { LoginPage } from '../pages/LoginPage';
import { ContactUsPage } from '../pages/ContactUs';
import { CartPage } from '../pages/CartPage';

test.beforeEach(async ({ page }) => {
    // Improved Ad-Blocking: This site is aggressive with ads. 
    // We target more patterns to ensure a clean test environment.
    await page.route('**/*.{png,jpg,jpeg}', route => route.abort()); // Optional: block images for speed
    await page.route(/(googleads|doubleclick|adservice|analytics|googletagmanager)/, route => route.abort());
});

test.describe('Smoke Tests @smoke', () => {
  let homePage: HomePage;
  let productsPage: ProductsPage;
  let loginPage: LoginPage;
  let contactUsPage: ContactUsPage;
  let cartPage: CartPage;
  // Reuse the navigation logic to keep tests clean
  test('Homepage loads successfully', async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.title();
    await homePage.imageBannerVisible();
  });

  test('Products page loads', async ({ page }) => {
    homePage = new HomePage(page);
    productsPage = new ProductsPage(page);
    await homePage.navigate();
    await homePage.clickProducts();
    await productsPage.verifyProductsPageVisible();
  });

  test('Login page loads', async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    await homePage.navigate();
    await homePage.clickSignupLogin();
    await loginPage.loginFormVisible();
    await loginPage.signupFormVisible();
  });

  test('Cart page loads', async ({ page }) => {
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
    await homePage.navigate();
    await homePage.clickCart();
    await cartPage.cartPageUrl();
  });

  test('Contact Us page loads', async ({ page }) => {
    homePage = new HomePage(page);
    contactUsPage = new ContactUsPage(page);
    await homePage.navigate();
    await homePage.clickContactUs();
    await contactUsPage.navigate();
    await contactUsPage.contactUsFormVisible();
  });

  test('Navigation links are present and correct', async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();    
    await homePage.navLinksVisible();
  });
});