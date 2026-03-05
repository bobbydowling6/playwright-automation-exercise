import { expect } from "@playwright/test";

export class ContactUsPage {
    constructor(private page: any) {
        // Initialize any necessary properties or state here
    }
    async navigate() {
        await this.page.goto('https://automationexercise.com/contact_us');
    }
    async contactUsFormVisible() {
        await expect(this.page.locator('#contact-us-form')).toBeVisible();
    }
}