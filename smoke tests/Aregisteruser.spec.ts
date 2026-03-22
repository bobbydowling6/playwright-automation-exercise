import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage'; 
import { LoginPage } from '../pages/LoginPage';
import { users } from '../test-data/users';

test.beforeEach(async ({ page }) => {
  // Block ads/trackers to speed up execution
  await page.route('**/*google*/**', route => {
    const url = route.request().url();
    if (url.includes('googleads') || url.includes('doubleclick') || url.includes('adservice')) {
      return route.abort();
    }
    return route.continue();
  });
});

test('User is able to register as a new user', async ({ page }) => {
  const homePage = new HomePage(page);
  const registrationPage = new RegistrationPage(page);
  const loginPage = new LoginPage(page);

  await test.step('Navigate to home page and verify visibility', async () => {
    await homePage.navigate();
    await homePage.title(); // Assuming this method performs an assertion
  });

  await test.step('Navigate to Signup/Login page', async () => {
    await homePage.clickSignupLogin();
    await registrationPage.newUserSignupVisible();
  });

  await test.step('Enter initial name and email', async () => {
    await registrationPage.enterNameAndEmail(users.standard.name, users.standard.email);  
    await registrationPage.clickSignupButton();
  });

  await test.step('Verify "ENTER ACCOUNT INFORMATION" visibility', async () => {
    await registrationPage.verifyEnterAccountInformationVisible();
  });

  await test.step('Fill account information details', async () => {
    // This single call should handle all the internal fills/clicks
    await registrationPage.fillAccountInformation(users.standard);
  });

  await test.step('Select newsletter and special offers checkboxes', async () => {
    await registrationPage.selectNewsletter();
    await registrationPage.selectSpecialOffers();
  });

  await test.step('Fill address information details', async () => {
    await registrationPage.fillAddressInformation(users.standard);
  });

  await test.step('Click "Create Account" and verify success', async () => {
    await registrationPage.submitRegistration();
    await registrationPage.verifyAccountCreated();
  });

  await test.step('Continue to home and verify logged-in status', async () => {
    await registrationPage.continueAfterRegistration();
    await loginPage.verifyLoggedIn(users.standard.name);
  });
});