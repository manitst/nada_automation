import { expect } from '@playwright/test';

export class HomePage {
//export default class HomePage { 
    constructor(page) {
        this.page = page;
        this.homePageURL = 'https://hitch-hei.onrender.com/';
        this.NMLSConsumerAccesslink = this.page.locator('text=NMLS Consumer Access');
        this.privacyLink = this.page.getByRole('link', { name: 'Privacy' , exact: true});
        this.termsLink = this.page.getByRole('link', { name: 'Terms' , exact: true});
        this.licensingLink = this.page.getByRole('link', { name: 'Licensing' , exact: true});
        this.FAQLink = this.page.getByRole('link', { name: 'FAQs' })
        this.FAQHeaderbtn = this.page.getByRole('button', { name: 'FAQs' })
        
        this.wholesalePrtalLoginbtn = this.page.getByRole('link', { name: 'Wholesale Portal Login' })
        this.consumerLoginbtn = this.page.getByRole('link', { name: 'Consumer Login' })
        this.applynowbtn = this.page.getByRole('link', { name: 'Apply' }).first();
        this.FAQVideo = this.page.locator('iframe[title="FAQ Video"]').contentFrame().locator('.ytp-cued-thumbnail-overlay-image');
        this.applynowHerobtn = this.page.getByRole('button', { name: 'Apply Now' }).nth(1);
        this.getStartedbtn = this.page.getByRole('button', { name: 'Get Started' }).first();
        this.getStartedHomeEquitySectionbtn = this.page.getByRole('button', { name: 'Get Started' }).nth(1);
        this.learnMorebtn = this.page.getByRole('button', { name: 'Learn More' });
        this.unlockOfferbtn = this.page.getByRole('button', { name: 'Unlock Offer' })
    }

    async navigateToHomePage() {

        await this.page.goto(this.homePageURL, { waitUntil: 'domcontentloaded' });
        //await this.page.waitForLoadState('networkidle');
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
    async verifyHomePagebtns() {
        await expect(this.applynowHerobtn).toBeVisible();
        await expect(this.getStartedbtn).toBeVisible();
        await expect(this.getStartedHomeEquitySectionbtn).toBeVisible();
        await expect(this.learnMorebtn).toBeVisible();
        await expect(this.unlockOfferbtn).toBeVisible();
    } 
    async verifyClickingFAQbutton() {
        await this.FAQHeaderbtn.click();
        const currentURL = this.page.url();
        expect(currentURL).toContain('#FAQ');
        await this.page.goto(this.homePageURL).maximize;
    }
    async verifyClickingApplyNowbtn() {
        await this.applynowbtn.click();
        const currentURL = this.page.url();
        expect(currentURL).toContain('/apply/contact');
        await this.page.goto(this.homePageURL).maximize;
    }
    async verifyClickingWholesalePortalLoginbtn() {
        await this.wholesalePrtalLoginbtn.click();
        const currentURL = this.page.url();
        expect(currentURL).toContain('/portal');
        await this.page.goto(this.homePageURL).maximize;
    }
    async verifyClickingConsumerLoginbtn() {
        await this.consumerLoginbtn.click();
        const currentURL = this.page.url();
        expect(currentURL).toContain('/apply/login');
        await this.page.goto(this.homePageURL).maximize;
    } 

}
