import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../test-data/users';

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

test('User is able to login with correct credentials', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  
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

  await test.step('Enter correct email address and password, then click login button', async () => {
    await loginPage.login(users.standard.email, users.standard.password);
  });

  await test.step('Verify that \'Logged in as username\' is visible', async () => {
    await loginPage.verifyLoggedIn(users.standard.name);
    await homePage.title();
  });
});
