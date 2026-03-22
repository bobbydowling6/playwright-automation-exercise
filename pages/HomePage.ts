import { expect } from "@playwright/test";

export class HomePage {
    constructor(private page: any) {
        // Initialize any necessary properties or state here
    }
    async navigate() {
        await this.page.goto('https://automationexercise.com/');
    }
    async isHomePageUrl() {
        await expect(this.page).toHaveURL('https://automationexercise.com/');
    }
    async title() {
        await expect(this.page).toHaveTitle('Automation Exercise');
    }
    async homeShoppingCartProceed() {
        await this.page.getByText('Home Shopping Cart Proceed To').click();
    }
    async popupModal() {
        await this.page.getByText('Proceed To Checkout').click();
        await this.page.getByRole('link', { name: 'Register / Login' }).click();
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
    async clickSignupLogin() {
        await this.page.click('a[href="/login"]');
  }

    async clickProducts() {
        await this.page.click('a[href="/products"]');
  }

    async clickCart() {
        await this.page.click('a[href="/view_cart"]');
  }
    async clickContactUs() {
        await this.page.click('a[href="/contact_us"]');
  }
    async clickLogout() {
        await this.page.getByRole('link', {name: ' Logout'}).click();
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
    async recommendedItemsVisible() {
        await expect(this.page.getByRole('heading', { name: 'RECOMMENDED ITEMS' })).toBeVisible();
    }
    async addRecommendedItemToCart() {
        await this.page.locator('.item > div > .product-image-wrapper > .single-products > .productinfo > .btn').first().click();
    }
    async viewCartInModal() {
        await this.page.getByRole('link', { name: 'View Cart' }).click();
    }
    async imageBannerVisible() {
        await expect(this.page.getByRole('img', { name: 'Website for automation practice' })).toBeVisible();
    }
    async navLinksVisible() {
        const navLinks = [
            { text: ' Home', href: '/' }, // Note: some sites have leading spaces in text
            { text: 'Products', href: '/products' },
            { text: 'Cart', href: '/view_cart' },
            { text: 'Signup / Login', href: '/login' },
            { text: 'Contact us', href: '/contact_us' },
        ];

        for (const link of navLinks) {
            const locator = this.page.locator(`.nav >> a[href="${link.href}"]`);
            await expect(locator).toBeVisible();
            await expect(locator).toContainText(link.text);
        }
    }
    async clickGreenSidePlacketDetail() {
        await this.page.locator('div:nth-child(25) > .product-image-wrapper > .choose > .nav > li > a').click({force: true}); 
    }
    async deleteAccountButton() {
        await this.page.getByRole('link', { name: ' Delete Account' }).click();
    }
    async accountDeleted() {
        await expect(this.page.getByText('Account Deleted!')).toBeVisible();
        await this.page.getByRole('link', { name: 'Continue' }).click();
    }
}
