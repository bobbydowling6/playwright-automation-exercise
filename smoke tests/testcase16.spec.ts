import { test, expect } from '@playwright/test';

// Smoke test for review order page

test('Review Your Order page should be visible', async ({ page }) => {
    await page.goto('https://example.com/review-order');
    await expect(page.locator('text=Review Your Order')).toBeVisible({ timeout: 10000 }); // Increased timeout
});

test('Delivery address should be visible', async ({ page }) => {
    await page.goto('https://example.com/delivery-address');
    await expect(page.locator('text=Your delivery address')).toBeVisible({ timeout: 10000 }); // Increased timeout
});