import { test, expect } from '@playwright/test';

test('API Test: Create Account', async ({ request }) => {
  // Generate a unique email so the test doesn't fail on a second run
  const response = await request.post('https://automationexercise.com/api/createAccount', {
    form: {
      name: 'Btestuser',
      email: 'btestuser@example.com',
      password: 'Test@1234',
      title: 'Mr',
      birth_date: '01',
      birth_month: '01',
      birth_year: '1990',
      firstname: 'Test',
      lastname: 'User',
      company: 'TestCompany',
      address1: '123 Test St',
      address2: 'Suite 100',
      city: 'TestCity',
      state: 'TestState',
      zipcode: '12345',
      country: 'United States',
      mobile_number: '1234567890',
    },
  });

  // Verify the HTTP status code
  expect(response.status()).toBe(200);

  // Parse the JSON body
  const responseBody = await response.json();
  
  // Log the response to see exactly what the API returned
  console.log(responseBody);

  // Assertions based on the actual API response structure
  // Automation Exercise returns a 'responseCode' inside the body
  expect(responseBody.responseCode).toBe(201);
  expect(responseBody.message).toBe('User created!');
});