# Playwright Automation Exercise

This is a JavaScript/TypeScript automation project for testing an e-commerce website using the Playwright automation framework.

## Project Overview

This project contains automated end-to-end tests for the [Automation Exercise](https://automationexercise.com/) website, a demo e-commerce platform. The tests are organized into smoke tests and API tests, covering comprehensive user workflows including user registration, authentication, product browsing, shopping cart operations, and account management.

## Features Tested

### User Management
- **User Registration**: Complete user account creation flow with form validation
- **User Registration (Existing Email)**: Validation for duplicate email registration attempts
- **User Login**: Both successful and failed login scenarios
- **User Logout**: Successful logout functionality
- **Account Management**: User account deletion

### Product Features
- **Product Search**: Search functionality with multiple product queries
- **Product Categories**: Navigation through category and sub-category pages
- **Brand Products**: Viewing products by brand
- **Product Details**: Viewing all products and product detail pages
- **Product Reviews**: Adding reviews to products

### Shopping Cart
- **Add Products to Cart**: Adding multiple products to shopping cart
- **Remove Products from Cart**: Removing products from shopping cart
- **Product Quantity**: Managing product quantities in cart
- **Cart Subscription**: Newsletter subscription from cart page

### Other Features
- **Contact Us**: Contact form submission and validation
- **Newsletter Subscription**: Subscription functionality on home and cart pages
- **Scroll Functionality**: Scroll up/down functionality with and without arrow button
- **Test Case Page**: Navigation to test case documentation page
- **Recommended Items**: Adding products from recommended items section

### API Tests
- **Broken Links**: Automated detection of broken links across the website

## Technology Stack

- **Playwright**: Modern web testing framework for end-to-end testing (v1.57.0)
- **TypeScript**: Type-safe JavaScript for better development experience
- **Node.js**: JavaScript runtime environment

## Project Structure

```
playwright-automation-exercise/
├── smoke tests/                # End-to-end smoke tests
│   ├── Aregisteruser.spec.ts              # User registration test
│   ├── Bregisteruserexisting.spec.ts      # Duplicate email registration test
│   ├── correctlogin.spec.ts               # Successful login test
│   ├── incorrectlogin.spec.ts             # Failed login test
│   ├── correctlogout.spec.ts              # Logout test
│   ├── contactus.spec.ts                  # Contact form test
│   ├── Zdeleteuser.spec.ts                # Account deletion test
│   ├── searchproduct.spec.ts              # Product search test
│   ├── viewcategoryproducts.spec.ts       # Category navigation test
│   ├── viewbrandproducts.spec.ts          # Brand products test
│   ├── allproductsdetailpage.spec.ts      # Product detail pages test
│   ├── addproductscart.spec.ts            # Add products to cart test
│   ├── removeproductscart.spec.ts         # Remove products from cart test
│   ├── productquantitycart.spec.ts        # Product quantity management test
│   ├── addreviewproduct.spec.ts           # Product review test
│   ├── subscriptionhome.spec.ts           # Home page subscription test
│   ├── subscriptioncart.spec.ts           # Cart page subscription test
│   ├── testcase22.spec.ts                 # Recommended items test
│   ├── testcase25.spec.ts                 # Scroll with arrow button test
│   ├── testcase26.spec.ts                 # Scroll without arrow button test
│   └── testcasepage.spec.ts               # Test case page navigation test
├── api tests/                  # API and integration tests
│   └── findbrokenlinks.spec.ts            # Broken links detection test
├── playwright-report/          # Test execution reports
├── test-results/               # Test artifacts and screenshots
├── playwright.config.ts        # Playwright configuration
├── package.json                # Project dependencies and scripts
└── README.md                   # This file
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
npx playwright test "smoke tests/Aregisteruser.spec.ts"
```

### Run all smoke tests
```bash
npx playwright test "smoke tests"
```

### Run all API tests
```bash
npx playwright test "api tests"
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

- **Test Match**: Tests are located in `smoke tests/**/*.spec.ts` and `api tests/**/*.spec.ts`
- **Browsers**: Chromium, Firefox, and WebKit
- **Parallel Execution**: Tests run in parallel for faster execution (disabled on CI)
- **Retries**: Automatic retries on CI (2 retries) and no retries locally
- **Tracing**: Trace collection on first retry for debugging
- **Reporter**: HTML report generation
- **Workers**: Unlimited workers locally, single worker on CI

## Test Execution Details

- Tests are written using Playwright's test runner
- Each test follows a step-by-step approach with clear assertions using `test.step()`
- Tests include proper waits and element interactions
- Screenshots and traces are captured on failures for debugging
- Many tests include ad-blocking logic to prevent interference from ad providers
- API tests use Playwright's request context for HTTP testing

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
