import { test, expect } from '@playwright/test';

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
    await test.step('Go to https://automationexercise.com/', async () => {
    await page.goto('http://automationexercise.com/');
    await test.step('Verify that home page is visible successfully', async () => {
      await expect(page).toHaveTitle('Automation Exercise');
    });
    });
    await test.step('Click on \'Signup / Login\' button', async () => {
    await page.getByRole('link', { name: ' Signup / Login' }).click();
  });

  await test.step('Verify Login to your account page is visible', async () => {
    await expect(page.getByText('Login to your account')).toBeVisible();
  });

  await test.step('Enter correct email address and password', async () => {
    await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').click();
    await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('btestuser@example.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('Test@1234');
  });

  await test.step('Click on \'Login\' button', async () => {
    await page.getByRole('button', { name: 'Login' }).click();
  });

  await test.step('Verify that \'Logged in as username\' is visible', async () => {
    await page.getByRole('listitem').filter({ hasText: 'Logged in as Btestuser' });
    await page.getByText('Logged in as Btestuser').click();
    await expect(page).toHaveTitle('Automation Exercise');
  });

  await test.step('Add products to cart', async () => {
    const products = page.locator('.single-products');

    // Add First Product
    await products.first().hover();
    await page.locator('.overlay-content').first().getByText('Add to cart').click();
    await expect(page.locator('#cartModal')).toContainText('Added!');
    await expect(page.locator('#cartModal')).toContainText('Your product has been added to cart.');
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    // Add Second Product
    await products.nth(1).hover();
    await page.locator('.overlay-content').nth(1).getByText('Add to cart').click();
    await expect(page.locator('#cartModal')).toContainText('Added!');
    await expect(page.locator('#cartModal')).toContainText('Your product has been added to cart.');
    await page.getByRole('link', { name: 'View Cart' }).click();
    await page.getByText('Home Shopping Cart Proceed To').click();
  });

   await test.step('Proceed to checkout', async () => {
    await page.getByText('Proceed To Checkout').click();
    await expect(page.getByRole('heading', { name: 'Review Your Order' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Your delivery address' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Your billing address' })).toBeVisible();
    await expect(page.locator('#cart_items')).toContainText('Address Details');
    await page.locator('textarea[name="message"]').fill('I\'m ordering these products for testing purposes');
   });
    await test.step('Fill details: Name on Card, Card Number, CVC, Expiration month and year and then place order', async () => {
    await page.getByRole('link', { name: 'Place Order' }).click();
    await expect(page.getByRole('heading', { name: 'Payment' })).toBeVisible();
    await expect(page.getByText('Name on Card')).toBeVisible();
    await page.locator('input[name="name_on_card"]').fill('Btestuser');
    await expect(page.getByText('Card Number')).toBeVisible();
    await page.locator('input[name="card_number"]').fill('4111111111111111');
    await expect(page.getByText('CVC')).toBeVisible();
    await page.locator('input[name="cvc"]').fill('123');
    await expect(page.getByText('Expiration')).toBeVisible();
    await page.getByRole('textbox', { name: 'MM' }).fill('12');
    await page.getByRole('textbox', { name: 'YYYY' }).fill('2025');
    await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
    
    });
    await test.step('Verify success message \'Your order has been placed successfully!\' is visible', async () => {
    await expect(page.getByText('Order Placed!')).toBeVisible();
    await expect(page.getByText('Congratulations! Your order')).toBeVisible();
    });
    await test.step('Click on \'Continue\' button and verify that landed to home page successfully', async () => {
    await page.getByRole('link', { name: 'Continue' }).click();
    await expect(page).toHaveTitle('Automation Exercise');
    });
    
});
