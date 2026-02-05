import { test, expect} from '@playwright/test';
import { z } from 'zod';

// 1. Define the Schema with Transformations
const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  brand: z.string(),
  // Transform "Rs. 500" -> 500 (Number)
  price: z.string().transform((val) => Number(val.replace('Rs. ', '').trim())),
  category: z.object({
    usertype: z.object({ usertype: z.string() }),
    category: z.string(),
  }),
});

const ApiResponseSchema = z.object({
  responseCode: z.number(),
  products: z.array(ProductSchema),
});

// Infer the TypeScript type from the schema
type ApiResponse = z.infer<typeof ApiResponseSchema>;

test('Comprehensive User API Audit to POST All Products', async ({ request }) => {
    // --- STEP 1: Fetch Data ---
    const response = await request.post('https://automationexercise.com/api/productsList');
    expect(response.status()).toBe(200);
    
    const rawData = await response.json();
  
    // --- STEP 2: Validate Status is 405 ---
    expect(rawData.responseCode).toBe(405);
    console.log(`Received expected response code: ${rawData.responseCode}`);
});