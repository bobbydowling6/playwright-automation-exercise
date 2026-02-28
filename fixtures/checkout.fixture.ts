import { test as base, Page } from '@playwright/test';
import { test as authTest } from './auth.fixture';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from '../pages/PaymentPage';
import { paymentCards, PaymentCard } from '../test-data/payment';
import { checkoutData, CheckoutData } from '../test-data/checkout';

type CheckoutFixtures = {
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  paymentPage: PaymentPage;
  cartWithItems: Page; // Page with items already in cart
  checkoutReady: Page; // Page at checkout screen
  defaultPaymentCard: PaymentCard;
  defaultCheckoutData: CheckoutData;
};

export const test = authTest.extend<CheckoutFixtures>({
  // Page objects
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  paymentPage: async ({ page }, use) => {
    await use(new PaymentPage(page));
  },

  // Default payment card
  defaultPaymentCard: async ({}, use) => {
    await use(paymentCards.validCard);
  },

  // Default checkout data
  defaultCheckoutData: async ({}, use) => {
    await use(checkoutData.standard);
  },

  // Cart with items already added
  cartWithItems: async ({ authenticatedPage }, use) => {
    const productsPage = new ProductsPage(authenticatedPage);
    await productsPage.navigate();
    await productsPage.addMultipleProductsToCart(2);
    await use(authenticatedPage);
  },

  // Ready at checkout page
  checkoutReady: async ({ cartWithItems }, use) => {
    const cartPage = new CartPage(cartWithItems);
    await cartPage.navigate();
    await cartPage.proceedToCheckout();
    await use(cartWithItems);
  },
});

export { expect } from '@playwright/test';