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

test('Comprehensive Product API Audit to POST a Search Product', async ({ request }) => {
  // --- STEP 1: Fetch Data ---
  const response = await request.post('https://automationexercise.com/api/searchProduct', {
    form: { // The API expects form data for this specific endpoint
      search_product: 'tshirt'
    }
  });

  expect(response.status()).toBe(200);
  const rawData = await response.json();

  // --- STEP 2: Validate Data with Zod ---
  // Use .safeParse if you want to handle errors gracefully, or .parse to throw immediately
  const result = ApiResponseSchema.safeParse(rawData);

  if (!result.success) {
    console.error('Schema Validation Failed:', result.error.format());
    throw new Error('API response does not match the expected schema.');
  }

  const products = result.data.products;

  // --- STEP 3: Assertions ---
  expect(products.length).toBeGreaterThan(0);
  console.log(`Success! Found ${products.length} products.`);
  
  // Example: Check the first product's name
  expect(products[0].name.toLowerCase()).toContain('tshirt');

  // STEP 4: Expect Status is 200 ---
  expect(rawData.responseCode).toBe(200);
  console.log(`Received expected response code: ${rawData.responseCode}`);
});