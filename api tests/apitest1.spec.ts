import { test, expect } from '@playwright/test';
import { z } from 'zod';
import fs from 'fs';

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

test('Comprehensive Product API Audit to GET All Products', async ({ request }) => {
  // --- STEP 1: Fetch Data ---
  const response = await request.get('https://automationexercise.com/api/productsList');
  expect(response.status()).toBe(200);
  
  const rawData = await response.json();

  // --- STEP 2: Validate & Transform ---
  // If the API structure changes, this line will throw a detailed error
  const validatedData = ApiResponseSchema.parse(rawData);
  const products = validatedData.products;

  // --- STEP 3: Data Analysis (Find Most and Least Expensive) ---
  const mostExpensive = products.reduce((prev, current) => 
    (prev.price > current.price) ? prev : current
  );
  const leastExpensive = products.reduce((prev, current) => 
    (prev.price < current.price) ? prev : current
  );

  console.log(`📊 Audit Summary:`);
  console.log(`- Total Items: ${products.length}`);
  console.log(`- Most Expensive: ${mostExpensive.name} (${mostExpensive.price})`);
  console.log(`- Least Expensive: ${leastExpensive.name} (${leastExpensive.price}) =>`)

  // --- STEP 4: Export to CSV ---
  const csvHeader = 'ID,Name,Price_Numeric,Brand\n';
  const csvRows = products
    .map(p => `${p.id},"${p.name}",${p.price},"${p.brand}"`)
    .join('\n');

  fs.writeFileSync('product_audit_report.csv', csvHeader + csvRows);
  
  // --- STEP 5: Final Assertions ---
  expect(validatedData.responseCode).toBe(200);
  expect(products.length).toBeGreaterThan(0);
  // Business logic check: Ensure no product is free
  expect(mostExpensive.price).toBeGreaterThan(0);
});