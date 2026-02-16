// Improved wait and timeout handling for download invoice tests
import { test, expect } from '@playwright/test';

// Test to handle downloading invoice

test('Download Invoice', async ({ page }) => {
    // Navigate to the page
    await page.goto('http://example.com/invoices');
    
    // Improved wait for the download button to be visible
    await page.waitForSelector('#download-button', { timeout: 10000 });
    
    // Click the download button with added attempt to catch potential stale element issue
    await page.click('#download-button');
    
    // Wait for the download link to appear
    const downloadPromise = page.waitForEvent('download');
    
    // Wait for a specific amount of time to improve reliability
    await page.waitForTimeout(2000);
    
    const download = await downloadPromise;
    
    // Verify the path of the downloaded file
    const suggestedFilename = download.suggestedFilename();
    expect(suggestedFilename).toBe('invoice.pdf');
});