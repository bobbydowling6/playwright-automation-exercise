import { test, expect } from '@playwright/test';

test('User is able to register as a new user', async ({ page }) => {
  await test.step('Go to https://automationexercise.com/', async () => {
    await page.goto('http://automationexercise.com/');
    await test.step('Verify that home page is visible successfully', async () => {
    await expect(page).toHaveTitle('Automation Exercise');
  });
  });
  

  await test.step('Click on \'Signup / Login\' button', async () => {
    await page.getByRole('link', { name: ' Signup / Login' }).click();
  });

  await test.step('Verify \'New User Signup!\' is visible', async () => {
    await expect(page.getByText('New User Signup!')).toBeVisible();
  });

  await test.step('Enter name and email address', async () => {
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('Btestuser');
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').click();
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill('btestuser@example.com');
  });

  await test.step('Click \'Signup\' button', async () => {
    await page.getByRole('button', { name: 'Signup' }).click();
  });

  await test.step('Verify that \'ENTER ACCOUNT INFORMATION\' is visible', async () => {
    await expect(page.getByText('Enter Account Information')).toBeVisible();
  });

  await test.step('Fill details: Title, Name, Email, Password, Date of birth', async () => {
  await expect(page.getByText('Title')).toBeVisible();
  await page.getByRole('radio', { name: 'Mr.' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).fill('Test@1234');
  await expect(page.getByText('Date of Birth')).toBeVisible();
  await page.locator('#days').selectOption('1');
  await page.locator('#months').selectOption('January');
  await page.locator('#years').selectOption('1990');
  });

  await test.step('Select checkbox \'Sign up for our newsletter!\' and \'Receive special offers from our partners!\'', async () => {
  await page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).click();
  await page.waitForTimeout(500); // Small wait to ensure checkbox state is updated
  await expect(page.getByLabel('Sign up for our newsletter!')).toBeChecked();
  await page.getByLabel('Sign up for our newsletter!').check();

  await test.step('Select checkbox \'Receive special offers from our partners!\'', async () => {
    await page.getByRole('checkbox', { name: 'Receive special offers from our partners!' }).click();
    await page.waitForTimeout(500); // Small wait to ensure checkbox state is updated
    await expect(page.getByLabel('Receive special offers from our partners!')).toBeChecked(); 
    await page.getByLabel('Receive special offers from our partners!').check();
  });
})
  await test.step('Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number', async () => {
  await page.getByRole('paragraph').filter({ hasText: 'First name *' }).getByRole('superscript');
  await expect(page.getByText('First name *')).toBeVisible();
  await page.getByRole('textbox', { name: 'First name *' }).fill('Test');
  await page.getByRole('paragraph').filter({ hasText: 'Last name *' }).getByRole('superscript');
  await expect(page.getByText('Last name *')).toBeVisible();
  await page.getByRole('textbox', { name: 'Last name *' }).fill('User');
  await page.getByRole('textbox', { name: 'Company', exact: true }).fill('TestCompany');
  await page.getByRole('paragraph').filter({ hasText: 'Address *' }).getByRole('superscript');
  await expect(page.getByText('Address *')).toBeVisible();
  await page.getByRole('textbox', { name: 'Address *' }).fill('123 Test St');
  await expect(page.getByText('Address 2')).toBeVisible();
  await page.getByRole('textbox', { name: 'Address 2' }).fill('Suite 100');
  await page.getByRole('combobox', { name: 'Country *' }).click();
  await page.getByLabel('Country').selectOption('United States');
  await page.getByRole('textbox', { name: 'State *' }).getByRole('superscript');
  await expect(page.getByText('State *')).toBeVisible();
  await page.getByRole('textbox', { name: 'State *' }).fill('TestState');
  await page.getByRole('paragraph').filter({ hasText: 'City *' }).getByRole('superscript');
  await page.getByRole('textbox', { name: 'City * Zipcode *' }).click();
  await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('TestCity');
  await page.locator('#zipcode').filter({ hasText: 'Zipcode *' }).getByRole('superscript');
  await page.locator('#zipcode').click();
  await page.locator('#zipcode').fill('12345');
  await page.getByRole('paragraph').filter({ hasText: 'Mobile Number *' }).getByRole('superscript');
  await expect(page.getByText('Mobile Number *')).toBeVisible();
  await page.getByRole('textbox', { name: 'Mobile Number *' }).click();
  await page.getByRole('textbox', { name: 'Mobile Number *' }).fill('1234567890');
  });

  await test.step('Click \'Create Account\' button', async () => {
    await page.getByRole('button', { name: 'Create Account' }).click();
  });

  await test.step('Verify that \'ACCOUNT CREATED!\' is visible', async () => {
    await expect(page.getByText('Account Created!')).toBeVisible();
  });

  await test.step('Click \'Continue\' button', async () => {
    await page.getByRole('link', { name: 'Continue' }).click();
  });

  await test.step('Verify that \'Logged in as username\' is visible', async () => {
    await page.getByRole('listitem').filter({ hasText: 'Logged in as Btestuser' });
    await page.getByText('Logged in as Btestuser').click(); // Click to ensure focus
    await expect(page).toHaveTitle('Automation Exercise');
  });
  
});
