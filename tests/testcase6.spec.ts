import { test, expect } from '@playwright/test';

test('User is able to register as a new user', async ({ page }) => {
  // Go to https://automationexercise.com/
  await page.goto('http://automationexercise.com/');
  //Verify that home page is visible successfully
  await expect(page).toHaveTitle('Automation Exercise');
  //Click on the Contact Us button  
  await page.getByRole('link', { name: ' Contact Us' }).click();
  // Verify 'GET IN TOUCH' is visible
  await expect(page.getByText('Get In Touch')).toBeVisible();
  // Fill all details in contact us form and submit
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('Btestuser');
  await page.getByRole('textbox', { name: 'Email', exact: true }).click();
  await page.getByRole('textbox', { name: 'Email', exact: true }).fill('btestuser@example.com');
  await page.getByRole('textbox', { name: 'Subject' }).fill('Test Subject');
  await page.getByRole('textbox', { name: 'Message' }).fill('Test Message');
  await page.getByRole('button', { name: 'Submit' }).click();
  // Click OK button on alert
  page.on('dialog', async dialog => {
    expect(dialog.message()).toContain('Success! Your details have been submitted successfully.');
    await dialog.accept();
  });
  // Verify success message 'Success! Your details have been submitted successfully.' is visible
  // (Handled in dialog event above)
  // Click on 'Home' button and verify that landed to home page successfully
  await page.getByRole('link', { name: ' Home' }).click();
  await expect(page).toHaveTitle('Automation Exercise');
});