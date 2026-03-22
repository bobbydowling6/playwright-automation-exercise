import { Page, expect } from '@playwright/test';
import { PaymentCard } from '../test-data/payment';
import fs from 'fs';
import path from 'path';
export class PaymentPage {
  private page: Page;

  // Locators
  private nameOnCardInput = 'input[data-qa="name-on-card"]';
  private cardNumberInput = 'input[data-qa="card-number"]';
  private cvcInput = 'input[data-qa="cvc"]';
  private expiryMonthInput = 'input[data-qa="expiry-month"]';
  private expiryYearInput = 'input[data-qa="expiry-year"]';
  private payButton = 'button[data-qa="pay-button"]';
  private orderPlacedTitle = '.title';

  constructor(page: Page) {
    this.page = page;
  }

  async paymentTitle() {
    await expect(this.page.getByRole('heading', { name: 'Payment' })).toBeVisible();
  }

  async fillPaymentDetails(card: PaymentCard) {
    await this.page.fill(this.nameOnCardInput, card.nameOnCard);
    await this.page.fill(this.cardNumberInput, card.number);
    await this.page.fill(this.cvcInput, card.cvc);
    await this.page.fill(this.expiryMonthInput, card.expiryMonth);
    await this.page.fill(this.expiryYearInput, card.expiryYear);
  }

  async submitPayment() {
    await this.page.click(this.payButton);
  }

  async verifyOrderPlaced() {
    await expect(this.page.getByText('Order Placed!')).toBeVisible();
    await expect(this.page.getByText('Congratulations! Your order')).toBeVisible();
  }

  async getOrderConfirmationMessage(): Promise<string> {
    return await this.page.locator('p').first().textContent() || '';
  }

  // Complete payment flow
  async completePayment(card: PaymentCard) {
    await this.fillPaymentDetails(card);
    await this.submitPayment();
    await this.verifyOrderPlaced();
  }
  async continueButton() {
    await this.page.getByRole('link', { name: 'Continue' }).click();
  }
  async downloadInvoice() {
    const [download] = await Promise.all([
          this.page.waitForEvent('download'),
          this.page.getByRole('link', { name: 'Download Invoice' }).click()
        ]);
        expect(download.suggestedFilename()).toContain('invoice');
    
        const saveDir = path.join(process.cwd(), 'test-results', 'downloaded-invoices');
        fs.mkdirSync(saveDir, { recursive: true });
        const savePath = path.join(saveDir, download.suggestedFilename());
        await download.saveAs(savePath);
    
        expect(fs.existsSync(savePath), 'Downloaded invoice file should exist on disk').toBe(true);
        const stats = fs.statSync(savePath);
        expect(stats.size, 'Downloaded invoice file should not be empty').toBeGreaterThan(0);
  }
}