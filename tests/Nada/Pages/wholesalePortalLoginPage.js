import { expect } from '@playwright/test';

export class WholesalePortalLoginPage {
    constructor(page) {    
        this.page = page;
        this.currentURL = 'https://hitch-hei.onrender.com'
        this.wholesalePortalLoginPageURL = 'https://hitch-hei.onrender.com/portal/login';
        this.wholesalePortalLoginbtn = this.page.getByRole('link', { name: 'Wholesale Portal Login' })
        this.enterEmailText = this.page.getByRole('textbox', { name: 'Email Address' })
        this.submitbtn = this.page.getByRole('button', { name: 'Submit' })
        this.successMessagePopup = this.page.locator('text=A magic link has been sent to your inbox')
        this.emailAddressLabelText = this.page.locator('#email-label')
        this.getMagicLinkbtn = this.page.getByRole('button', { name: 'Get magic link' })
        this.errorMessageText = this.page.locator('[id="email-helper-text"]');
        this.errorMessage = this.page.locator('text=User not found')
        this.enterEmailAddress = this.page.locator('#login') 
        this.inboxMessage = this.page.getByText('This inbox is empty')
        this.inboxFirstMessage = this.page.locator('.m').nth(0);
        //this.inboxFirstMessage = this.page.locator('.m').first();
        this.magicLinkSignInbtn = this.page.locator('iframe[name="ifmail"]').contentFrame().getByRole('link', { name: 'Sign in' })
        
        this.loginWithPasswordInsteadLink = this.page.getByText('Login with password instead',{exact : false})
        this.loginWithMagicLinkInsteadlnk = this.page.getByText('Login with magic link instead',{exact : false})
        this.emailAddressText = this.page.getByRole('textbox', { name: 'Email Address' })
        this.passwordText = this.page.locator('#password-label')
        this.loginbtn = this.page.locator('[id=":R4n6km6:"]')
        this.passwordTogglebtn = this.page.getByRole('button', { name: 'toggle password visibility' })
        this.passwordToggleText = this.page.locator('#password')
        this.errorMessageInPortalLogin = this.page.locator('[id="password-helper-text"]') 
        
    }
    async navigateToWholesalePortalLoginPage()
    {
        await this.page.goto(this.currentURL, { waitUntil: 'domcontentloaded' });
        await this.wholesalePortalLoginbtn.click(); 
    }
    async verifyUserDirectsToWholesalePortalLoginPage() {
        await expect(this.page).toHaveURL('https://hitch-hei.onrender.com/portal/login');
    }
    async verifyEnterEmailPlaceHolderText() {
        //const placeHolderText = await this.page.getByRole('textbox',{name: 'Enter email'}).getAttribute('id');
        const placeHolderText = await this.emailAddressLabelText.getAttribute('id');
        expect(placeHolderText).toBe('email-label');
    }
    async enterEmail(email) {
        await this.enterEmailText.fill(email);
        expect(this.getMagicLinkbtn).toBeVisible();          
    } 
    async verifyErrorMessage() {
        await this.getMagicLinkbtn.click();
        
        //await expect(this.page.locator('text=User not found')).toBeVisible();
        await expect(this.errorMessage).toBeVisible();
        return this.errorMessage; 
    }
    verifyWithoutEmailAddress() {
        this.enterEmailText.fill('');  
        this.getMagicLinkbtn.click();
        return this.errorMessageText;
    }
    verifyUserDoesNotGetMagicLink() {
        this.page.goto('https://yopmail.com/en/',{ waitUntil: 'domcontentloaded'});
        this.enterEmailAddress.fill('unregistered_user@yopmail.com'); 
        this.page.getByRole('button', { name: '' }).click();
        return this.inboxMessage;
    }
    verifyUserGetsRedirectedToHomePage() {
        //this.page.waitForTimeout(2000); 
        this.page.goto('https://yopmail.com/en/',{ waitUntil: 'domcontentloaded'});
        this.page.waitForTimeout(2000);
        this.enterEmailAddress.fill('test_nada_consumer_login@yopmail.com'); 
        this.page.getByRole('button', { name: '' }).waitFor({ state: 'visible' });
        this.page.getByRole('button', { name: '' }).click();
        this.inboxFirstMessage.click();
        this.magicLinkSignInbtn.click();
        return this.page.url(); 
    }
    async clickLoginWithPassword()
    {
        await this.loginWithPasswordInsteadLink.waitFor({ state: 'visible' });
        await this.loginWithPasswordInsteadLink.click();
        await this.page.waitForTimeout(3000);
        
    }
    async enterEmailAddressText(email) {
        await this.emailAddressText.waitFor({ state: 'visible' });
        await this.emailAddressText.fill(email); 
        
    }
    async enterPassword(password) {
        await this.passwordText.waitFor({ state: 'visible' });
        await this.passwordText.fill(password); 
    }
    async clickLoginbtn() {
        await this.loginbtn.waitFor({ state: 'visible' });
        await this.loginbtn.click(); 
        await this.page.waitForTimeout(2000);
    }
    async verifyUserDirectedToPortal()
    {
        //this.page.waitForTimeout(3000);
        await this.page.waitForLoadState('domcontentloaded');
        const currentPageURL = await this.page.url(); 
        return currentPageURL; 
    }
    async togglePasswordVisibilityOn()
    {
        await this.passwordToggleText.waitFor({ state: 'visible' });
        await this.passwordTogglebtn.click();
        return this.passwordToggleText;
        //await expect(this.passwordToggleText).toHaveAttribute('type', 'text');
        //await this.passwordTogglebtn.click();
        //await expect(this.passwordToggleText).toHaveAttribute('type', 'password');    
    }
    async togglePasswordVisibilityOff()
    {
        await this.passwordToggleText.waitFor({ state: 'visible' });
        await this.passwordTogglebtn.click();
        return this.passwordToggleText;
     }
     async clickLoginWithMagicLinkInstead() {
        await this.loginWithMagicLinkInsteadlnk.waitFor({ state: 'visible' });
        await this.loginWithMagicLinkInsteadlnk.click();
        return this.getMagicLinkbtn;
    }


}