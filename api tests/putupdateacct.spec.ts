import { test, expect } from '@playwright/test';

test('API Test: Update Account and Verify Changes', async ({ request }) => {
  const userEmail = 'btestuser@example.com';
  const newName = 'Btestuser Updated';

  // 1. Perform the Update
  const updateResponse = await request.put('https://automationexercise.com/api/updateAccount', {
    form: {
      email: userEmail,
      password: 'Test@1234',
      name: newName,
      firstname: 'Test',
      lastname: 'User',
      address1: '456 New Ave', // Changing the address too
      country: 'United States',
      zipcode: '54321',
      state: 'NewState',
      city: 'NewCity',
      mobile_number: '0987654321'
    },
  });

  const updateResult = await updateResponse.json();
  expect(updateResult.responseCode).toBe(200);
  expect(updateResult.message).toBe('User updated!');

  // 2. Verify the update actually persisted
  const verifyResponse = await request.get('https://automationexercise.com/api/getUserDetailByEmail', {
    params: { email: userEmail },
  });

  const userData = await verifyResponse.json();
  
  // Assert that the name in the database is now the NEW name
  expect(userData.user.name).toBe(newName);
  expect(userData.user.address1).toBe('456 New Ave');
});