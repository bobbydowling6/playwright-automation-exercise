export interface CheckoutData {
  comment?: string;
}

export const checkoutData = {
  standard: {
    comment: 'Please deliver between 9 AM and 5 PM',
  },

  urgent: {
    comment: 'URGENT: Please deliver ASAP',
  },

  giftOrder: {
    comment: 'This is a gift. Please include gift wrapping.',
  },

  noComment: {
    comment: '',
  },
};