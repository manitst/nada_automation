import { expect } from '@playwright/test';

export class HomePage {
     
    constructor(page) {
        this.page = page;
        this.homePageURL = 'https://hitch-hei.onrender.com/';
        this.homePageHeroText = this.page.locator('text=Access your Home Equity —  No Debt, No Monthly Payments');
        this.homePageLogo = this.page.locator('[alt="Nada Logo"]');
        this.NMLSConsumerAccesslink = this.page.locator('text=NMLS Consumer Access');
        this.privacyLink = this.page.getByRole('link', { name: 'Privacy', exact: true });
        this.termsLink = this.page.getByRole('link', { name: 'Terms', exact: true });
        this.licensingLink = this.page.getByRole('link', { name: 'Licensing', exact: true });
        this.FAQLink = this.page.getByRole('link', { name: 'FAQs' })
        //this.FAQHeaderbtn = this.page.getByRole('button', { name: 'FAQs' })
        this.FAQHeaderbtn = this.page.getByRole('link', { name: 'FAQs' })
        //this.FAQHeaderbtn = this.page.locator('[id=":r0:"]');
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
    }
    verifyHomePageVisible() {
        this.homePageHeroText.waitFor();
        return this.homePageHeroText;

    }

    verifyHomePageLogo() {
        this.homePageLogo.waitFor();
        return this.homePageLogo;

    }
    verifyNMLSConsumerAccessLink() {

        this.NMLSConsumerAccesslink.waitFor();
        return this.NMLSConsumerAccesslink;
    }
    verifyPrivacyLink() {
        this.privacyLink.waitFor();
        return this.privacyLink;
    }
    verifyTermsLink() {
        this.termsLink.waitFor();
        return this.termsLink;
    }

    verifyLicensingLink() {
        this.licensingLink.waitFor();
        return this.licensingLink;
    }
    
    verifyHeaderFAQbtn() {
        this.FAQHeaderbtn.waitFor();
        this.FAQHeaderbtn.isVisible();
        return this.FAQHeaderbtn;        
    }
    verifyHeaderWholesalePortalLoginbtn() {
        this.wholesalePrtalLoginbtn.waitFor();
        return this.wholesalePrtalLoginbtn;
    }
    verifyHeaderConsumerLoginbtn() {
        this.consumerLoginbtn.waitFor();
        return this.consumerLoginbtn;
    }   
    verifyHeaderApplyNowbtn() {
        this.applynowbtn.waitFor();
        return this.applynowbtn;
    }      
   
    verifyFAQVideoIsPresent() {
        this.FAQVideo.waitFor({ state: 'visible' });
        return this.FAQVideo;

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

        await pauseButton.click({ force: true }); 
    }
    verifyHomePageApplyNowbtn() {
        this.applynowHerobtn.waitFor();
        return this.applynowHerobtn;
    }
    verifyHomePageGetStartedbtn() {
        this.getStartedbtn.waitFor();
        return this.getStartedbtn;
    }
    verifyHomePageGetStartedHomeEquitySectionbtn() {
        this.getStartedHomeEquitySectionbtn.waitFor();
        return this.getStartedHomeEquitySectionbtn;
    }
    verifyHomePageLearnMorebtn() {
        this.learnMorebtn.waitFor();
        return this.learnMorebtn;
    }
    verifyHomePageUnlockOfferbtn() {
        this.unlockOfferbtn.waitFor();
        return this.unlockOfferbtn;
    }
    async verifyClickingFAQbutton() {
        
        await this.FAQHeaderbtn.click();
        const currentURL = this.page.url();
        expect(currentURL).toContain('#FAQ');
        await this.page.goto(this.homePageURL);
    }

   
  
    async verifyClickingWholesalePortalLoginbtn() {
        await this.wholesalePrtalLoginbtn.click();
        const currentURL = this.page.url();
        expect(currentURL).toContain('/portal');
        await this.page.goto(this.homePageURL);
    }
    async verifyClickingConsumerLoginbtn() {
        await this.consumerLoginbtn.click();
        const currentURL = this.page.url();
        expect(currentURL).toContain('/apply/login');
        await this.page.goto(this.homePageURL);
    }
    async verifyClickingApplyNowbtn() {
        await this.applynowbtn.click();
        const currentURL = this.page.url();
        expect(currentURL).toContain('/apply/contact');
        await this.page.goto(this.homePageURL);
    }

}
