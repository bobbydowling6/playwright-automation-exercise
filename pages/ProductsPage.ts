import { Page, expect } from '@playwright/test';

export class ProductsPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('/products');
  }

  async searchProduct(term: string) {
    await this.page.fill('#search_product', term);
    await this.page.click('#submit_search');
  }

  async addFirstProductToCart() {
    await this.page.hover('.productinfo');
    await this.page.locator('.productinfo .add-to-cart').first().click();
    await this.page.click('button:has-text("Continue Shopping")');
  }

  async addProductToCartByIndex(index: number) {
    await this.page.locator('.productinfo').nth(index).hover();
    await this.page.locator('.productinfo .add-to-cart').nth(index).click();
    await this.page.click('button:has-text("Continue Shopping")');
  }

  async addMultipleProductsToCart(count: number) {
    for (let i = 0; i < count; i++) {
      await this.addProductToCartByIndex(i);
    }
  }

  async getProductCount(): Promise<number> {
    return await this.page.locator('.productinfo').count();
  }
}