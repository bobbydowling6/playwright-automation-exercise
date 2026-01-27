import { test, expect } from '@playwright/test';

test('Check for broken links in website', async ({ page, request }) => {
    await page.goto('https://automationexercise.com/');

    const allLinks = await page.locator('a').all();
    const linkUrls = [];

    // 1. Extract unique URLs to avoid redundant checks
    for (const link of allLinks) {
        const href = await link.getAttribute('href');
        if (href && href.startsWith('http')) {
            linkUrls.push(href);
        }
    }
    const uniqueLinks = [...new Set(linkUrls)];
    console.log(`Checking ${uniqueLinks.length} unique links...`);

    // 2. Map URLs to a list of Promise-based status checks
    const results = await Promise.all(
        uniqueLinks.map(async (url) => {
            try {
                const response = await request.get(url, { failOnStatusCode: false, timeout: 10000 });
                return { url, status: response.status() };
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                return { url, status: 'FAILED', error: errorMessage };
            }
        })
    );

    // 3. Filter the results for broken links
    const brokenLinks = results.filter(res => (typeof res.status === 'number' && res.status >= 400) || res.status === 'FAILED');

    // Logging & Assertions
    if (brokenLinks.length > 0) {
        console.log('❌ Broken Links Found:');
        brokenLinks.forEach(bl => console.log(`- ${bl.url} (Status: ${bl.status})`));
    } else {
        console.log('✅ All links are healthy!');
    }

    expect(brokenLinks, `Found ${brokenLinks.length} broken links`).toEqual([]);
});