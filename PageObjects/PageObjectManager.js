
import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";
import { AdminPage } from "./AdminPage";
export class PageObjectManager{
    constructor(page){
        this.page = page;
    }

    getLoginPage(){
        return new LoginPage(this.page);
    }

    getDashboardPage(){
        return new DashboardPage(this.page);
    }

    getAdminPage(){
        return new AdminPage(this.page);
    }
}