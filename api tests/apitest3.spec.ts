import { test, expect } from '@playwright/test';
import { z } from 'zod';
import fs from 'fs';

/**
 * --- SCHEMAS ---
 */

// Schema for a single Brand (from /brandsList)
const BrandSchema = z.object({
  id: z.number(),
  brand: z.string(),
});

const BrandResponseSchema = z.object({
  responseCode: z.number(),
  brands: z.array(BrandSchema),
});

// Schema for a single Product (from /productsList)
const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  brand: z.string(),
  // Transform "Rs. 500" -> 500 (Number)
  price: z.string().transform((val) => Number(val.replace(/Rs\.\s?/, '').trim())),
  category: z.object({
    usertype: z.object({ usertype: z.string() }),
    category: z.string(),
  }),
});

const ProductResponseSchema = z.object({
  responseCode: z.number(),
  products: z.array(ProductSchema),
});

/**
 * --- TESTS ---
 */

test.describe('Automation Exercise API Audit', () => {

  test('Consolidated Product and Brand Audit', async ({ request }) => {
    
    // 1. AUDIT BRANDS
    console.log('--- Fetching Brands ---');
    const brandRes = await request.get('https://automationexercise.com/api/brandsList');
    const rawBrandData = JSON.parse(await brandRes.text());
    
    const validatedBrands = BrandResponseSchema.parse(rawBrandData);
    const brandNames = validatedBrands.brands.map(b => b.brand);
    
    console.log(`✅ Validated ${brandNames.length} total brand products.`);

    // 2. AUDIT PRODUCTS
    console.log('--- Fetching Products ---');
    const productRes = await request.get('https://automationexercise.com/api/productsList');
    const rawProductData = JSON.parse(await productRes.text());
    
    const validatedProducts = ProductResponseSchema.parse(rawProductData);
    const products = validatedProducts.products;
    
    console.log(`✅ Validated ${products.length} total products.`);

    // 3. CROSS-VALIDATION & LOGGING
    const uniqueProductBrands = new Set(products.map(p => p.brand));
    
    console.log(`📊 Audit Summary:`);
    console.log(`- Total Products in Brand List: ${brandNames.length}`);
    console.log(`- Total Different Brands actively used in Products: ${uniqueProductBrands.size}`);

    // 4: Validate Status is 200 ---
    expect(rawBrandData.responseCode).toBe(200);
    console.log(`Received expected response code for brands: ${rawBrandData.responseCode}`);
    expect(rawProductData.responseCode).toBe(200);
    console.log(`Received expected response code for products: ${rawProductData.responseCode}`);

    // 5. EXPORT TO CSV
    const csvHeader = 'ID,Name,Price_Numeric,Brand\n';
    const csvRows = products
      .map(p => `${p.id},"${p.name.replace(/"/g, '""')}",${p.price},"${p.brand}"`)
      .join('\n');
    
    fs.writeFileSync('brands_list_report.csv', csvHeader + csvRows);
    console.log('💾 Report saved to brands_list_report.csv');

    // 6. FINAL ASSERTIONS
    expect(validatedBrands.responseCode).toBe(200);
    expect(validatedProducts.responseCode).toBe(200);
    expect(products.length).toBeGreaterThan(0);
    
    // Ensure every product has a valid price
    products.forEach(p => {
      expect(p.price).toBeGreaterThan(0);
    });
  });

});