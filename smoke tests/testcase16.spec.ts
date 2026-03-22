import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from '../pages/PaymentPage';
import { users } from '../test-data/users';
import { checkoutData } from '../test-data/checkout';
import { paymentCards } from '../test-data/payment';

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

test('User can login before checkout and place order successfully', async ({ page }) => {
  const homePage = new HomePage(page)
  const loginPage = new LoginPage(page)
  const productsPage = new ProductsPage(page)
  const checkoutPage = new CheckoutPage(page)
  const cartPage = new CartPage(page)
  const paymentPage = new PaymentPage(page)
    await test.step('Go to https://automationexercise.com/', async () => {
    await homePage.navigate();
    await test.step('Verify that home page is visible successfully', async () => {
      await homePage.title();
    });
    });
    await test.step('Click on \'Signup / Login\' button', async () => {
    await homePage.clickSignupLogin();
  });

  await test.step('Verify Login to your account page is visible', async () => {
    await loginPage.verifyLoginToYourAccountVisible();
  });

  await test.step('Enter correct email address and password, and then click the login button', async () => {
    await loginPage.login(users.standard.email, users.standard.password);
  });

  await test.step('Verify that \'Logged in as username\' is visible', async () => {
    await homePage.verifyLoggedInAs(users.standard.name);
    await homePage.title();
  });

  await test.step('Add products to cart', async () => {
    await productsPage.addProductToCart();
  });

   await test.step('Proceed to checkout', async () => {
    await cartPage.proceedToCheckout()
    await checkoutPage.reviewYourOrderTitle();
    await checkoutPage.yourDeliveryAddressTitle();
    await checkoutPage.yourBillingAddressTitle();
    await checkoutPage.addressDetailsTitle();
    checkoutData.noComment;
   });
    await test.step('Fill details: Name on Card, Card Number, CVC, Expiration month and year and then place order', async () => {
    await checkoutPage.placeOrderButton();
    await paymentPage.paymentTitle();
    await paymentPage.fillPaymentDetails(paymentCards.validCard);
    await paymentPage.submitPayment();
    
    });
    await test.step('Verify success message \'Your order has been placed successfully!\' is visible', async () => {
    await paymentPage.verifyOrderPlaced();
    });
    await test.step('Click on \'Continue\' button and verify that landed to home page successfully', async () => {
    await paymentPage.continueButton()
    await homePage.title();
    await homePage.isHomePageUrl();
    });
    
});
