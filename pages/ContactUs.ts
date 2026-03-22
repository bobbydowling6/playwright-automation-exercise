import { expect } from "@playwright/test";

export class ContactUsPage {
    constructor(private page: any) {
        // Initialize any necessary properties or state here
    }
    async navigate() {
        await this.page.goto('https://automationexercise.com/contact_us');
    }
    async title() {
        await expect(this.page).toHaveTitle('Automation Exercise - Contact Us');
    }
    async getInTouchHeadingVisible() {
        await expect(this.page.getByRole('heading', { name: 'Get In Touch' })).toBeVisible();
    }
    async fillFormDetails(name: string, email: string, subject: string, message: string) {
        await this.page.getByRole('textbox', { name: 'Name' }).fill(name);
        await this.page.getByRole('textbox', { name: 'Email', exact: true }).fill(email);
        await this.page.getByRole('textbox', { name: 'Subject' }).fill(subject);
        await this.page.getByRole('textbox', { name: 'Message' }).fill(message);
    }
    async contactUsFormVisible() {
        await expect(this.page.locator('#contact-us-form')).toBeVisible();
    }
    async uploadFile(filePath: string) {
        await this.page.locator('input[name="upload_file"]').setInputFiles(filePath);
    }
    async handleDialog() {
        this.page.once('dialog', async (dialog: { message: () => any; accept: () => any; }) => {
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept(); // Clicks 'OK'
        });
    }
    async submitFormButtonClick() {
        await this.page.getByRole('button', { name: 'Submit' }).click();
    }
    async successMessageVisible() {
        const successMsg = this.page.locator('.status.alert.alert-success');
        await expect(successMsg).toBeVisible();
        await expect(successMsg).toHaveText('Success! Your details have been submitted successfully.');
    }
    async clickHomeButton() {
        await this.page.once('dialog', async (dialog: { message: () => any; dismiss: () => any; }) => {
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.dismiss().catch(() => {});
        });
        await this.page.getByRole('link', { name: ' Home' }).click();
    }
    async nameInput() {
        return this.page.locator('input[data-qa="name"]');
    }
    async emailInput() {
        return this.page.locator('input[data-qa="email"]');
    }
    async subjectInput() {
        return this.page.locator('input[data-qa="subject"]');
    }
    async messageInput() {
        return this.page.locator('textarea[data-qa="message"]');
    }
}