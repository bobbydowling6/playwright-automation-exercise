import { Page, expect } from "@playwright/test";

export class CartPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async navigate() {
    await this.page.goto('/view_cart');
  }
  async cartPageUrl() {
    await expect(this.page).toHaveURL(/\/view_cart/);
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
    async subscribeSuccessMessage() {
        await expect(this.page.getByText('You have been successfully subscribed!')).toBeVisible();
    }
    async blueTopProductInCart() {
        await expect(this.page.getByRole('row', { name: 'Product Image Blue Top' })).toBeVisible();
    }
    async verifyCartItems() {
      let cartRows = this.page.locator('table#cart_info_table tbody tr');
        await expect(cartRows).toHaveCount(2);

        for (let i = 0; i < 2; i++) {
            let row = cartRows.nth(i);
            
            // Extract text and clean it
            const priceText = await row.locator('.cart_price p').innerText();
            const quantityText = await row.locator('.cart_quantity button').innerText(); // Usually a button/text in view cart
            const totalText = await row.locator('.cart_total_price').innerText();

            const price = parseFloat(priceText.replace('Rs. ', ''));
            const quantity = parseInt(quantityText, 10);
            const total = parseFloat(totalText.replace('Rs. ', ''));

            expect(price * quantity).toBe(total);
        }
      }
      async verifyCartItemsBeforeRemoval() {
        let cartRows = this.page.locator('table#cart_info_table tbody tr');
        let initialCount = await cartRows.count();
        expect(initialCount).toBe(2);
      }
      async removeItemsFromCart() {
        let cartRows = this.page.locator('table#cart_info_table tbody tr');
        let initialCount = await cartRows.count();
        for (let i = 0; i < initialCount; i++) {
            let deleteButton = this.page.locator('.cart_quantity_delete').first();
            await deleteButton.click();
            
            // Wait for the row count to decrease instead of waiting for button to hide
            // This makes the test much faster and more stable
            await expect(cartRows).toHaveCount(initialCount - i - 1);
        }
    }
    async verifyCartEmptyAfterRemoval() {
        let cartRows = this.page.locator('#cart_info_table tbody tr');
        
        // Check that the rows are gone
        await expect(cartRows).toHaveCount(0);
        
        // Automation Exercise shows a specific span when empty
        const emptyCartMessage = this.page.locator('#empty_cart');
        await expect(emptyCartMessage).toBeVisible();
        await expect(emptyCartMessage).toContainText('Cart is empty!');
   }
   async navigateToCartFromProducts() {
        const viewCartLink = this.page.getByRole('link', { name: 'View Cart' });
        await expect(viewCartLink).toBeVisible();
        await viewCartLink.click();
    }
    async verifyGreenSidePlacketInCart() {
        await expect(this.page.getByRole('cell', { name: 'Green Side Placket Detail' })).toBeVisible();
    }
    async verifyQuantityInCart(expectedQuantity: string) {
        const quantityCell = this.page.locator('td.cart_quantity button');
        await expect(quantityCell).toHaveText(expectedQuantity);
    }
  }