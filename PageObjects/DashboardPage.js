
export class DashboardPage{
    constructor(page){
        this.page = page;
        this.drpdwn_UserMenu = page.locator('i.oxd-icon.bi-caret-down-fill.oxd-userdropdown-icon');
        this.btn_about= page.getByRole('menuitem', { name: 'About' });
        this.btn_support= page.getByRole('menuitem', { name: 'Support' });
        this.btn_changePassword= page.getByRole('menuitem', { name: 'Change Password' });
        this.btn_logout= page.getByRole('menuitem', { name: 'Logout' });

        this.text_search= page.getByRole('textbox', { name: 'Search' });
        this.btn_Admnin = page.getByRole('link', { name: 'Admin' });
        this.btn_PIM = page.getByRole('link', { name: 'PIM' });
        this.btn_Leave = page.getByRole('link', { name: 'Leave' });
        this.btn_Time = page.getByRole('link', { name: 'Time' });
        this.btn_Recruitment = page.getByRole('link', { name: 'Recruitment' });
        this.btn_MyInfo = page.getByRole('link', { name: 'My Info' });
        this.btn_Performance = page.getByRole('link', { name: 'Performance' });
        this.btn_Dashboard = page.getByRole('link', { name: 'Dashboard' });
        this.btn_Directory = page.getByRole('link', { name: 'Directory' });
        this.btn_Maintenance = page.getByRole('link', { name: 'Maintenance' });
        this.btn_Buzz = page.getByRole('link', { name: 'Buzz' });
    }

    async openUserMenu(){
        await this.drpdwn_UserMenu.click();
    }

    async clickAbout(){
        await this.btn_about.click();
    }

    async clickSupport(){
        await this.btn_support.click();
    }

    async clickChangePassword(){
        await this.btn_changePassword.click();
    }

    async clickLogout(){
        await this.btn_logout.click();
    }

    async searchFor(term){
        await this.text_search.fill(term);
        await this.text_search.press('Enter');
    }

    async navigateToAdmin(){
        await this.btn_Admnin.click();
    }

    async navigateToPIM(){
        await this.btn_PIM.click();
    }

    async navigateToLeave(){
        await this.btn_Leave.click();
    }

    async navigateToTime(){
        await this.btn_Time.click();
    }

    async navigateToRecruitment(){
        await this.btn_Recruitment.click();
    }

    async navigateToMyInfo(){
        await this.btn_MyInfo.click();
    }

    async navigateToPerformance(){
        await this.btn_Performance.click();
    }

    async navigateToDashboard(){
        await this.btn_Dashboard.click();
    }

    async navigateToDirectory(){
        await this.btn_Directory.click();
    }

    async navigateToMaintenance(){
        await this.btn_Maintenance.click();
    }

    async navigateToBuzz(){
        await this.btn_Buzz.click();
    } 
    
    
    
}