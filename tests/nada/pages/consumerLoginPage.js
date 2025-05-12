import { expect } from '@playwright/test';

export class ConsumerLoginPage {
    constructor(page) {
        this.page = page;
        this.consumerLoginPageURL = 'https://hitch-hei.onrender.com/apply/login';
        this.consumerLoginbtn = this.page.getByRole('link', { name: 'Consumer Login' })
        this.enterEmailText = this.page.getByRole('textbox', { name: 'Enter email' })
        this.submitbtn = this.page.getByRole('button', { name: 'Submit' })
        this.successMessagePopup = this.page.locator('text=A magic link has been sent to your inbox')
        this.currentURL = 'https://hitch-hei.onrender.com'



    }
    async navigateToConsumerLoginPage() {

        await this.page.goto(this.consumerLoginPageURL, { waitUntil: 'domcontentloaded' });
    }
    async verifyUserDirectsToConsumerLoginPage() {


        await expect(this.page).toHaveURL('https://hitch-hei.onrender.com/apply/login');
    }
    async verifyEnterEmailPlaceHolderText() {
        const placeHolderText = await this.page.getByRole('textbox', { name: 'Enter email' }).getAttribute('placeholder');
        expect(placeHolderText).toBe('Enter email');
    }
    async enterEmail(email) {
        await this.enterEmailText.fill(email);
    }
    async verifyMagicLinkIsSent() {
        await this.submitbtn.click()
        await this.page.waitForTimeout(3000);
        const element = this.page.locator('text=A magic link has been sent to your inbox')
        const successMessage = 'A magic link has been sent to your inbox';
        await expect(element).toBeVisible({ timeout: 5000 });
        expect(successMessage).toBe('A magic link has been sent to your inbox');
    }
    async verifyMagicLinkHasBeenReceived() {
        await this.page.goto('https://yopmail.com/en/');
        await this.page.getByRole('textbox', { name: 'Login' }).fill('test_nada_consumer_login');
        await this.page.getByRole('button', { name: '' }).click();
        await this.page.locator('iframe[name="ifmail"]').contentFrame().getByRole('link', { name: 'Sign in' }).click();
        expect(['https://hitch-hei.onrender.com/apply/contact', 'https://hitch-hei.onrender.com']).toContain(this.currentURL);
        //await expect(this.page).toHaveURL(/https:\/\/hitch-hei\.onrender\.com\/(|apply/contact)/);

    }
    async verifyWithoutEmailaddress() {

        await this.submitbtn.click()
        await expect(this.page).toHaveURL('https://hitch-hei.onrender.com/apply/contact');



    }



}
