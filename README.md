# Playwright Automation Exercise

This is a JavaScript/TypeScript automation project for testing an e-commerce website using the Playwright automation framework.

## Project Overview

This project contains automated end-to-end tests for the [Automation Exercise](https://automationexercise.com/) website, a demo e-commerce platform. The tests cover key user workflows including user registration, authentication, contact forms, and account management.

## Features Tested

- **User Registration**: Complete user account creation flow with form validation
- **User Login**: Both successful and failed login scenarios
- **Contact Us**: Contact form submission and validation
- **Account Management**: User account deletion

## Technology Stack

- **Playwright**: Modern web testing framework for end-to-end testing
- **TypeScript**: Type-safe JavaScript for better development experience
- **Node.js**: JavaScript runtime environment

## Project Structure

```
playwright-automation-exercise/
├── tests/
│   ├── Aregisteruser.spec.ts    # User registration test
│   ├── contactus.spec.ts        # Contact form test
│   ├── correctlogin.spec.ts     # Successful login test
│   ├── incorrectlogin.spec.ts   # Failed login test
│   └── Zdeleteuser.spec.ts      # Account deletion test
├── playwright-report/           # Test execution reports
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
npx playwright test tests/Aregisteruser.spec.ts
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

- **Browsers**: Chromium, Firefox, and WebKit
- **Parallel Execution**: Tests run in parallel for faster execution
- **Retries**: Automatic retries on CI (2 retries) and no retries locally
- **Tracing**: Trace collection on first retry for debugging
- **Reporter**: HTML report generation

## Test Execution Details

- Tests are written using Playwright's test runner
- Each test follows a step-by-step approach with clear assertions
- Tests include proper waits and element interactions
- Screenshots and traces are captured on failures for debugging

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
