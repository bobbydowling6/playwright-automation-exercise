import { Page, expect } from '@playwright/test';
import { User } from '../test-data/users';

export class RegistrationPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
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
      await this.page.selectOption('#days', user.dateOfBirth.day);
      await this.page.selectOption('#months', user.dateOfBirth.month);
      await this.page.selectOption('#years', user.dateOfBirth.year);
    }

    // Newsletter & Offers (optional)
    await this.page.check('#newsletter');
    await this.page.check('#optin');
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
}