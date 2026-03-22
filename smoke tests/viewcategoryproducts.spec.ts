import { test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';

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
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
  await test.step('Go to https://automationexercise.com/', async () => {
    await homePage.navigate();
    await test.step('Verify that home page is visible successfully', async () => {
      await homePage.isHomePageVisible();
        });
});
    
  await test.step('Verify that categories are visible on left side', async () => {
    await productsPage.verifycategoriesVisible();
    }); 
  await test.step('Click on \'Women\' category', async () => {
    await productsPage.clickWomenCategory();
});
    await test.step('Click on any sub-category under Women Category', async () => {
      await productsPage.clickDressSubCategory();
        await test.step('Verify that category products page is displayed', async () => {
        await productsPage.womenDressProductsVisible();
        });
});
    await test.step('On the left side bar, click on a sub-category link of Men Category', async () => {
      await productsPage.clickMenCategory();
        await productsPage.clickTshirtsSubCategory();
        await test.step('Verify that user is navigated to that category page', async () => {
        await productsPage.menTshirtsProductsVisible();

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