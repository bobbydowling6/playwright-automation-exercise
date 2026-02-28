import { Page, expect } from "@playwright/test";

export class CartPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async navigate() {
    await this.page.goto('/view_cart');
  }

  async getCartItemCount(): Promise<number> {
    return await this.page.locator('#cart_info_table tbody tr').count();
  }

  async proceedToCheckout() {
    await this.page.click('.check_out');
  }

  async removeItem(index: number = 0) {
    await this.page.locator('.cart_quantity_delete').nth(index).click();
  }

  async verifyCartEmpty() {
    const count = await this.getCartItemCount();
    expect(count).toBe(0);
  }

  async verifyCartNotEmpty() {
    const count = await this.getCartItemCount();
    expect(count).toBeGreaterThan(0);
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