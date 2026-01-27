import {test, expect} from '@playwright/test';

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
    await test.step('Go to https://automationexercise.com/', async () => {
    await page.goto('http://automationexercise.com/');
    await test.step('Verify that home page is visible successfully', async () => {
      await expect(page).toHaveTitle('Automation Exercise');
    });
  });
  
  await test.step('Click on \'Signup / Login\' button', async () => {
    await page.getByRole('link', {name: ' Signup / Login'}).click();
    await test.step('Verify \'New User Signup!\' is visible', async () => {
      await expect(page.getByText('New User Signup!')).toBeVisible();
    });
    });
  
    await test.step('Enter name and existing email address', async () => {
    await page.getByRole('textbox', { name: 'Name' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('Btestuser');
    await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').click();
    await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill('btestuser@example.com');
    await test.step('Click \'Signup\' button', async () => {
      await page.getByRole('button', { name: 'Signup' }).click();
    });
  });
  
    await test.step('Verify that error \'Email Address already exist!\' is visible', async () => {
    console.log(await page.content()); // Print page HTML for diagnosis
    await expect(page.getByText('Email Address already exist!')).toBeVisible();    });   
});