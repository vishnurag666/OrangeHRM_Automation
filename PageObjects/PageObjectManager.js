
import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";
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
}