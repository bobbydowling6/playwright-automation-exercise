import { Page, expect } from '@playwright/test';

export class ProductsPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('/products');
  }
  async productsPageUrl() {
    await expect(this.page).toHaveURL(/\/products/);
  }

  async verifyProductsPageVisible() {
    await expect(this.page.getByRole('heading', { name: 'All Products' })).toBeVisible();
  }

  async poloBrandProduct() {
    await this.page.getByRole('link', { name: 'Polo' }).click();
  }

  async madameBrandProduct() {
    await this.page.getByRole('link', { name: 'Madame' }).click();
  }

  async poloBrandProductsVisible() {
    await expect(this.page.getByRole('heading', { name: 'BRAND - POLO PRODUCTS' })).toBeVisible();
  }

  async madameBrandProductsVisible() {
    await expect(this.page.getByRole('heading', { name: 'BRAND - MADAME PRODUCTS' })).toBeVisible();
  }

  async verifycategoriesVisible() {
    await expect(this.page.locator('div.left-sidebar')).toBeVisible();
  }

  async clickWomenCategory() {
    await this.page.getByRole('link', { name: ' Women' }).click();
  }

  async clickMenCategory() {
    await this.page.getByRole('link', { name: ' Men' }).click();
  }

  async clickDressSubCategory() {
    await this.page.getByRole('link', { name: 'Dress' }).click();
  }

  async clickTshirtsSubCategory() {
    await this.page.getByRole('link', { name: 'Tshirts' }).click();
  }

  async womenDressProductsVisible() {
    await expect(this.page.getByRole('heading', { name: 'WOMEN - DRESS PRODUCTS' })).toBeVisible();
  }

  async menTshirtsProductsVisible() {
    await expect(this.page.getByRole('heading', { name: 'MEN - TSHIRTS PRODUCTS' })).toBeVisible();
  }

  async searchProductWithResults(term: string) {
    await expect(this.page.getByRole('heading', { name: 'Searched Products' })).toBeVisible();
  }

  async searchProductsCount(expectedCount: number) {
    const products = this.page.locator('.features_items .product-image-wrapper');
    await expect(products).toHaveCount(expectedCount);
  }

  async searchProductInitialCount() {
    const initialCount = await this.page.locator('.features_items .product-image-wrapper').count();
    return initialCount;
    console.log(`Initial product count: ${initialCount}`);
  }

  async emptySearch() {
    await this.page.click('#submit_search');
  }

  async searchProductUrl() {
    await expect(this.page).toHaveURL(/search/);
  }

  async searchProductFinalCount(expectedCount: number) {
    const products = this.page.locator('.features_items .product-image-wrapper');
    await expect(products).toHaveCount(expectedCount);
    console.log(`Final product count after search: ${expectedCount}`);
  }

  async searchProduct(term: string) {
    await this.page.fill('#search_product', term);
    await this.page.click('#submit_search');
  }

  async addFirstProductToCart() {
    await this.page.locator('.productinfo').first().hover();
    await this.page.locator('.overlay-content').first().getByText('Add to cart').click();
    await expect(this.page.locator('#cartModal')).toContainText('Added!');
    await expect(this.page.locator('#cartModal')).toContainText('Your product has been added to cart.');
    await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
  }

  async addProductToCartByIndex(index: number) {
    await this.page.locator('.productinfo').nth(index).hover();
    await this.page.locator('.overlay-content').nth(index).getByText('Add to cart').click();
    await expect(this.page.locator('#cartModal')).toContainText('Added!');
    await this.page.getByRole('link', { name: 'View Cart' }).click();
    await this.page.getByText('Home Shopping Cart Proceed To').click();
  }

  async addMultipleProductsToCart(count: number) {
    for (let i = 0; i < count; i++) {
      await this.addProductToCartByIndex(i);
    }
  }

  async getProductCount(): Promise<number> {
    return await this.page.locator('.productinfo').count();
  }
  async addProductToCart() {
    let products = this.page.locator('.single-products');

        // First Product: Hover and click
        await products.first().hover();
        // Targeting the 'Add to cart' in the overlay to ensure visibility
        await products.first().locator('.overlay-content .add-to-cart').click();
        await this.page.getByRole('button', { name: 'Continue Shopping' }).click();

        // Second Product: Hover and click
        await products.nth(1).hover();
        await products.nth(1).locator('.overlay-content .add-to-cart').click();
        
        // Use the link inside the modal to go to cart
        await this.page.locator('#cartModal').getByRole('link', { name: 'View Cart' }).click();
    }
    async verifyGreenSidePlacketDetailPage() {
        await expect(this.page.getByRole('heading', { name: 'Green Side Placket Detail' })).toBeVisible();
        await expect(this.page.locator('.product-information')).toBeVisible();
    }
    async addGreenSidePlacketToCartWithQuantity() {
        const quantityInput = this.page.locator('#quantity');
        await quantityInput.fill('4'); 
        
        await this.page.getByRole('button', { name: 'Add to cart' }).click();
    }
    async viewFirstProduct() {
        await this.page.getByRole('link', { name: ' View Product' }).first().click();
    }
    async verifyWriteYourReviewVisible() {
        await expect(this.page.getByRole('list').filter({ hasText: 'Write Your Review' })).toBeVisible();
    }
    async fillReviewForm(name: string, email: string, review: string) {
        await this.page.getByRole('textbox', { name: 'Your Name' }).fill(name);
        await this.page.getByRole('textbox', { name: 'Email Address', exact: true }).fill(email);
        await this.page.getByRole('textbox', { name: 'Add Review Here!' }).fill(review);
    }
    async submitReview() {
        await this.page.getByRole('button', { name: 'Submit' }).click();
    }
    async verifyReviewSubmissionSuccess() {
        await expect(this.page.getByText('Thank you for your review.')).toBeVisible();
    }
    async clickViewProductOfFirstProduct() {
      const firstProduct = this.page.locator('.features_items .product-image-wrapper').first();
        await firstProduct.getByRole('link', { name: 'View Product' }).click();
    }
    async verifyProductDetailPageUrl() {
        await expect(this.page).toHaveURL(/\/product_details\/\d+/);
    }
    async verifyProductDetailPage() {
        await expect(this.page.locator('.product-information')).toBeVisible();
    }
    async verifyProductDetailsBlueTop() {
        await expect(this.page.getByRole('heading', { name: 'Blue Top' })).toBeVisible();
        await expect(this.page.getByText('Category: Women > Tops')).toBeVisible();
        await expect(this.page.getByText('Rs.')).toBeVisible();
        await expect(this.page.getByText('Availability: In Stock')).toBeVisible();
        await expect(this.page.getByText('Condition: New')).toBeVisible();
        await expect(this.page.getByText('Brand: Polo')).toBeVisible();
        // Alternatively, using regex to match text patterns
        await expect(this.page.getByText(/Category: .+/)).toBeVisible();
        await expect(this.page.getByText(/Rs\..+/)).toBeVisible();
        await expect(this.page.getByText(/Availability: .+/)).toBeVisible();
        await expect(this.page.getByText(/Condition: .+/)).toBeVisible();
        await expect(this.page.getByText(/Brand: .+/)).toBeVisible()
    }
}