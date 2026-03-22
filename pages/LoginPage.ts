import { Page, expect } from '@playwright/test';
import { User } from '../test-data/users';

export class LoginPage {
  private page: Page;

  // Locators
  private loginEmailInput = 'input[data-qa="login-email"]';
  private loginPasswordInput = 'input[data-qa="login-password"]';
  private loginButton = 'button[data-qa="login-button"]';
  private signupNameInput = 'input[data-qa="signup-name"]';
  private signupEmailInput = 'input[data-qa="signup-email"]';
  private signupButton = 'button[data-qa="signup-button"]';
  private loggedInAs = 'a:has-text("Logged in as")';

  constructor(page: Page) {
    this.page = page;
  }

  async login(email: string, password: string) {
    await this.page.goto('/login');
    await this.page.fill(this.loginEmailInput, email);
    await this.page.fill(this.loginPasswordInput, password);
    await this.page.click(this.loginButton);
  }

  async signup(name: string, email: string) {
    await this.page.goto('/login');
    await this.page.fill(this.signupNameInput, name);
    await this.page.fill(this.signupEmailInput, email);
    await this.page.click(this.signupButton);
  }

  async incorrectLogin() {
    await this.page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').click();
    await this.page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('incorrect@example.com');
    await this.page.getByRole('textbox', { name: 'Password' }).click();
    await this.page.getByRole('textbox', { name: 'Password' }).fill('incorrectpassword');
  }

  async loginErrorMessage() {
    await expect(this.page.getByText("Your email or password is incorrect!")).toBeVisible();
  }

  async signupFormVisible() {
    await expect(this.page.locator('.signup-form')).toBeVisible();
  }

  async loginFormVisible() {
    await expect(this.page.locator('.login-form')).toBeVisible();
  }

  async verifyLoginToYourAccountVisible() {
    await expect(this.page.getByText('Login to your account')).toBeVisible();
  }

  async clickLoginButton() {
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async verifyLoggedIn(name: string) {
    await expect(this.page.locator(this.loggedInAs)).toContainText(name);
  }
  async verifyLoginUrl() {
    await expect(this.page).toHaveURL(/\/login/)
  }
}