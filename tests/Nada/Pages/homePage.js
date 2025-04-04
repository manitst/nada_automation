import { expect } from '@playwright/test';

export class HomePage {

    constructor(page) {
        this.page = page;
        this.homePageURL = 'https://hitch-hei.onrender.com/';
        this.NMLSConsumerAccesslink = this.page.locator('text=NMLS Consumer Access');
        this.privacyLink = this.page.locator('text=Privacy');
        this.termsLink = this.page.locator('text=Terms');
        this.licensingLink = this.page.locator('text=Licensing');
        this.FAQLink = this.page.getByRole('link', { name: 'FAQs' })
        this.wholesalePrtalLoginbtn = this.page.getByRole('link', { name: 'Wholesale Portal Login' })
        this.consumerLoginbtn = this.page.getByRole('link', { name: 'Consumer Login' })
        this.applynowbtn = this.page.getByRole('link', { name: 'Apply' }).first();
        this.FAQVideo = this.page.locator('iframe[title="FAQ Video"]').contentFrame().locator('.ytp-cued-thumbnail-overlay-image');
    }

    async navigateToHomePage() {

        await this.page.goto(this.homePageURL, { waitUntil: 'domcontentloaded' }).maximize;
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
    async verifyNMLSConsumerAccessLink() {
        const linkText = await this.NMLSConsumerAccesslink.getAttribute('href');
        expect(linkText).toBe('https://www.nmlsconsumeraccess.org');
    }
    async verifyPrivacyLink() {
        const linkText = await this.privacyLink.getAttribute('href');
        expect(linkText).toBe('https://www.nmlsconsumeraccess.org');
    }
    async verifyTermsLink() {
        const linkText = await this.termsLink.getAttribute('href');
        expect(linkText).toBe('https://www.nmlsconsumeraccess.org');
    }
    async verifyLicensingLink() {
        const linkText = await this.licensingLink.getAttribute('href');
        expect(linkText).toBe('https://www.nmlsconsumeraccess.org');
    }
    async verifyHeaderFAQlink() {
        const linkText = await this.FAQLink.getAttribute('href');
        expect(linkText).toBe('/#FAQ');
    }
     async verifyHeaderWholesalePortalLoginbtn() {
        const linkText = await this.wholesalePrtalLoginbtn.getAttribute('href');
        expect(linkText).toBe('/portal');
    }
    async verifyHeaderConsumerLoginbtn() {
        const linkText = await this.consumerLoginbtn.getAttribute('href');
        expect(linkText).toBe('/apply/login');
    }
    async verifyHeaderApplyNowbtn() {
        const linkText = await this.applynowbtn.getAttribute('href');
        expect(linkText).toBe('/apply/contact');
    }
     async verifyFAQVideoIsPresent() {
         await expect(this.FAQVideo).toBeVisible();
         
    }
      async verifyFAQVideoPlay() {
        
            const frame = await this.page.frameLocator('iframe[title="FAQ Video"]'); 
            const playButton = await frame.getByRole('button', { name: 'Play' });
            const pauseButton = await frame.getByRole('button', { name: 'Pause keyboard shortcut k' });
            const video = await frame.locator('video'); 
          
            await playButton.click({ force: true });
            await this.page.waitForTimeout(4000); 
          
            
            const initialTime = await video.evaluate((vid) => vid.currentTime);
            await this.page.waitForTimeout(1000);
            const currentTime = await video.evaluate((vid) => vid.currentTime);
          
            expect(currentTime).toBeGreaterThan(initialTime);
          
            await pauseButton.click({ force: true }); // Pause the video if needed.
          }

}
