# OrangeHRM Test Automation Project

A comprehensive test automation framework for the OrangeHRM application using Playwright with JavaScript and the Page Object Model pattern.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Test Coverage](#test-coverage)
- [Page Object Model](#page-object-model)
- [Test Reports](#test-reports)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)

## 🎯 Project Overview

This project provides automated testing for the OrangeHRM demo application, focusing on core functionality including login, logout, and user authentication workflows. The framework is built using Playwright for cross-browser testing with a Page Object Model design pattern for maintainability and scalability.

**Application Under Test:** [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com/web/index.php/auth/login)

## ✨ Features

- **Cross-browser Testing**: Chrome, Firefox, and WebKit support
- **Page Object Model**: Organized and maintainable test structure
- **Comprehensive Test Coverage**: Login, logout, and authentication scenarios
- **Security Testing**: SQL injection, XSS, and input validation
- **Accessibility Testing**: Keyboard navigation and tab order validation
- **Detailed Test Planning**: Comprehensive test scenarios documentation
- **CI/CD Ready**: GitHub Actions workflow configured
- **Multiple Reporting**: HTML reports with screenshots and videos

## 📁 Project Structure

```
Personal Project/
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI/CD pipeline configuration
├── Fixtures/
│   ├── dashboard.html             # Mock dashboard for offline testing
│   ├── login.html                 # Mock login page for offline testing
│   └── requestPasswordResetCode.html # Mock password reset page
├── PageObjects/
│   ├── DashboardPage.js           # Dashboard page object
│   ├── LoginPage.js               # Login page object
│   └── PageObjectManager.js       # Page object factory
├── specs/
│   └── Login-Test-Plan.md         # Comprehensive test plan documentation
├── tests/
│   ├── Login.spec.js              # Login functionality tests
│   └── Logout.spec.js             # Logout functionality tests
├── test-results/                  # Test execution results
├── playwright-report/             # HTML test reports
├── playwright.config.js           # Playwright configuration
├── package.json                   # Node.js dependencies and scripts
└── README.md                      # Project documentation
```

## 🔧 Prerequisites

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **Git** (for version control)

## 🚀 Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd "Personal Project"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

## ⚙️ Configuration

The project uses `playwright.config.js` for configuration:

- **Browsers**: Chrome, Firefox, WebKit
- **Base URL**: OrangeHRM demo application
- **Timeouts**: 30 seconds default
- **Screenshots**: On failure
- **Videos**: On first retry
- **Reports**: HTML reporter with open on failure

## 🎮 Running Tests

### Run all tests:
```bash
npm test
```

### Run specific test file:
```bash
npx playwright test tests/Login.spec.js
```

### Run tests in headed mode (visible browser):
```bash
npx playwright test --headed
```

### Run tests in debug mode:
```bash
npx playwright test --debug
```

### Run tests on specific browser:
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Generate and view test report:
```bash
npx playwright show-report
```

## 🧪 Test Coverage

### Login Test Suite (18 scenarios)

#### **Authentication Tests** (4 tests)
- ✅ Successful login with valid credentials
- ✅ Login with invalid username
- ✅ Login with invalid password  
- ✅ Login with both invalid credentials

#### **Input Validation Tests** (4 tests)
- ✅ Login with empty username field
- ✅ Login with empty password field
- ✅ Login with both fields empty
- ✅ Login with whitespace-only username

#### **Security Tests** (3 tests)
- ✅ Password field masking verification
- ✅ SQL injection attempt prevention
- ✅ XSS attempt prevention

#### **UI/UX Tests** (3 tests)
- ✅ Tab navigation between fields
- ✅ Enter key submission from password field
- ✅ Error message visibility and clarity

#### **Password Recovery Tests** (1 test)
- ✅ Forgot password link functionality

### Logout Test Suite (1 scenario)
- ✅ Successful logout functionality

### **Total Test Scenarios**: 19 automated tests

## 🏗️ Page Object Model

The project implements the Page Object Model pattern for better maintainability:

### **PageObjectManager.js**
- Central factory for creating page objects
- Manages page object instances

### **LoginPage.js**
- Login page elements and methods
- Username/password input handling
- Login button and forgot password link actions

### **DashboardPage.js**
- Dashboard page elements and methods
- User menu dropdown handling
- Logout functionality

## 📊 Test Reports

### HTML Reports
- Detailed test execution results
- Screenshots on failures
- Video recordings for debugging
- Timeline view of test execution

### Access Reports:
```bash
npx playwright show-report
```

## 🔍 Troubleshooting

### Common Issues:

1. **Network timeouts:**
   - The project includes mock HTML fixtures for offline testing
   - Increase timeout in playwright.config.js if needed

2. **Element not found:**
   - Check if selectors match the current application version
   - Update page object selectors if UI changes

3. **Tests failing intermittently:**
   - Add explicit waits for dynamic content
   - Check network stability
   - Increase timeout values if needed

### Debug Commands:
```bash
# Run with browser visible
npx playwright test --headed

# Run in debug mode with step-by-step execution
npx playwright test --debug

# Run single test for debugging
npx playwright test tests/Login.spec.js -g "Successful login"
```

## 🚀 CI/CD Integration

The project includes GitHub Actions workflow (`.github/workflows/playwright.yml`) that:

- Runs tests on multiple browsers
- Generates test reports
- Uploads artifacts
- Triggered on push and pull requests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-test`
3. Add your tests following the existing pattern
4. Update documentation if needed
5. Run tests: `npm test`
6. Commit changes: `git commit -m "Add new test scenarios"`
7. Push to branch: `git push origin feature/new-test`
8. Create a Pull Request

## 📝 Test Planning

Comprehensive test planning documentation is available in:
- `specs/Login-Test-Plan.md` - Detailed test scenarios and requirements

## 🔧 Development

### Adding New Tests:
1. Create test files in the `tests/` directory
2. Follow the existing naming convention: `*.spec.js`
3. Use the Page Object Model pattern
4. Add corresponding page objects if needed

### Adding New Page Objects:
1. Create page object files in `PageObjects/` directory
2. Follow the existing structure and naming convention
3. Update `PageObjectManager.js` to include new page objects

## 📋 Test Credentials

**Default test credentials for OrangeHRM demo:**
- Username: `Admin`
- Password: `admin123`

## 🏷️ Version

Current Version: 1.0.0

---

**Built with ❤️ using Playwright and JavaScript**
