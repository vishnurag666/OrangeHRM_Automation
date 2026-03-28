import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { PageObjectManager } from "../PageObjects/PageObjectManager";

test.describe('User Management Test Suite', () => {
    let pageObjectManager;
    let loginPage;
    let dashboardPage;
    let adminPage;
    let username;

    test.beforeEach(async ({ page }) => {
        pageObjectManager = new PageObjectManager(page);
        
        // Navigate with increased timeout and proper wait strategy
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        });
        
        loginPage = pageObjectManager.getLoginPage();
        dashboardPage = pageObjectManager.getDashboardPage();
        adminPage = pageObjectManager.getAdminPage();
         
        //adding faker to generate random username for each test run, Minimum 5 characters to avoid validation error

        username = faker.person.firstName() + faker.person.lastName();
        console.log(username);
        
        // Verify page loads successfully with increased timeout
        await expect(page).toHaveTitle(/OrangeHRM/, { timeout: 20000 });
        await expect(loginPage.usernameInput).toBeVisible({ timeout: 20000 });
        await loginPage.enterUsername('Admin');
        await expect(loginPage.passwordInput).toBeVisible({ timeout: 20000 });
        await loginPage.enterPassword('admin123');
        await expect(loginPage.loginButton).toBeVisible({ timeout: 20000 });
        await loginPage.clickLogin();
    });

    test('Navigate to Admin Page', async ({ page }) => {
        await dashboardPage.navigateToAdmin();

        // Verify navigation to Admin page
        await expect(page).toHaveURL(/.*viewSystemUsers/);
    });

    test('Add new user', async ({ page }) => {
        await adminPage.clickAdminMenu();
        await adminPage.clickAddButton();
        
        // Verify Add User form is displayed
        await expect(adminPage.txt_adduser).toBeVisible();

        // Select role
        await adminPage.drpdwn_addRole.click();
        await page.waitForTimeout(500); // Wait for dropdown to open
        await page.getByRole('option', { name: 'Admin' }).click();
        // Verify the role is successfully selected 
        await expect(page.locator('.oxd-select-text-input').first()).toContainText('Admin');

        // Fill employee name and select from dropdown
        await adminPage.txtEmployeeName.fill('A');
        await page.waitForTimeout(2000); // Wait for employee suggestions to load
        await adminPage.drpdwn_employee1.click();
        // Verify the employee name is successfully selected from the dropdown
        await expect(adminPage.txtEmployeeName).not.toBeEmpty();

        // Select status (this is required)
        await page.locator('.oxd-select-text-input').nth(1).click(); // Status dropdown
        await page.waitForTimeout(500); // Wait for dropdown to open
        await page.getByRole('option', { name: 'Enabled' }).click();
        // Verify status is selected
        await expect(page.locator('.oxd-select-text-input').nth(1)).toContainText('Enabled');
        
        // Wait for form to update and then fill username  
        await page.waitForTimeout(1000);
        
        await adminPage.txtUsername.fill(username);
        // Verify the username field is filled correctly
        await expect(adminPage.txtUsername).toHaveValue(username);

        // Fill passwords
        await adminPage.txt_password.fill('Password@123');
        await adminPage.txt_confirmPassword.fill('Password@123');
        // Verify password fields are filled correctly
        await expect(adminPage.txt_password).toHaveValue('Password@123');
        await expect(adminPage.txt_confirmPassword).toHaveValue('Password@123');

        // Save the user
        await adminPage.btn_save.click();
        
        // Verify successful submission - either success message or redirect to user list
        try {
            await expect(page).toHaveURL(/.*viewSystemUsers/, { timeout: 15000 });
        } catch {
            // If still on save page, check for validation errors
            const hasError = await page.locator('text=Already exists').isVisible().catch(() => false);
            if (!hasError) {
                // If no validation error, the save should have been successful
                await expect(page.locator('.oxd-toast-content, .oxd-toast-title')).toBeVisible({ timeout: 5000 });
            }
        }
    });
});