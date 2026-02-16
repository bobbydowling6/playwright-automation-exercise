// Improved example of wait and timeout handling in the test
import { test, expect } from '@playwright/test';

test('User Registration', async ({ page }) => {
    // Navigate to the registration page
    await page.goto('https://example.com/register');

    // Improved wait for selector with timeout
    const registerButton = await page.waitForSelector('#register-button', { timeout: 5000 });
    await expect(registerButton).toBeVisible();

    // Fill in registration details
    await page.fill('#username', 'testuser');
    await page.fill('#password', 'testpassword');

    // Click on register button
    await registerButton.click();

    // Wait for navigation after registration
    await page.waitForNavigation({ timeout: 10000 });
    const successMessage = await page.waitForSelector('.success-message', { timeout: 5000 });
    await expect(successMessage).toContainText('Registration successful!');
});
