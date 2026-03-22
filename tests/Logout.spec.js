import { expect, test } from "playwright/test";
import { PageObjectManager } from "../PageObjects/PageObjectManager";

test.describe('Logout Test Suite', () => {
    let pageObjectManager;

    test.beforeEach(async ({ page }) => {
        pageObjectManager = new PageObjectManager(page);
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        
        // Perform login to access dashboard
        const loginPage = pageObjectManager.getLoginPage();
        await loginPage.enterUsername('Admin');
        await loginPage.enterPassword('admin123');
        await loginPage.clickLogin();

        // Verify successful navigation to dashboard
        await expect(page).toHaveURL(/.*dashboard/);
       
    });

    test('Successful logout', async ({ page }) => {
        const dashboardPage = pageObjectManager.getDashboardPage();
        // verify profile menu is visible
        await expect(dashboardPage.drpdwn_UserMenu).toBeVisible();

        // Open user menu and click logout
        await dashboardPage.openUserMenu();
        await dashboardPage.clickLogout();

        // Verify redirection to login page
        await expect(page).toHaveURL(/.*login/);
    });
});