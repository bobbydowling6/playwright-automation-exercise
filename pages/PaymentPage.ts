import { Page, expect } from '@playwright/test';
import { PaymentCard } from '../test-data/payment';

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
    await expect(this.page.locator(this.orderPlacedTitle)).toContainText('Order Placed!');
    await expect(this.page.locator('p')).toContainText('Congratulations');
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
}