# Playwright Automation Exercise

This is a JavaScript/TypeScript automation project for testing an e-commerce website using the Playwright automation framework.

## Project Overview

This project contains comprehensive automated end-to-end tests and API tests for the [Automation Exercise](https://automationexercise.com/) website, a demo e-commerce platform. The test suite includes smoke tests covering user workflows, product interactions, cart management, and API validation tests.

## Features Tested

### Smoke Tests (E2E)
- **User Registration**: Complete user account creation flow with form validation
- **User Login/Logout**: Both successful and failed login scenarios, logout functionality
- **Contact Us**: Contact form submission and validation
- **Account Management**: User account deletion and existing user registration validation
- **Product Search**: Product search functionality and results validation
- **Shopping Cart**: Add/remove products, update quantities, cart management
- **Product Details**: View all products, product detail pages, brand and category filtering
- **Product Reviews**: Add reviews to products
- **Subscriptions**: Newsletter subscription from home page and cart page
- **Invoice Download**: Download invoice functionality
- **Test Cases**: Multiple test case scenarios (14, 15, 16, 22, 25, 26)

### API Tests
- **Product API**: Comprehensive product API validation with schema validation
- **API Endpoints**: Multiple API endpoint testing scenarios
- **Broken Links**: Automated broken link detection across the website
- **Data Export**: CSV report generation for product and brand audits

## Technology Stack

- **Playwright**: Modern web testing framework for end-to-end and API testing
- **TypeScript**: Type-safe JavaScript for better development experience
- **Node.js**: JavaScript runtime environment
- **Zod**: Schema validation library for API response validation

## Project Structure

```
playwright-automation-exercise/
├── smoke tests/                # End-to-end UI tests
│   ├── Aregisteruser.spec.ts           # User registration test
│   ├── Bregisteruserexisting.spec.ts   # Existing user registration test
│   ├── correctlogin.spec.ts            # Successful login test
│   ├── incorrectlogin.spec.ts          # Failed login test
│   ├── correctlogout.spec.ts           # Logout test
│   ├── contactus.spec.ts               # Contact form test
│   ├── searchproduct.spec.ts           # Product search test
│   ├── addproductscart.spec.ts         # Add products to cart
│   ├── removeproductscart.spec.ts      # Remove products from cart
│   ├── productquantitycart.spec.ts     # Update cart quantities
│   ├── allproductsdetailpage.spec.ts   # Product detail pages
│   ├── viewbrandproducts.spec.ts       # Brand filtering
│   ├── viewcategoryproducts.spec.ts    # Category filtering
│   ├── addreviewproduct.spec.ts        # Product reviews
│   ├── subscriptionhome.spec.ts        # Home page subscription
│   ├── subscriptioncart.spec.ts       # Cart page subscription
│   ├── 3.downloadinvoice.spec.ts      # Invoice download
│   ├── testcase*.spec.ts              # Various test case scenarios
│   └── Zdeleteuser.spec.ts            # Account deletion test
├── api tests/                  # API and integration tests
│   ├── apitest1.spec.ts              # API test 1
│   ├── apitest2.spec.ts              # API test 2
│   ├── apitest3.spec.ts              # API test 3
│   ├── apitest4.spec.ts              # API test 4
│   ├── apitest5.spec.ts              # API test 5
│   ├── apitest6.spec.ts              # API test 6
│   └── findbrokenlinks.spec.ts       # Broken link detection
├── playwright-report/         # Test execution reports
├── test-results/              # Test artifacts and screenshots
├── brands_list_report.csv     # Generated brand/product audit report
├── product_audit_report.csv   # Generated product audit report
├── playwright.config.ts       # Playwright configuration
├── package.json               # Project dependencies and scripts
└── README.md                  # This file
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

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

## Running Tests

### Run all tests
```bash
npx playwright test
```

### Run tests in a specific browser
```bash
# Chromium (Chrome)
npx playwright test --project=chromium

# Firefox
npx playwright test --project=firefox

# WebKit (Safari)
npx playwright test --project=webkit
```

### Run a specific test file
```bash
# Run a smoke test
npx playwright test "smoke tests/Aregisteruser.spec.ts"

# Run an API test
npx playwright test "api tests/apitest1.spec.ts"
```

### Run tests by directory
```bash
# Run all smoke tests only
npx playwright test "smoke tests/"

# Run all API tests only
npx playwright test "api tests/"
```

### Run tests in headed mode (see browser UI)
```bash
npx playwright test --headed
```

### Generate and view test report
```bash
npx playwright show-report
```

## Configuration

The project is configured in `playwright.config.ts` with the following settings:

- **Test Match**: Tests are located in `smoke tests/` and `api tests/` directories
- **Browsers**: Chromium, Firefox, and WebKit
- **Parallel Execution**: Tests run in parallel for faster execution (disabled on CI)
- **Retries**: Automatic retries on CI (2 retries) and no retries locally
- **Tracing**: Trace collection on first retry for debugging
- **Reporter**: HTML report generation

## Test Execution Details

- Tests are written using Playwright's test runner
- Each test follows a step-by-step approach with clear assertions
- Tests include proper waits and element interactions
- Screenshots and traces are captured on failures for debugging
- **Ad Blocking**: Smoke tests include ad blocking to improve test stability and speed
- **API Validation**: API tests use Zod schema validation for type-safe API response validation
- **Report Generation**: API tests generate CSV reports for product and brand audits

## Dependencies

- `@playwright/test`: ^1.57.0 - Playwright testing framework
- `@types/node`: ^25.0.3 - TypeScript type definitions for Node.js
- `zod`: ^4.3.6 - Schema validation library for API testing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add your tests or improvements
4. Run the test suite to ensure everything works
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Repository

[GitHub Repository](https://github.com/bobbydowling6/playwright-automation-exercise)
