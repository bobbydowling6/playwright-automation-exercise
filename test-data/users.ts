import dotenv from 'dotenv';
dotenv.config();

export interface User {
  email: string;
  password: string;
  name: string;
  title?: 'Mr' | 'Mrs';
  dateOfBirth?: {
    day: string;
    month: string;
    year: string;
  };
  address?: Address;
}

export interface Address {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}

export const users = {
  standard: {
    email: process.env.VALID_EMAIL || 'btestuser@example.com',
    password: process.env.VALID_PASSWORD || 'Test@1234',
    name: 'Btestuser',
    title: 'Mr' as const,
    dateOfBirth: {
      day: ' 1',
      month: '1',
      year: '1990',
    },
    address: {
      firstName: process.env.BILLING_FIRST_NAME || 'Test',
      lastName: process.env.BILLING_LAST_NAME || 'User',
      company: 'TestCompany',
      address1: process.env.BILLING_ADDRESS_1 || '123 Test Street',
      address2: process.env.BILLING_ADDRESS_2 || 'Suite 100',
      country: process.env.BILLING_COUNTRY || 'United States',
      state: process.env.BILLING_STATE || 'TestState',
      city: process.env.BILLING_CITY || 'TestCity',
      zipcode: process.env.BILLING_ZIPCODE || '12345',
      mobileNumber: process.env.BILLING_PHONE || '1234567890',
    },
  },
  
  admin: {
    email: process.env.ADMIN_EMAIL || 'admin@example.com',
    password: process.env.ADMIN_PASSWORD || 'AdminPass456!',
    name: 'Admin User',
    title: 'Mrs' as const,
    address: {
      firstName: 'Admin',
      lastName: 'User',
      address1: '456 Admin Road',
      country: 'United States',
      state: 'New York',
      city: 'New York',
      zipcode: '10001',
      mobileNumber: '9876543210',
    },
  },

  newUser: () => ({
    email: 'btestuser@example.com',
    password: 'Test@1234',
    name: 'Btestuser',
    title: 'Mr' as const,
    dateOfBirth: {
      day: '1',
      month: '1',
      year: '1990',
    },
    address: {
      firstName: 'Test',
      lastName: 'User',
      address1: '123 Test Street',
      country: 'United States',
      state: 'TestState',
      city: 'TestCity',
      zipcode: '12345',
      mobileNumber: '1234567890',
    },
  }),
};