import { expect } from '@playwright/test';

export class HomePage {

    constructor(page) {
        this.page = page;
        this.homePageURL = 'https://hitch-hei.onrender.com/';
    }
    async navigateToHomePage() {

        await this.page.goto(this.homePageURL, { waitUntil: 'domcontentloaded' });
        await this.page.waitForLoadState('networkidle');
        const element = (this.page.locator('text=Access your Home Equity —'));

        await expect(element).toBeVisible({ timeout: 10000 });

    }

    async verifyHomePage() {


        await expect(this.page.locator('text=Access your Home Equity —')).toBeVisible();
        await expect(this.page.locator('text=Access your Home Equity —')).toHaveText('Access your Home Equity —  No Debt, No Monthly Payments');
    }
    async verifyHomePageLogo() {
        const logo = this.page.locator('[alt="Nada Logo"]');
        await expect(logo).toBeVisible();
    }

}
//module.exports = HomePage;
// Removed redundant export default statement