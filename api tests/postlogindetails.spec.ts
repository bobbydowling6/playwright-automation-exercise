import { test, expect } from '@playwright/test';

test('API Test: Post Login Details with valid credentials', async ({ request }) => {
  const response = await request.post('https://automationexercise.com/api/verifyLogin', {
    form: {
      email: 'btestuser@example.com',
      password: 'Test@1234',
    },
  });

  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  console.log(responseBody);
  expect(responseBody.responseCode).toBe(200);
  expect(responseBody.message).toBe('User exists!');
});