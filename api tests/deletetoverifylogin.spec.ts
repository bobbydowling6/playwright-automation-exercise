import { test, expect } from '@playwright/test';

test('API Test: Delete User to verify login', async ({ request }) => {
  const response = await request.delete('https://automationexercise.com/api/verifyLogin', {
    form: {
      email: 'btestuser@example.com',
      password: 'Test@1234',
    },
  });
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  console.log(responseBody);
  expect(responseBody.responseCode).toBe(405);
  expect(responseBody.message).toBe('This request method is not supported.');
});