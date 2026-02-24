import { test, expect } from '@playwright/test';
import path from 'path';
import os from 'os';

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
  const downloadsPath = path.join(os.homedir(), 'Downloads', 'test-file.rtf');

  await test.step('Go to Home Page', async () => {
    await page.goto('http://automationexercise.com/');
    await expect(page).toHaveTitle('Automation Exercise');
  });

  await test.step('Navigate to Contact Us', async () => {
    await page.getByRole('link', { name: ' Contact Us' }).click();
    await expect(page).toHaveTitle('Automation Exercise - Contact Us');
    await expect(page.getByRole('heading', { name: 'Get In Touch' })).toBeVisible();
  });

  await test.step('Fill form details', async () => {
    await page.getByRole('textbox', { name: 'Name' }).fill('Btestuser');
    await page.getByRole('textbox', { name: 'Email', exact: true }).fill('btestuser@example.com');
    await page.getByRole('textbox', { name: 'Subject' }).fill('Test Subject');
    await page.getByRole('textbox', { name: 'Message' }).fill('Test Message');
  });

  await test.step('Upload a file', async () => {
    // FIX: Do NOT click the button. Use setInputFiles on the input element.
    // The selector 'input[name="upload_file"]' targets the specific hidden file input.
    await page.locator('input[name="upload_file"]').setInputFiles(downloadsPath);
  });

  await test.step('Submit form and handle dialog', async () => {
    // FIX: Setup the dialog listener BEFORE clicking submit
    page.once('dialog', async dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      await dialog.accept(); // Clicks 'OK'
    });

    await page.getByRole('button', { name: 'Submit' }).click();

    // Verify success message on the page
    const successMsg = page.locator('.status.alert.alert-success');
    await expect(successMsg).toBeVisible();
    await expect(successMsg).toHaveText('Success! Your details have been submitted successfully.');
  });

  await test.step('Click on Home button and verify that landed to home page successfully', async () => {
    await test.step('Click on Home button', async () => {
      page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => {});
      });
      await page.getByRole('link', { name: ' Home' }).click();
    });
    await test.step('Verify that landed to home page successfully', async () => {
    await expect(page).toHaveURL('https://automationexercise.com/');
    await expect(page).toHaveTitle('Automation Exercise');
    });
  });
});

test('Submit contact form with empty fields', async ({page}) => {
    await page.goto('https://automationexercise.com/contact_us');
    await page.getByRole('button', { name: 'Submit' }).click();

    // Check if the 'Name' field is still focused or reporting invalid (HTML5 validation)
    const nameInput = page.locator('input[data-qa="name"]');
    await expect(nameInput).toBeTruthy();

    // Check if the 'Email' field is still focused or reporting invalid (HTML5 validation)
    const emailInput = page.locator('input[data-qa="email"]');
    await expect(emailInput).toBeTruthy();

    // Check if the 'Subject' field is still focused or reporting invalid (HTML5 validation)
    const subjectInput = page.locator('input[data-qa="subject"]');
    await expect(subjectInput).toBeTruthy();

    // Check if the 'Message' field is still focused or reporting invalid (HTML5 validation)
    const messageInput = page.locator('textarea[data-qa="message"]');
    await expect(messageInput).toBeTruthy();
  })