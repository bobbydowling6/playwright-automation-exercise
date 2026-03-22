import { Page, expect } from '@playwright/test';
import { User } from '../test-data/users';

export class RegistrationPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  async newUserSignupVisible() {
    await expect(this.page.getByText('New User Signup!')).toBeVisible();
  }
  
  async enterNameAndEmail(name: string, email: string) {
    await this.page.getByRole('textbox', { name: 'Name' }).click();
    await this.page.getByRole('textbox', { name: 'Name' }).fill(name);
    await this.page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').click();
    await this.page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(email);
  }

  async clickSignupButton() {
    await this.page.getByRole('button', { name: 'Signup' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyEnterAccountInformationVisible() {
    await expect(this.page.getByText(/ENTER ACCOUNT INFORMATION/i)).toBeVisible({ timeout: 15000 });
  }

  async fillAccountInformation(user: User) {
    // Gender
    if (user.title === 'Mr') {
      await this.page.check('#id_gender1');
    } else {
      await this.page.check('#id_gender2');
    }

    // Password
    await this.page.fill('#password', user.password);

    // Date of Birth
    if (user.dateOfBirth) {
      await this.page.locator('#days').selectOption('1');
      await this.page.locator('#months').selectOption('January');
      await this.page.locator('#years').selectOption('1990');
    }

    // Newsletter & Offers (optional)
    await this.page.check('#newsletter');
    await this.page.check('#optin');
  }

  async selectNewsletter() {
    await this.page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
    await this.page.waitForTimeout(500);
    await expect(this.page.getByLabel('Sign up for our newsletter!')).toBeChecked();
    await this.page.getByLabel('Sign up for our newsletter!').check();
  }

  async selectSpecialOffers() {
    await this.page.getByRole('checkbox', { name: 'Receive special offers from our partners!' }).check();
    await this.page.waitForTimeout(500);
    await expect(this.page.getByLabel('Receive special offers from our partners!')).toBeChecked();
    await this.page.getByLabel('Receive special offers from our partners!').check();
  }

  async fillAddressInformation(user: User) {
    if (!user.address) return;

    await this.page.fill('#first_name', user.address.firstName);
    await this.page.fill('#last_name', user.address.lastName);
    
    if (user.address.company) {
      await this.page.fill('#company', user.address.company);
    }

    await this.page.fill('#address1', user.address.address1);
    
    if (user.address.address2) {
      await this.page.fill('#address2', user.address.address2);
    }

    await this.page.selectOption('#country', user.address.country);
    await this.page.fill('#state', user.address.state);
    await this.page.fill('#city', user.address.city);
    await this.page.fill('#zipcode', user.address.zipcode);
    await this.page.fill('#mobile_number', user.address.mobileNumber);
  }

  async submitRegistration() {
    await this.page.click('button[data-qa="create-account"]');
  }

  async verifyAccountCreated() {
    await expect(this.page.locator('b')).toContainText('Account Created!');
  }

  async continueAfterRegistration() {
    await this.page.click('a[data-qa="continue-button"]');
  }

  // Complete registration flow
  async completeRegistration(user: User) {
    await this.fillAccountInformation(user);
    await this.fillAddressInformation(user);
    await this.submitRegistration();
    await this.verifyAccountCreated();
    await this.continueAfterRegistration();
  }
  async verifyEmailAlreadyExists() {
    console.log(await this.page.content()); // Print page HTML for diagnosis
    await expect(this.page.getByText('Email Address already exist!')).toBeVisible();  
  }
}