import { test, expect} from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // Intercept and abort all requests to common ad providers
    await page.route('**/*google*/**', route => {
        const url = route.request().url();
        if (url.includes('googleads') || url.includes('doubleclick') || url.includes('adservice')) {
            return route.abort();
        }
        return route.continue();
    });
});

test('Verify that user is able to view category products', async ({ page }) => {
  await test.step('Go to https://automationexercise.com/', async () => {
    await page.goto('http://automationexercise.com/');
    await test.step('Verify that home page is visible successfully', async () => {
      await expect(page).toHaveTitle('Automation Exercise');
        });
});
    
  await test.step('Verify that categories are visible on left side', async () => {
    await expect(page.locator('div.left-sidebar')).toBeVisible();
    }); 
  await test.step('Click on \'Women\' category', async () => {
    await page.getByRole('link', { name: ' Women' }).click();
});
    await test.step('Click on any sub-category under Women Category', async () => {
      await page.getByRole('link', { name: 'Dress' }).click();
        await test.step('Verify that category products page is displayed', async () => {
        await expect(page.getByRole('heading', { name: 'WOMEN - DRESS PRODUCTS' })).toBeVisible();
        });
});
    await test.step('On the left side bar, click on a sub-category link of Men Category', async () => {
      await page.getByRole('link', { name: ' Men' }).click();
        await page.getByRole('link', { name: 'Tshirts' }).click();
        await test.step('Verify that user is navigated to that category page', async () => {
        await expect(page.getByRole('heading', { name: 'MEN - TSHIRTS PRODUCTS' })).toBeVisible();;

        });
    });
});

// CSV-driven approach for Data-Driven Testing of Search Functionality
const searchTerms = ['tshirt', 'dress', 'jeans', 'top', 'saree', 'nonexistent'];

for (const term of searchTerms) {
  test(`Search for product: "${term}"`, async ({ page }) => {
    await page.goto('https://automationexercise.com/products');
    await page.fill('#search_product', term);
    await page.click('#submit_search');
    if (term === 'nonexistent') {
      await expect(page.locator('.productinfo')).toHaveCount(0);
    } else {
      await expect(page.locator('.productinfo')).not.toHaveCount(0);
    }
  });
}