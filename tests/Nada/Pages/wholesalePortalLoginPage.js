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
        this.currentURL = 'https://hitch-hei.onrender.com'
        this.emailAddressLabelText = this.page.locator('#email-label')
        this.getMagicLinkbtn = this.page.getByRole('button', { name: 'Get magic link' })
        
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
}
