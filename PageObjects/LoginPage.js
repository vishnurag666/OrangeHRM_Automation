export class LoginPage{
    constructor(page){
        this.page = page;
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.link_ForgotPassword = page.getByText('Forgot your password?');
    }

    async enterUsername(username){
        await this.usernameInput.fill(username);
    }
    
    async enterPassword(password){
        await this.passwordInput.fill(password);
    }   

    async clickLogin(){
        await this.loginButton.click();
    }

    async clickForgotPassword(){
        await this.link_ForgotPassword.click();
    }

    
}
