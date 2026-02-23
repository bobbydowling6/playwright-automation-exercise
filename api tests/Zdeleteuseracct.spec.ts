import { test, expect } from '@playwright/test';

test('API Test: Delete Method to Delete User Account', async ({request}) => {
    const response = await request.delete('https://automationexercise.com/api/deleteAccount', {
        form: {
          email: 'btestuser@example.com',  
          password: 'Test@1234',
        },
      });
      expect(response.status()).toBe(200);
      const responseBody = await response.json();
      console.log(responseBody);
      expect(responseBody.responseCode).toBe(200);
      expect(responseBody.message).toBe('Account deleted!');
})