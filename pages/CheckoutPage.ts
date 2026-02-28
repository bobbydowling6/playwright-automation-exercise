import { Page, expect } from '@playwright/test';
import { User } from '../test-data/users';

export class CheckoutPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyDeliveryAddress(user: User) {
    if (!user.address) return;

    const deliveryAddress = this.page.locator('#address_delivery');
    await expect(deliveryAddress).toContainText(user.address.firstName);
    await expect(deliveryAddress).toContainText(user.address.lastName);
    await expect(deliveryAddress).toContainText(user.address.address1);
    await expect(deliveryAddress).toContainText(user.address.city);
    await expect(deliveryAddress).toContainText(user.address.state);
    await expect(deliveryAddress).toContainText(user.address.zipcode);
  }

  async verifyBillingAddress(user: User) {
    if (!user.address) return;

    const billingAddress = this.page.locator('#address_invoice');
    await expect(billingAddress).toContainText(user.address.firstName);
    await expect(billingAddress).toContainText(user.address.lastName);
    await expect(billingAddress).toContainText(user.address.address1);
  }

  async verifyOrderReview() {
    await expect(this.page.locator('#cart_info')).toBeVisible();
    await expect(this.page.locator('.cart_description')).toBeVisible();
    await expect(this.page.locator('.cart_price')).toBeVisible();
    await expect(this.page.locator('.cart_quantity')).toBeVisible();
    await expect(this.page.locator('.cart_total')).toBeVisible();
  }

  async addComment(comment: string) {
    await this.page.fill('.form-control', comment);
  }

  async proceedToPayment() {
    await this.page.click('a[href="/payment"]');
  }
}