import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { users, User } from '../test-data/users';

type AuthFixtures = {
  authenticatedPage: Page;
  adminPage: Page;
  loginPage: LoginPage;
  registrationPage: RegistrationPage;
  newRegisteredUser: { page: Page; user: User };
};

export const test = base.extend<AuthFixtures>({
  // LoginPage instance
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  // RegistrationPage instance
  registrationPage: async ({ page }, use) => {
    const registrationPage = new RegistrationPage(page);
    await use(registrationPage);
  },

  // Standard authenticated user
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(users.standard.email, users.standard.password);
    await loginPage.verifyLoggedIn(users.standard.name);
    await use(page);
  },

  // Admin authenticated user
  adminPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(users.admin.email, users.admin.password);
    await loginPage.verifyLoggedIn(users.admin.name);
    await use(page);
  },

  // Freshly registered user (for testing new user checkout flow)
  newRegisteredUser: async ({ page }, use) => {
    const newUser = users.newUser(); // Generate unique user
    const loginPage = new LoginPage(page);
    const registrationPage = new RegistrationPage(page);

    await loginPage.signup(newUser.name, newUser.email);
    await registrationPage.completeRegistration(newUser);

    await use({ page, user: newUser });

    // Cleanup: Delete account after test
    await page.click('a[href="/delete_account"]');
  },
});

export { expect } from '@playwright/test';