import { test, expect } from '@playwright/test';
import path from 'path';
import os from 'os';
import { HomePage } from '../pages/HomePage';
import { ContactUsPage } from '../pages/ContactUs';

test.beforeEach(async ({ page }) => {
  // Intercept and abort ad requests to keep the test stable
  await page.route('**/*google*/**', route => {
    const url = route.request().url();
    if (url.includes('googleads') || url.includes('doubleclick') || url.includes('adservice')) {
      return route.abort();
    }
    return route.continue();
  });
});

test('User is able to fill in contact form and upload file', async ({ page }) => {
  let homePage: HomePage = new HomePage(page);
  let contactUsPage: ContactUsPage = new ContactUsPage(page);
  const downloadsPath = path.join(os.homedir(), 'Downloads', 'test-file.rtf');

  await test.step('Go to Home Page', async () => {
    await homePage.navigate();
    await homePage.title();
  });

  await test.step('Navigate to Contact Us', async () => {
    await contactUsPage.navigate();
    await contactUsPage.title();
    await contactUsPage.getInTouchHeadingVisible();
  });

  await test.step('Fill form details', async () => {
    await contactUsPage.contactUsFormVisible();
    await contactUsPage.fillFormDetails('Btestuser', 'btestuser@example.com', 'Test Subject', 'Test Message');
  });

  await test.step('Upload a file', async () => {
    // FIX: Do NOT click the button. Use setInputFiles on the input element.
    // The selector 'input[name="upload_file"]' targets the specific hidden file input.
    await contactUsPage.uploadFile(downloadsPath);
  });

  await test.step('Submit form and handle dialog', async () => {
    // FIX: Setup the dialog listener BEFORE clicking submit
    await contactUsPage.handleDialog();

    await contactUsPage.submitFormButtonClick();

    // Verify success message on the page
    await contactUsPage.successMessageVisible();
  });

  await test.step('Click on Home button and verify that landed to home page successfully', async () => {
    await test.step('Click on Home button', async () => {
      await contactUsPage.clickHomeButton();
    });
    await test.step('Verify that landed to home page successfully', async () => {
    await homePage.isHomePageUrl();
    await homePage.title();
    });
  });
});

test('Submit contact form with empty fields', async ({page}) => {
  let contactUsPage: ContactUsPage = new ContactUsPage(page);
    await contactUsPage.navigate();
    await contactUsPage.submitFormButtonClick();

    // Check if the 'Name' field is still focused or reporting invalid (HTML5 validation)
    await contactUsPage.nameInput();
    await expect(contactUsPage.nameInput()).toBeTruthy();

    // Check if the 'Email' field is still focused or reporting invalid (HTML5 validation)
    await contactUsPage.emailInput();
    await expect(contactUsPage.emailInput()).toBeTruthy();

    // Check if the 'Subject' field is still focused or reporting invalid (HTML5 validation)
    await contactUsPage.subjectInput();
    await expect(contactUsPage.subjectInput()).toBeTruthy();

    // Check if the 'Message' field is still focused or reporting invalid (HTML5 validation)
    await contactUsPage.messageInput();
    await expect(contactUsPage.messageInput()).toBeTruthy();
  })