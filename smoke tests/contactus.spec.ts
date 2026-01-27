import { test, expect } from '@playwright/test';

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

test('User is able to fill in contact form', async ({ page }) => {
  await test.step('Go to https://automationexercise.com/', async () => {
    await page.goto('http://automationexercise.com/');
    await test.step('Verify that home page is visible successfully', async () => {
    await expect(page).toHaveTitle('Automation Exercise');
  });
  });
  await test.step('Click on the Contact Us button', async () => {
    await page.getByRole('link', { name: ' Contact Us' }).click();
    await test.step('Verify that user is landed to contact us page successfully', async () => {
    await expect(page).toHaveTitle('Automation Exercise - Contact Us');
    await test.step('Verify that "Contact Us" is visible', async () => {
      await expect(page.getByRole('heading', { name: 'Contact Us' })).toBeVisible();
      await test.step('Verify that "GET IN TOUCH" is visible', async () => {
      await expect(page.getByText('Get In Touch')).toBeVisible();
    });
    });
  });
  
  });
  await test.step('Fill all details in contact us form and submit', async () => {
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('Btestuser');
  await page.getByRole('textbox', { name: 'Email', exact: true }).click();
  await page.getByRole('textbox', { name: 'Email', exact: true }).fill('btestuser@example.com');
  await page.getByRole('textbox', { name: 'Subject' }).fill('Test Subject');
  await page.getByRole('textbox', { name: 'Message' }).fill('Test Message');
  await page.getByRole('button', { name: 'Submit' }).click();
  await test.step('Verify success message "Success! Your details have been submitted successfully." is visible', async () => {
    // (Handled in dialog event above)
    await page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Success! Your details have been submitted successfully.');
      await dialog.accept();
    });
  });

  await test.step('Click on Home button and verify that landed to home page successfully', async () => {
    await page.getByRole('link', { name: ' Home' }).click();
    await expect(page).toHaveTitle('Automation Exercise');
  });
});
});