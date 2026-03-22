import { expect, test } from '@playwright/test';
import { PageObjectManager } from "../PageObjects/PageObjectManager";

test.describe('Login Test Suite', () => {
    let pageObjectManager;
    let loginPage;

    test.beforeEach(async ({ page }) => {
        pageObjectManager = new PageObjectManager(page);
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        loginPage = pageObjectManager.getLoginPage();
        
        // Verify page loads successfully
        await expect(page).toHaveTitle(/OrangeHRM/);
        await expect(loginPage.usernameInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
    });

    // Authentication Tests
    test.describe('Authentication Tests', () => {
        test('Successful login with valid credentials', async ({ page }) => {
            await loginPage.enterUsername('Admin');
            await loginPage.enterPassword('admin123');
            await loginPage.clickLogin();

            // Verify successful navigation to dashboard
            await expect(page).toHaveURL(/.*dashboard/);
            console.log('Login successful, dashboard loaded');
        });

        test('Login with invalid username', async ({ page }) => {
            await loginPage.enterUsername('InvalidUser');
            await loginPage.enterPassword('admin123');
            await loginPage.clickLogin();

            // Verify error message and user remains on login page
            await expect(page.locator('.oxd-alert-content')).toBeVisible();
            await expect(page).toHaveURL(/.*login/);
        });

        test('Login with invalid password', async ({ page }) => {
            await loginPage.enterUsername('Admin');
            await loginPage.enterPassword('wrongpassword');
            await loginPage.clickLogin();

            // Verify error message is displayed
            await expect(page.locator('.oxd-alert-content')).toBeVisible();
            await expect(page).toHaveURL(/.*login/);
        });

        test('Login with both invalid credentials', async ({ page }) => {
            await loginPage.enterUsername('WrongUser');
            await loginPage.enterPassword('WrongPass123');
            await loginPage.clickLogin();

            // Verify error message and no navigation occurs
            await expect(page.locator('.oxd-alert-content')).toBeVisible();
            await expect(page).toHaveURL(/.*login/);
        });
    });

    // Input Validation Tests
    test.describe('Input Validation Tests', () => {
        test('Login with empty username field', async ({ page }) => {
            // Leave username empty
            await loginPage.enterPassword('admin123');
            await loginPage.clickLogin();

            // Verify validation error for username
            await expect(page.locator('.oxd-input-field-error-message').first()).toBeVisible();
            await expect(page).toHaveURL(/.*login/);
        });

        test('Login with empty password field', async ({ page }) => {
            await loginPage.enterUsername('Admin');
            // Leave password empty
            await loginPage.clickLogin();

            // Verify validation error for password
            await expect(page.locator('.oxd-input-field-error-message')).toBeVisible();
            await expect(page).toHaveURL(/.*login/);
        });

        test('Login with both fields empty', async ({ page }) => {
            // Leave both fields empty
            await loginPage.clickLogin();

            // Verify validation errors for both fields
            await expect(page.locator('.oxd-input-field-error-message')).toHaveCount(2);
            await expect(page).toHaveURL(/.*login/);
        });

        test('Login with whitespace-only username', async ({ page }) => {
            await loginPage.enterUsername('   ');
            await loginPage.enterPassword('admin123');
            await loginPage.clickLogin();

            // Verify error is displayed
            const errorVisible = await page.locator('.oxd-alert-content, .oxd-input-field-error-message').isVisible();
            expect(errorVisible).toBe(true);
        });
    });

    // Security Tests
    test.describe('Security Tests', () => {
        test('Password field masking verification', async ({ page }) => {
            // Verify password field type is 'password'
            const passwordFieldType = await loginPage.passwordInput.getAttribute('type');
            expect(passwordFieldType).toBe('password');

            // Enter text and verify it's masked
            await loginPage.enterPassword('testpassword');
            const value = await loginPage.passwordInput.inputValue();
            expect(value).toBe('testpassword'); // Input value is stored but display is masked
        });

        test('SQL injection attempt in username', async ({ page }) => {
            await loginPage.enterUsername("admin' OR '1'='1");
            await loginPage.enterPassword('anypassword');
            await loginPage.clickLogin();

            // Verify SQL injection is prevented
            await expect(page.locator('.oxd-alert-content')).toBeVisible();
            await expect(page).toHaveURL(/.*login/);
        });

        test('XSS attempt in login fields', async ({ page }) => {
            await loginPage.enterUsername("<script>alert('XSS')</script>");
            await loginPage.enterPassword('admin123');
            await loginPage.clickLogin();

            // Verify XSS script does not execute and error is shown
            await expect(page.locator('.oxd-alert-content')).toBeVisible();
            await expect(page).toHaveURL(/.*login/);
        });
    });

    // UI/UX Tests
    test.describe('UI and UX Tests', () => {
        test('Tab navigation between fields', async ({ page }) => {
            // Focus username field
            await loginPage.usernameInput.focus();
            await expect(loginPage.usernameInput).toBeFocused();

            // Tab to password field
            await page.keyboard.press('Tab');
            await expect(loginPage.passwordInput).toBeFocused();

            // Tab to login button
            await page.keyboard.press('Tab');
            await expect(loginPage.loginButton).toBeFocused();
        });

        test('Enter key submission from password field', async ({ page }) => {
            await loginPage.enterUsername('Admin');
            await loginPage.enterPassword('admin123');
            
            // Press Enter in password field
            await loginPage.passwordInput.press('Enter');

            // Verify form submission and navigation
            await expect(page).toHaveURL(/.*dashboard/);
        });

        test('Error message visibility and clarity', async ({ page }) => {
            await loginPage.enterUsername('InvalidUser');
            await loginPage.enterPassword('wrongpassword');
            await loginPage.clickLogin();

            // Verify error message characteristics
            const errorMessage = page.locator('.oxd-alert-content');
            await expect(errorMessage).toBeVisible();
            
            // Check error message text is descriptive
            const errorText = await errorMessage.textContent();
            expect(errorText).toContain('Invalid credentials');
        });
    });

    // Password Recovery Tests
    test.describe('Password Recovery Tests', () => {
        test('Forgot password link functionality', async ({ page }) => {
            // Verify forgot password link is visible
            await expect(loginPage.link_ForgotPassword).toBeVisible();
            
            await loginPage.clickForgotPassword();

            // Verify navigation to password recovery page
            await expect(page).toHaveURL(/.*requestPasswordResetCode/);
        });

    });

});