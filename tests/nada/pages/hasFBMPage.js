import { expect } from '@playwright/test';
import { FinancialInfoPage } from './financialInfoPage.js';


export class HasFBMPage {
    constructor(page) {
        this.page = page;
        this.foreclosureYesbtn = page.locator('div').filter({ hasText: /^Did you have any foreclosures in the last 4 years\?YesNo$/ }).getByLabel('Yes');
        this.foreclosureNobtn = page.locator('div').filter({ hasText: /^Did you have any foreclosures in the last 4 years\?YesNo$/ }).getByLabel('No');
        this.bankruptcyYesbtn = page.locator('div').filter({ hasText: /^Did you file for bankruptcy in the last 4 years\?YesNo$/ }).getByLabel('Yes');
        this.bankruptcyNobtn = page.locator('div').filter({ hasText: /^Did you file for bankruptcy in the last 4 years\?YesNo$/ }).getByLabel('No');
        this.modificationYesbtn = page.locator('div').filter({ hasText: /^Did you make any modifications to the property in the last 4 years\?YesNo$/ }).getByLabel('Yes');
        this.modificationNobtn = page.locator('div').filter({ hasText: /^Did you make any modifications to the property in the last 4 years\?YesNo$/ }).getByLabel('No')
        this.nextbtn = page.getByRole('button', { name: 'Next' })
        this.popupMessage = page.getByText('Unfortunately, our automated system couldn’t process your application.');
        this.backbtn = page.getByText('Back');
        this.hasFBMMenu = page.getByRole('link', { name: 'Has FBM' })
        this.hasFBMMenuNumber = page.locator('//*[@id="__next"]/div[1]/div[2]/aside/div[2]/a[4]/div/div');
        this.stepNumber = page.locator('span:has-text("Step 4")');
        this.foreclosureErrorMessage = page.getByText('Please select an option for foreclosures')
        this.bankruptcyErrorMessage = page.getByText('Please select an option for bankruptcy')
        this.modificationErrorMessage = page.getByText('Please select an option for modifications')
    }
    async navigateToHasFBMPage() {
        const financialInfoPage = new FinancialInfoPage(this.page);
        await financialInfoPage.navigateToFinancialInfoPage();
        await financialInfoPage.clickCreditScoreBtn('600');
        await financialInfoPage.clickLatePaymentsDetailsNoBtn();
        await financialInfoPage.clickNextButton();// Return the current URL of the page
        return this.page.url(); // Return the current URL of the page
    }

    async clickForeclosureYesbtn() {
        await this.foreclosureYesbtn.click();
        console.log('Foreclosure YES radio button is checked');
    }
    async clickForeclosureNobtn() {
        await this.foreclosureNobtn.click();
        console.log('Foreclosure NO radio button is checked');
    }
    async clickBankruptcyYesbtn() {
        await this.bankruptcyYesbtn.click();
        console.log('Bankruptcy YES radio button is checked');
    }
    async clickBankruptcyNobtn() {
        await this.bankruptcyNobtn.click();
        console.log('Bankruptcy NO radio button is checked');
    }
    async clickModificationYesbtn() {
        await this.modificationYesbtn.click();
        console.log('Modification YES radio button is checked');
    }
    async clickModificationNobtn() {
        await this.modificationNobtn.click();
        console.log('Modification NO radio button is checked');
    }
    async clickNextButton() {
        await this.nextbtn.click();
        //await this.page.waitForNavigation({ waitUntil: 'networkidle' });
        console.log('Next button in has FBM page is clicked');
        return this.page.url();
    }
    verifyUsergetsPopupMessage() {
        this.popupMessage.waitFor({ state: 'visible' });
        console.log('Popup message is displayed:');
        return this.popupMessage;
    }
    async clickBackButton() {
        await this.backbtn.click();
        console.log('Back button in has FBM page is clicked');
    }
    async verifyUserdirectedtoFinancialInfoPage() {
        console.log('User is directed to Financial Info Page', this.page.url())
        return this.page.url();
    }
    verifyforeclosureErrorMessageIsDisplayed() {
        this.foreclosureErrorMessage.waitFor({ state: 'visible' });
        console.log('Foreclosure error message is displayed:', this.foreclosureErrorMessage);
        return this.foreclosureErrorMessage;
    }
    verifybankruptcyErrorMessageIsDisplayed() {
        this.bankruptcyErrorMessage.waitFor({ state: 'visible' });
        console.log('Bankruptcy error message is displayed:', this.bankruptcyErrorMessage);
        return this.bankruptcyErrorMessage;
    }
    verifymodificationErrorMessageIsDisplayed() {
        this.modificationErrorMessage.waitFor({ state: 'visible' });
        console.log('Modification error message is displayed:', this.modificationErrorMessage);
        return this.modificationErrorMessage;
    }


}
