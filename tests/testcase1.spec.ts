import { test, expect } from '@playwright/test';

test('User is able to register as a new user', async ({ page }) => {
  // Go to https://automationexercise.com/
  await page.goto('http://automationexercise.com/');
  //Verify that home page is visible successfully
  await expect(page).toHaveTitle('Automation Exercise');

  // Click on 'Signup / Login' button
  await page.getByRole('link', { name: ' Signup / Login' }).click();

  // Verify 'New User Signup!' is visible
  await expect(page.getByText('New User Signup!')).toBeVisible();

  // Enter name and email address
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('Btestuser');
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').click();
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill('btestuser@example.com');

  // Click on 'Signup' button
  await page.getByRole('button', { name: 'Signup' }).click();

  // Verify that 'ENTER ACCOUNT INFORMATION' is visible
  await expect(page.getByText('Enter Account Information')).toBeVisible();

  // Fill details: Title, Name, Email, Password, Date of birth
  await expect(page.getByText('Title')).toBeVisible();
  await page.getByRole('radio', { name: 'Mr.' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).fill('Test@1234');
  await expect(page.getByText('Date of Birth')).toBeVisible();
  await page.locator('#days').selectOption('1');
  await page.locator('#months').selectOption('January');
  await page.locator('#years').selectOption('1990');

  // Select checkbox 'Sign up for our newsletter!'
  await page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).click();
  await page.waitForTimeout(500); // Small wait to ensure checkbox state is updated
  await expect(page.getByLabel('Sign up for our newsletter!')).toBeChecked();
  await page.getByLabel('Sign up for our newsletter!').check();

  // Select checkbox 'Receive special offers from our partners!'
  await page.getByRole('checkbox', { name: 'Receive special offers from our partners!' }).click();
  await page.waitForTimeout(500); // Small wait to ensure checkbox state is updated
  await expect(page.getByLabel('Receive special offers from our partners!')).toBeChecked(); 
  await page.getByLabel('Receive special offers from our partners!').check();

  // Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
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

  // Click on 'Create Account' button
  await page.getByRole('button', { name: 'Create Account' }).click();
  //await page.waitForLoadState('networkidle');
  //await page.waitForTimeout(2000); // Wait for 2 seconds to ensure the next page loads

  // Verify that 'ACCOUNT CREATED!' is visible
  await expect(page.getByText('Account Created!')).toBeVisible();
  //await page.waitForTimeout(4000); // Small wait before clicking continue
  //await page.locator('iframe[name="aswift_2"]').contentFrame().getByRole('button', { name: 'Close ad' }).click(); // Close any ad iframe if present

  // Click on 'Continue' button
  await page.getByRole('link', { name: 'Continue' }).click();
  //await page.waitForLoadState('networkidle');
  //await page.waitForTimeout(4000); // Wait for 4 seconds to ensure the next page loads

  // Verify that 'Logged in as username' is visible
  await page.getByRole('listitem').filter({ hasText: 'Logged in as Btestuser' });
  //await page.waitForTimeout(4000); // Small wait before proceeding
  await page.getByText('Logged in as Btestuser').click(); // Click to ensure focus
  await expect(page).toHaveTitle('Automation Exercise');
  
});
