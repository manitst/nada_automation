import {test,expect} from '@playwright/test';

export class FAQsPage {
    constructor(page) {
        this.page = page;
        this.faqsPageURL = 'https://hitch-hei.onrender.com/#FAQ';
        this.FAQLink = this.page.getByRole('link', { name: 'FAQs' })
        this.FAQsectionText = this.page.locator('text=Your Questions');
        this.FAQsectionQuestion1 = this.page.locator('#panel0-header');
        //this.FAQPlusIcon = this.page.locator('[data-testid="AddIcon"]');
        this.FAQPlusIcon = this.page.getByRole('button', { name: 'What is the Homeshares program?' })
    }
    async navigateToFAQs() {
        await this.page.goto(this.faqsPageURL, { waitUntil: 'domcontentloaded' });
    
    }
    async getFAQsHeader() {
        //const faqsHeader = this.FAQsectionText
        await this.FAQsectionText.waitFor({ state: 'visible' });
        return this.FAQsectionText;
    }
    verifyFAQsSectionQuestion1() {
        this.FAQsectionQuestion1.waitFor({ state: 'visible' });
        return this.FAQsectionQuestion1;
    }
    async verifyUserExpandsFAQsSectionQuestion1() {

       await this.FAQsectionQuestion1.click();
        return this.FAQsectionQuestion1;
    }
    async verifyFAQsQuestionExpandable() {
        await this.FAQPlusIcon.waitFor({ state: 'visible' });
        await this.FAQPlusIcon.click();
        return this.FAQPlusIcon;
    }
}
