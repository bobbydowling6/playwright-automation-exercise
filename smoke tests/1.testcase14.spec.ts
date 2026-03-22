import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from '../pages/PaymentPage';
import { users } from '../test-data/users';
import { paymentCards } from '../test-data/payment';
import { checkoutData } from '../test-data/checkout';

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

test('User can register while checkout and then place order successfully', async ({ page }) => {
  const homePage = new HomePage(page)
  const productsPage = new ProductsPage(page)
  const cartPage = new CartPage(page)
  const registrationPage = new RegistrationPage(page)
  const loginPage = new LoginPage(page)
  const checkoutPage = new CheckoutPage(page)
  const paymentPage = new PaymentPage(page)
    await test.step('Go to https://automationexercise.com/', async () => {
    await homePage.navigate();
    await test.step('Verify that home page is visible successfully', async () => {
      await homePage.title();
    });
    });
    await test.step('Add products to cart', async () => {
    await productsPage.addProductToCart();
    await homePage.homeShoppingCartProceed();
  });
    await test.step('Proceed to checkout, then popup modal appears with options to Register or Login', async () => {
    await homePage.popupModal();
    
  });    
    await test.step('Verify that \'New User Signup!\' is visible', async () => {
    await registrationPage.newUserSignupVisible();
  });
await test.step('Enter name and email address', async () => {
  await registrationPage.enterNameAndEmail(users.standard.name, users.standard.email);
  await test.step('Click \'Signup\' button', async () => {
    await registrationPage.clickSignupButton();
  });
});

  await test.step('Verify that \'ENTER ACCOUNT INFORMATION\' is visible', async () => {
    await registrationPage.verifyEnterAccountInformationVisible();
  });

  await test.step('Fill details: Title, Name, Email, Password, Date of birth', async () => {
    await registrationPage.fillAccountInformation(users.standard);
  });

  await test.step('Select checkbox \'Sign up for our newsletter!\' and \'Receive special offers from our partners!\'', async () => {
    await registrationPage.selectNewsletter();
    await registrationPage.selectSpecialOffers();
})
  await test.step('Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number', async () => {
    await registrationPage.fillAddressInformation(users.standard);
  });

  await test.step('Click \'Create Account\' button', async () => {
    await registrationPage.submitRegistration();
  });

  await test.step('Verify that \'ACCOUNT CREATED!\' is visible', async () => {
    await registrationPage.verifyAccountCreated();
  });

  await test.step('Click \'Continue\' button', async () => {
    await registrationPage.continueAfterRegistration();
  });

  await test.step('Verify that \'Logged in as username\' is visible', async () => {
    await loginPage.verifyLoggedIn(users.standard.name) // Click to ensure focus
    await homePage.title();
    await homePage.isHomePageUrl();
  });
  await test.step('Click the Cart button', async () => {
    await homePage.clickCart();
  });
    await test.step('Proceed to checkout', async () => {
    await cartPage.proceedToCheckout();
    await checkoutPage.reviewYourOrderTitle();
    await checkoutPage.yourDeliveryAddressTitle();
    await checkoutPage.yourDeliveryAddressTitle();
    await checkoutPage.addressDetailsTitle();
    await checkoutData.giftOrder;
   });
    
    await test.step('Enter payment details: Name on Card, Card Number, CVC, Expiration date', async () => {
      await checkoutPage.placeOrderButton();
      await paymentPage.paymentTitle();
      await paymentPage.fillPaymentDetails(paymentCards.validCard);
      await paymentPage.submitPayment();
    });
    await test.step('Verify success message \'Your order has been placed successfully!\' is visible', async () => {
      await paymentPage.verifyOrderPlaced();
    });
    await test.step('Click on \'Delete Account\' button', async () => {
    await homePage.deleteAccountButton();
  });
  //await page.waitForLoadState('networkidle');
  //await page.waitForTimeout(4000); // Wait for 4 seconds to ensure the next page loads

  await test.step('Verify that \'ACCOUNT DELETED!\' is visible and click \'Continue\' button', async () => {
  await homePage.accountDeleted();
  await homePage.isHomePageUrl();
  await homePage.title();
    });
}); 