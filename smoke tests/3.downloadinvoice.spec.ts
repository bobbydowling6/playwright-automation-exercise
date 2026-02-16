// Updated timeouts in the smoke test for improved reliability

import { expect } from '@playwright/test';
import { test } from '@playwright/test';

// Adjusting timeouts and waits in the tests

test('Download invoice test', async ({ page }) => {
    // Go to the invoice download page
    await page.goto('https://example.com/invoice-download');

    // Wait until 'ENTER ACCOUNT INFORMATION' is visible with longer timeout
    await expect(page.locator('text=ENTER ACCOUNT INFORMATION')).toBeVisible({ timeout: 30000 });

    // Wait until 'Review Your Order' is visible with longer timeout
    await expect(page.locator('text=Review Your Order')).toBeVisible({ timeout: 30000 });

    // Here is where the download event will be triggered
    const [download] = await Promise.all([
        page.waitForEvent('download', { timeout: 60000 }), // Extend timeout for download event
        page.click('button#download-invoice') // This simulates click to download the invoice
    ]);

    // You might want to follow up with assertions here
    const path = await download.path();
    console.log('Downloaded file path:', path);
});
