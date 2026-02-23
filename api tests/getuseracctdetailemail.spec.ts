import { test, expect } from '@playwright/test';

test('API Test: Get User Account Details by Email', async ({ request }) => {
  const targetEmail = 'btestuser@example.com';

  const response = await request.get('https://automationexercise.com/api/getUserDetailByEmail', {
    params: {
      email: targetEmail,
    },
  });

  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  console.log('User Details:', responseBody);

  // Assertion 1: Check the custom API response code
  expect(responseBody.responseCode).toBe(200);

  // Assertion 2: Verify the user object exists and contains the correct email
  // The API returns details inside a 'user' object
  expect(responseBody.user).toBeDefined();
  expect(responseBody.user.email).toBe(targetEmail);
  expect(responseBody.user.name).toContain('Btestuser');
});