import dotenv from 'dotenv';
dotenv.config();

export interface PaymentCard {
  number: string;
  cvc: string;
  expiryMonth: string;
  expiryYear: string;
  nameOnCard: string;
}

export const paymentCards = {
  // Primary test card
  validCard: {
    number: process.env.TEST_CARD_NUMBER || '4111111111111111',
    cvc: process.env.TEST_CARD_CVC || '123',
    expiryMonth: process.env.TEST_CARD_EXPIRY_MONTH || '12',
    expiryYear: process.env.TEST_CARD_EXPIRY_YEAR || '2029',
    nameOnCard: process.env.TEST_CARD_NAME || 'Btestuser',
  },

  // Invalid cards for negative testing
  expiredCard: {
    number: '4111111111111111',
    cvc: '123',
    expiryMonth: '12',
    expiryYear: '2020', // ← Expired
    nameOnCard: 'Expired Card',
  },

  invalidNumber: {
    number: '4111111111111112', // ← Invalid Luhn check
    cvc: '123',
    expiryMonth: '12',
    expiryYear: '2027',
    nameOnCard: 'Invalid Number',
  },

  shortCVC: {
    number: '4111111111111111',
    cvc: '12', // ← Too short
    expiryMonth: '12',
    expiryYear: '2027',
    nameOnCard: 'Short CVC',
  },
};

// Helper to generate random valid card for uniqueness tests
export function generateRandomCard(): PaymentCard {
  return {
    number: '4111111111111111',
    cvc: Math.floor(100 + Math.random() * 900).toString(),
    expiryMonth: (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0'),
    expiryYear: (2025 + Math.floor(Math.random() * 5)).toString(),
    nameOnCard: `Test User ${Date.now()}`,
  };
}