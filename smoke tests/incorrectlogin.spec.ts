import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

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

test('User is not able to login with incorrect credentials', async ({ page }) => {
  const homePage = new HomePage(page)
  const loginPage = new LoginPage(page)
  await test.step('Go to https://automationexercise.com/', async () => {
    await homePage.navigate()
    await test.step('Verify that home page is visible successfully', async () => {
      homePage.title();
    });
  });

  await test.step('Click on \'Signup / Login\' button', async () => {
    await homePage.clickSignupLogin();
  });

  await test.step('Verify Login to your account page is visible', async () => {
    await loginPage.verifyLoginToYourAccountVisible();
  });

  await test.step('Enter incorrect email address and password', async () => {
    await loginPage.incorrectLogin();
  });

  await test.step('Click on \'Login\' button', async () => {
    await loginPage.clickLoginButton();
  });

  await test.step('Verify that error message is visible', async () => {
    await loginPage.loginErrorMessage();
  });
});