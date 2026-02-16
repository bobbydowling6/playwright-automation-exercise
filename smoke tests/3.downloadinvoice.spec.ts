import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.beforeEach(async ({ page }) => {
  await page.route('**/*google*/**', route => {
    const url = route.request().url();
    if (url.includes('googleads') || url.includes('doubleclick') || url.includes('adservice')) {
      return route.abort();
    }
    return route.continue();
  });
});

test('User can register while checkout, place order, and then download invoice successfully', async ({ page }) => {
    await test.step('Go to https://automationexercise.com/', async () => {
    await page.goto('http://automationexercise.com/');
    await test.step('Verify that home page is visible successfully', async () => {
      await expect(page).toHaveTitle('Automation Exercise');
    });
    });
    await test.step('Add products to cart', async () => {
    const products = page.locator('.single-products');
    await products.first().hover();
    await page.locator('.overlay-content').first().getByText('Add to cart').click();
    await expect(page.locator('#cartModal')).toContainText('Added!');
    await expect(page.locator('#cartModal')).toContainText('Your product has been added to cart.');
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await products.nth(1).hover();
    await page.locator('.overlay-content').nth(1).getByText('Add to cart').click();
    await expect(page.locator('#cartModal')).toContainText('Added!');
    await expect(page.locator('#cartModal')).toContainText('Your product has been added to cart.');
    await page.getByRole('link', { name: 'View Cart' }).click();
    await page.getByText('Home Shopping Cart Proceed To').click();
  });
    await test.step('Proceed to checkout', async () => {
    await page.getByText('Proceed To Checkout').click();
    await test.step('Popup appears with options to Register or Login', async () => {
    await expect(page.getByRole('heading', { name: 'Checkout' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Register / Login' })).toBeVisible();
    await page.getByRole('link', { name: 'Register / Login' }).click();
    });
  });
    await test.step('Verify that \'New User Signup!\' is visible', async () => {
    await expect(page.getByText('New User Signup!')).toBeVisible();
  });
await test.step('Enter name and email address', async () => {
  const signupEmail = `btestuser.${Date.now()}@example.com`;
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('Btestuser');
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').click();
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(signupEmail);
  await test.step('Click \'Signup\' button', async () => {
    await page.getByRole('button', { name: 'Signup' }).click();
    await page.waitForLoadState('networkidle');
  });
});

  await test.step('Verify that \'ENTER ACCOUNT INFORMATION\' is visible', async () => {
    await expect(page.getByText(/ENTER ACCOUNT INFORMATION/i)).toBeVisible({ timeout: 15000 });
  });

  await test.step('Fill details: Title, Name, Email, Password, Date of birth', async () => {
  await expect(page.getByText('Title')).toBeVisible();
  await page.getByRole('radio', { name: 'Mr.' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).fill('Test@1234');
  await expect(page.getByText('Date of Birth')).toBeVisible();
  await page.locator('#days').selectOption('1');
  await page.locator('#months').selectOption('January');
  await page.locator('#years').selectOption('1990');
  });

  await test.step('Select checkbox \'Sign up for our newsletter!\' and \'Receive special offers from our partners!\'', async () => {
  await page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).click();
  await page.waitForTimeout(500);
  await expect(page.getByLabel('Sign up for our newsletter!')).toBeChecked();
  await page.getByLabel('Sign up for our newsletter!').check();
  await test.step('Select checkbox \'Receive special offers from our partners!\'', async () => {
    await page.getByRole('checkbox', { name: 'Receive special offers from our partners!' }).click();
    await page.waitForTimeout(500);
    await expect(page.getByLabel('Receive special offers from our partners!')).toBeChecked();
    await page.getByLabel('Receive special offers from our partners!').check();
  });
})
  await test.step('Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number', async () => {
    await page.getByRole('paragraph').filter({ hasText: 'First name *' }).getByRole('superscript');
    await expect(page.getByText('First name *')).toBeVisible();
    await page.getByRole('textbox', { name: 'First name *' }).fill('Test');
    await page.getByRole('paragraph').filter({ hasText: 'Last name *' }).getByRole('superscript');
    await expect(page.getByText('Last name *')).toBeVisible();
    await page.getByRole('textbox', { name: 'Last name *' }).fill('User');
    await page.getByRole('textbox', { name: 'Company', exact: true }).fill('TestCompany');
    await page.getByRole('paragraph').filter({ hasText: 'Address *' }).getByRole('superscript');
    await expect(page.getByText('Address *')).toBeVisible();
    await page.getByRole('textbox', { name: 'Address *' }).fill('123 Test St');
    await expect(page.getByText('Address 2')).toBeVisible();
    await page.getByRole('textbox', { name: 'Address 2' }).fill('Suite 100');
    await page.getByRole('combobox', { name: 'Country *' }).click();
    await page.getByLabel('Country').selectOption('United States');
    await page.getByRole('textbox', { name: 'State *' }).getByRole('superscript');
    await expect(page.getByText('State *')).toBeVisible();
    await page.getByRole('textbox', { name: 'State *' }).fill('TestState');
    await page.getByRole('paragraph').filter({ hasText: 'City *' }).getByRole('superscript');
    await page.getByRole('textbox', { name: 'City * Zipcode *' }).click();
    await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('TestCity');
    await page.locator('#zipcode').filter({ hasText: 'Zipcode *' }).getByRole('superscript');
    await page.locator('#zipcode').click();
    await page.locator('#zipcode').fill('12345');
    await page.getByRole('paragraph').filter({ hasText: 'Mobile Number *' }).getByRole('superscript');
    await expect(page.getByText('Mobile Number *')).toBeVisible();
    await page.getByRole('textbox', { name: 'Mobile Number *' }).click();
    await page.getByRole('textbox', { name: 'Mobile Number *' }).fill('1234567890');
  });

  await test.step('Click \'Create Account\' button', async () => {
    await page.getByRole('button', { name: 'Create Account' }).click();
  });

  await test.step('Verify that \'ACCOUNT CREATED!\' is visible', async () => {
    await expect(page.getByText('Account Created!')).toBeVisible();
  });

  await test.step('Click \'Continue\' button', async () => {
    await page.getByRole('link', { name: 'Continue' }).click();
  });

  await test.step('Verify that \'Logged in as username\' is visible', async () => {
    await page.getByRole('listitem').filter({ hasText: 'Logged in as Btestuser' });
    await page.getByText('Logged in as Btestuser').click();
    await expect(page).toHaveTitle('Automation Exercise');
  });
  await test.step('Click the Cart button', async () => {
    await page.getByRole('link', { name: ' Cart' }).click();
  });
    await test.step('Proceed to checkout', async () => {
    await page.getByText('Proceed To Checkout').click();
    await expect(page.getByRole('heading', { name: 'Review Your Order' })).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole('heading', { name: 'Your delivery address' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Your billing address' })).toBeVisible();
    await expect(page.locator('#cart_items')).toContainText('Address Details');
    await page.locator('textarea[name="message"]').fill('I\'m ordering these products for testing purposes');
   });

    await test.step('Enter payment details: Name on Card, Card Number, CVC, Expiration date', async () => {
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
        await page.getByRole('textbox', { name: 'YYYY' }).fill('2029');
        await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
    });
    await test.step('Verify success message \'Your order has been placed successfully!\' is visible', async () => {
        await expect(page.getByText('Order Placed!')).toBeVisible();
        await expect(page.getByText('Congratulations! Your order')).toBeVisible();
    });
    await test.step('Download Invoice', async () => {
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('link', { name: 'Download Invoice' }).click()
    ]);
    expect(download.suggestedFilename()).toContain('invoice');

    const saveDir = path.join(process.cwd(), 'test-results', 'downloaded-invoices');
    fs.mkdirSync(saveDir, { recursive: true });
    const savePath = path.join(saveDir, download.suggestedFilename());
    await download.saveAs(savePath);

    expect(fs.existsSync(savePath), 'Downloaded invoice file should exist on disk').toBe(true);
    const stats = fs.statSync(savePath);
    expect(stats.size, 'Downloaded invoice file should not be empty').toBeGreaterThan(0);
  });
    await test.step('Click on \'Delete Account\' button', async () => {
    await page.getByRole('link', { name: ' Delete Account' }).click();
  });

  await test.step('Verify that \'ACCOUNT DELETED!\' is visible and click \'Continue\' button', async () => {
  await expect(page.getByText('Account Deleted!')).toBeVisible();
  await page.getByRole('link', { name: 'Continue' }).click();
  await expect(page).toHaveTitle('Automation Exercise');
    });
});
