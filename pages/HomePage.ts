import { expect } from "@playwright/test";

export class HomePage {
    constructor(private page: any) {
        // Initialize any necessary properties or state here
    }
    async navigate() {
        await this.page.goto('https://automationexercise.com/');
    }
    async title() {
        await expect(this.page).toHaveTitle('Automation Exercise');
    }
    async subscription() {
        await expect(this.page.getByRole('heading', { name: 'Subscription' })).toBeVisible();
    }
    async subscribe() {
        await this.page.getByPlaceholder('Your email address').click();
        await this.page.getByPlaceholder('Your email address').fill('btestuser@example.com');
        await this.page.locator('#subscribe').click();
    }
    async clickSignupLogin() {
        await this.page.click('a[href="/login"]');
  }

    async clickProducts() {
        await this.page.click('a[href="/products"]');
  }

    async clickCart() {
        await this.page.click('a[href="/view_cart"]');
  }

    async verifyLoggedInAs(name: string) {
        await expect(this.page.locator(`a:has-text("Logged in as ${name}")`)).toBeVisible();
  }

    async isHomePageVisible() {
        await expect(this.page.locator('#slider')).toBeVisible();
  }
    async testcases() {
        await this.page.click('a[href="/test_cases"]');
        await expect(this.page).toHaveURL(/\/test_cases/);
        await expect(this.page.getByRole('heading', { name: 'Test Cases', exact: true })).toBeVisible();
    }
}
