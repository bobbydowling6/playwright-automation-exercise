# Playwright Automation Exercise

This is a JavaScript/TypeScript automation project for testing an e-commerce website using the Playwright automation framework.

## Project Overview

This project contains automated end-to-end tests and API tests for the [Automation Exercise](https://automationexercise.com/) website, a demo e-commerce platform. The suite includes smoke tests for user workflows, product interactions, cart management, and API validation. UI tests use a **Page Object Model** under `pages/`, with shared **fixtures** and **test data** for reuse.

## Features Tested

### Smoke Tests (E2E)
- **User Registration**: Complete user account creation flow with form validation
- **User Login/Logout**: Successful and failed login scenarios, logout
- **Contact Us**: Contact form submission and validation
- **Account Management**: User account deletion and existing-user registration validation
- **Product Search**: Product search and results
- **Shopping Cart**: Add/remove products, update quantities, cart management
- **Boundary Values**: Cart quantity edge cases (e.g. min/max) on product detail
- **Product Details**: All products, detail pages, brand and category filtering
- **Product Reviews**: Add reviews to products
- **Subscriptions**: Newsletter subscription from home and cart pages
- **Invoice Download**: Download invoice after checkout-style flows
- **Test Cases Page**: Navigation to the site’s Test Cases page
- **Smoke / Page Objects**: Consolidated smoke flows using `HomePage`, `ProductsPage`, `LoginPage`, `ContactUs`, and `CartPage` (`@smoke`)
- **Named Test Cases**: Scenarios aligned with site test cases (e.g. 14, 15, 16, 22, 25, 26)

### API Tests
- **Product API**: Product API validation (including Zod schema checks where used)
- **API Endpoints**: Multiple API scenarios (`apitest1`–`apitest6`)
- **Account API**: Create account, update account, get user by email, delete user account, and related login/delete verification flows
- **Broken Links**: Automated broken link checks across the site
- **Data Export**: CSV reports for product and brand audits (`product_audit_report.csv`, `brands_list_report.csv`)

## Technology Stack

- **Playwright**: End-to-end and API testing
- **TypeScript**: Type-safe tests and page objects
- **Node.js**: Runtime
- **Zod**: API response schema validation
- **dotenv**: Load `BASE_URL` and credentials from `.env`

## Project Structure

```
playwright-automation-exercise/
├── smoke tests/                 # End-to-end UI tests (*.spec.ts)
├── api tests/                   # API and integration tests
├── pages/                       # Page Object Model (Home, Products, Login, etc.)
├── fixtures/                    # Playwright fixtures (auth, checkout)
├── test-data/                   # Shared user, checkout, and payment test data
├── .github/workflows/           # CI: Playwright on push/PR to main or master
├── playwright-report/           # HTML report output (generated)
├── test-results/                # Artifacts, traces, screenshots (generated)
├── brands_list_report.csv       # Generated brand audit (from API flows)
├── product_audit_report.csv     # Generated product audit (from API flows)
├── playwright.config.ts         # Playwright configuration
├── package.json
├── .env.example                 # Template for BASE_URL and secrets (copy to .env)
└── README.md
```

### Smoke test files

| File | Purpose |
|------|---------|
| `Aregisteruser.spec.ts` | User registration |
| `Bregisteruserexisting.spec.ts` | Register when email already exists |
| `correctlogin.spec.ts` | Successful login |
| `incorrectlogin.spec.ts` | Failed login |
| `correctlogout.spec.ts` | Logout |
| `contactus.spec.ts` | Contact form |
| `searchproduct.spec.ts` | Product search |
| `addproductscart.spec.ts` | Add to cart |
| `removeproductscart.spec.ts` | Remove from cart |
| `productquantitycart.spec.ts` | Cart quantities |
| `boundaryvalue.spec.ts` | Quantity boundary / edge cases |
| `allproductsdetailpage.spec.ts` | Product detail pages |
| `viewbrandproducts.spec.ts` | Brand filtering |
| `viewcategoryproducts.spec.ts` | Category filtering |
| `addreviewproduct.spec.ts` | Product reviews |
| `subscriptionhome.spec.ts` | Home page newsletter |
| `subscriptioncart.spec.ts` | Cart page newsletter |
| `3.downloadinvoice.spec.ts` | Invoice download |
| `1.testcase14.spec.ts`, `2.testcase15.spec.ts` | Test case 14 / 15 |
| `testcase16.spec.ts`, `testcase22.spec.ts`, `testcase25.spec.ts`, `testcase26.spec.ts` | Test cases 16, 22, 25, 26 |
| `testcasepage.spec.ts` | Test Cases page navigation |
| `smoketest.spec.ts` | Page-object smoke suite (`@smoke`) |
| `Zdeleteuser.spec.ts` | Account deletion |

### API test files

| File | Purpose |
|------|---------|
| `apitest1.spec.ts`–`apitest6.spec.ts` | API endpoint scenarios |
| `createacct.spec.ts` | Create account API |
| `putupdateacct.spec.ts` | Update account API |
| `getuseracctdetailemail.spec.ts` | User details by email |
| `postlogindetails.spec.ts`, `postlogininvaliddetails.spec.ts`, `postloginnoemaildetails.spec.ts` | Login API variants |
| `deletetoverifylogin.spec.ts`, `Zdeleteuseracct.spec.ts` | Delete user / post-delete checks |
| `findbrokenlinks.spec.ts` | Broken link crawl |

### Page objects (`pages/`)

`CartPage.ts`, `CheckoutPage.ts`, `ContactUs.ts`, `HomePage.ts`, `LoginPage.ts`, `PaymentPage.ts`, `ProductsPage.ts`, `RegistrationPage.ts`

## Prerequisites

- Node.js (LTS recommended; CI uses `lts/*`)
- npm

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bobbydowling6/playwright-automation-exercise.git
   cd playwright-automation-exercise
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Environment variables (optional but recommended for local runs that need credentials):
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set `BASE_URL` (defaults to `https://automationexercise.com` in config if unset), test user fields, and any payment or address values your tests require. Do not commit `.env`.

4. Install browsers (first time or after Playwright upgrades):
   ```bash
   npx playwright install
   ```

## Running Tests

### Run all tests
```bash
npx playwright test
```

### Run tests in a specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run a specific test file
```bash
npx playwright test "smoke tests/Aregisteruser.spec.ts"
npx playwright test "api tests/apitest1.spec.ts"
```

### Run tests by directory
```bash
npx playwright test "smoke tests/"
npx playwright test "api tests/"
```

### Run tagged smoke tests (page-object suite)
```bash
npx playwright test --grep @smoke
```

### Run tests in headed mode
```bash
npx playwright test --headed
```

### View HTML report
```bash
npx playwright show-report
```

## Continuous Integration

GitHub Actions (`.github/workflows/playwright.yml`) runs on push and pull requests to `main` or `master`: `npm ci`, `npx playwright install --with-deps`, then `npx playwright test "smoke tests" "api tests"`. The workflow uploads the `playwright-report/` artifact (30-day retention).

## Configuration

`playwright.config.ts` includes:

- **testMatch**: `smoke tests/**/*.spec.ts`, `api tests/**/*.spec.ts`
- **baseURL**: `process.env.BASE_URL` or `https://automationexercise.com` (loaded via dotenv)
- **Projects**: Chromium, Firefox, WebKit
- **Parallelism**: Full parallel locally; **1 worker** on CI (`CI` set)
- **Retries**: 2 on CI, 0 locally
- **forbidOnly**: Enabled when `CI` is set
- **trace**: `on-first-retry`
- **reporter**: HTML

## Test Execution Notes

- Tests use Playwright’s test runner with explicit steps and assertions where applicable.
- Traces are collected on retry for failures.
- Many smoke tests **block ad/analytics requests** to stabilize runs against the live site.
- API tests may use Zod for response validation and can emit CSV audit files.

## Dependencies

**devDependencies**

- `@playwright/test` ^1.57.0  
- `@types/node` ^25.0.3  

**dependencies**

- `dotenv` ^17.3.1  
- `zod` ^4.3.6  

## Contributing

1. Fork the repository  
2. Create a feature branch  
3. Add or update tests  
4. Run the suite locally (`npx playwright test`)  
5. Open a pull request  

## License

This project is licensed under the ISC License.

## Repository

[GitHub Repository](https://github.com/bobbydowling6/playwright-automation-exercise)
