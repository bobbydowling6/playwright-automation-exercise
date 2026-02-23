import { test, expect } from '@playwright/test';

test('API Test: Post Login Details without email', async ({ request }) => {
  const response = await request.post('https://automationexercise.com/api/verifyLogin', {
    form: {
      password: 'Test@1234',
    },
  });
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  console.log(responseBody);
  expect(responseBody.responseCode).toBe(400);
  expect(responseBody.message).toBe('Bad request, email or password parameter is missing in POST request.');
});