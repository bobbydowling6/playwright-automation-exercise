import { test, expect } from '@playwright/test';

test('API Test: Post Login Details with invalid credentials', async ({ request }) => {
  const response = await request.post('https://automationexercise.com/api/verifyLogin', {
    form: {
      email: 'invalid@example.com',
      password: 'invalidpassword',
    },
  });
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  console.log(responseBody);
  expect(responseBody.responseCode).toBe(404);
  expect(responseBody.message).toBe('User not found!');
});