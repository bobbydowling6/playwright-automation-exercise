import { test, expect } from '@playwright/test';

// Define the base URL once to make maintenance easier
const BASE_URL = 'https://automationexercise.com';

test.beforeEach(async ({ page }) => {
    // Improved Ad-Blocking: This site is aggressive with ads. 
    // We target more patterns to ensure a clean test environment.
    await page.route('**/*.{png,jpg,jpeg}', route => route.abort()); // Optional: block images for speed
    await page.route(/(googleads|doubleclick|adservice|analytics|googletagmanager)/, route => route.abort());
});

test.describe('Smoke Tests @smoke', () => {
  
  // Reuse the navigation logic to keep tests clean
  test('Homepage loads successfully', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveURL(BASE_URL);
    await expect(page.locator('#slider')).toBeVisible();
  });

  test('Products page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/products`);
    await expect(page.locator('.features_items')).toBeVisible();
  });

  test('Login page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await expect(page.locator('.login-form')).toBeVisible();
    await expect(page.locator('.signup-form')).toBeVisible();
  });

  test('Cart page loads', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/view_cart`);
    expect(response?.status()).toBe(200);
  });

  test('Contact Us page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact_us`);
    await expect(page.locator('#contact-us-form')).toBeVisible();
  });

  test('Navigation links are present and correct', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const navLinks = [
      { text: ' Home', href: '/' }, // Note: some sites have leading spaces in text
      { text: 'Products', href: '/products' },
      { text: 'Cart', href: '/view_cart' },
      { text: 'Signup / Login', href: '/login' },
      { text: 'Contact us', href: '/contact_us' },
    ];

    for (const link of navLinks) {
      const locator = page.locator(`.nav >> a[href="${link.href}"]`);
      await expect(locator).toBeVisible();
      // Better check: verify the text matches what we expect
      await expect(locator).toContainText(link.text);
    }
  });
});