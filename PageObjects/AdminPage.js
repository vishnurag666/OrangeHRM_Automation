export class AdminPage{

    constructor(page){
        this.page = page;
        this.AdminMenu =  page.getByRole('link', { name: 'Admin' })
        this.userManagementMenu = page.locator('span').filter({ hasText: 'User Management' }).first()
        this.drpdwn_Users=  page.getByText('Users', { exact: true });

        //System users  (Search form)
        this.txtUsername=  page.locator("//div[@class='oxd-input-group oxd-input-field-bottom-space']//div//input[@class='oxd-input oxd-input--active']");
        this.drpdwn_roles= page.locator("/html[1]/body[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[2]/form[1]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/i[1]");
        this.role_Admin= page.locator('div').filter({ hasText: 'Admin' }).first();
        this.role_ESS= page.locator('div').filter({ hasText: 'ESS' }).first();
        
        this.txtEmployeeName= page.getByRole('textbox', { name: 'Type for hints...' })
        this.drpdwn_employee1= page.locator('xpath=(//div[@role= "option"])[1]');

        this.drpdwn_status= page.locator('xpath=//div[4]//div[1]//div[2]//div[1]//div[1]//div[2]//i[1]');
        this.status_Enabled= page.locator('div').filter({ hasText: 'Enabled' }).first();
        this.status_Disabled=  page.getByText('Disabled', { exact: true });

        this.btn_search= page.getByRole('button', { name: 'Search' });
        this.btn_reset= page.getByRole('button', { name: 'Reset' });

        //Add user form
        this.btn_add= page.getByRole('button', { name: 'Add' });

        this.txt_adduser= page.getByRole('heading', { name: 'Add User' });

        this.drpdwn_addRole= page.locator("div[class='oxd-grid-2 orangehrm-full-width-grid'] div:nth-child(1) div:nth-child(1) div:nth-child(2) div:nth-child(1) div:nth-child(1) div:nth-child(2) i:nth-child(1)");
        
        // More specific selectors for Add User form
        this.txtUsername = page.getByRole('textbox').nth(2); // Username field specifically
        this.txt_password= page.getByRole('textbox').nth(3); // Password field specifically  
        this.txt_confirmPassword= page.getByRole('textbox').nth(4); // Confirm password field specifically

        this.btn_save=  page.getByRole('button', { name: 'Save' });
        this.btn_cancel=  page.getByRole('button', { name: 'Cancel' });

    }


    async clickAddButton(){
        await this.btn_add.click();
    }

    async clickAdminMenu(){
        await this.AdminMenu.click();
    }
    
}