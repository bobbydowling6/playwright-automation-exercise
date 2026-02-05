import { test, expect} from '@playwright/test';
import { z } from 'zod';

// 1. Define the Schema with Transformations
const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  brands: z.string(),
  // Transform "active" string to boolean
  status: z.string().transform((val) => val.toLowerCase() === 'active'),
});

const ApiResponseSchema = z.object({
  responseCode: z.number(),
  users: z.array(UserSchema),
});

// Infer the TypeScript type from the schema
type ApiResponse = z.infer<typeof ApiResponseSchema>;

test('Comprehensive User API Audit to PUT All Brands List', async ({ request }) => {
    // --- STEP 1: Fetch Data ---
    const response = await request.put('https://automationexercise.com/api/brandsList');
    expect(response.status()).toBe(200);
    
    const rawData = await response.json();
  
    // --- STEP 2: Validate Status is 405 ---
    expect(rawData.responseCode).toBe(405);
    console.log(`Received expected response code: ${rawData.responseCode}`);
});