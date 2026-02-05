import { test, expect } from '@playwright/test';
import { z } from 'zod';

// 1. Define the Product Schema to match the actual API response
const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.string(), // The API returns price as a string (e.g., "Rs. 500")
  brand: z.string(), // Changed from 'brands' to 'brand'
  category: z.object({
    usertype: z.object({ usertype: z.string() }),
    category: z.string(),
  }),
});

// 2. Define the Response Schema
const ApiResponseSchema = z.object({
  responseCode: z.number(),
  products: z.array(ProductSchema), // The key is 'products', not 'users'
});

test('Comprehensive Product API Audit to POST a Search Product without search parameters', async ({ request }) => {
  // --- STEP 1: Fetch Data ---
  const response = await request.post('https://automationexercise.com/api/searchProduct', {
    // No form data provided
  });

  expect(response.status()).toBe(200);
  const rawData = await response.json();

  // STEP 2: Expect Status is 400 (since no search parameters were provided)
  expect(rawData.responseCode).toBe(400);
  console.log(`Received expected response code: ${rawData.responseCode}`);

});