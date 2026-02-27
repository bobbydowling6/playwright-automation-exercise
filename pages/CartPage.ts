import { expect } from "@playwright/test";

export class CartPage {
    constructor(private page: any) {
        // Initialize any necessary properties or state here
    }
    async subscription() {
        await expect(this.page.getByRole('heading', { name: 'Subscription' })).toBeVisible();
    }
    async subscribe() {
        await this.page.getByPlaceholder('Your email address').click();
        await this.page.getByPlaceholder('Your email address').fill('btestuser@example.com');
        await this.page.locator('#subscribe').click();
    }
}