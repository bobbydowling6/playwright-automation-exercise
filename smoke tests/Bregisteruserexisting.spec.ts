import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage'; 
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

test('User is not able to register new user with existing email', async ({page}) => {
    const homePage = new HomePage(page);
    const registrationPage = new RegistrationPage(page);
    
    await test.step('Go to https://automationexercise.com/', async () => {
    await homePage.navigate();
    await test.step('Verify that home page is visible successfully', async () => {
      await homePage.title();
    });
  });
  
  await test.step('Click on \'Signup / Login\' button', async () => {
    await homePage.clickSignupLogin();
    await test.step('Verify \'New User Signup!\' is visible', async () => {
      await registrationPage.newUserSignupVisible();
    });
    });
  
    await test.step('Enter name and existing email address', async () => {
    await registrationPage.enterNameAndEmail(users.standard.name, users.standard.email);  
    await registrationPage.clickSignupButton();
    });
  
    await test.step('Verify that error \'Email Address already exist!\' is visible', async () => {
    await registrationPage.verifyEmailAlreadyExists();
  });  
});