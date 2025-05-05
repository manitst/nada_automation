import {expect} from '@playwright/test';
import { HomeValuePage } from '../pages/homeValuePage.js';



export class FinancialInfoPage {
    constructor(page) {
        this.page = page;
        this.creditscorelessthan500 = this.page.getByRole('radio', { name: 'Under' });
        this.creditscorebtw500and539 = this.page.getByRole('radio', { name: '- 539' })
        this.creditscorebtw540and579 = this.page.getByRole('radio', { name: '- 579' });
        this.creditscorebtwabove580 = this.page.getByRole('radio', { name: '+' });
        this.latePaymentsDetailsYesbtn= this.page.getByRole('radio', { name: 'Yes' });
        this.latePaymentsDetailsNobtn= this.page.getByRole('radio', { name: 'No' }); 
        this.nextbtn = this.page.getByRole('button', { name: 'Next' }); 
        this.backbtn = this.page.getByText('Back');
        this.financialInfoMenu = this.page.getByRole('link', { name: 'Financial Info' })
        this.financialInfoMenuNumber = this.page.locator('//*[@id="__next"]/div[1]/div[2]/aside/div[2]/a[3]/div/div');
        this.stepNumber = this.page.locator('span:has-text("Step 3")');
        this.enterCreditScoreErrorMessage = this.page.getByText('Please select an option for credit score')
        this.latePaymentsDetailsErrorMessage = this.page.getByText('Please select an option for late payments')
        //this.financialInfoMenuHighlight = this.page.locator('selector-for-highlight');

    }
    async navigateToFinancialInfoPage() {
        const homeValuePage = new HomeValuePage(this.page);
        await homeValuePage.navigateToHomeValuePage();
        await homeValuePage.enterHomeValueTxt('500000')
        await homeValuePage.enterMortgageBalanceTxt('20000')
        await homeValuePage.clickpropertyTypeDropdown();    
        await homeValuePage.propertyTypeSingleFamilyHome.click();
        await homeValuePage.clickNextButton();
        await this.page.waitForTimeout(1000);
        return this.page.url();
    }
    async verifyUserdirectedtoFinancialInfoPage() {
        console.log('FinancialInfoPageURL-', this.page.url())
        return this.page.url();
    }
    async clickCreditScoreBtn(creditScore) {
        if (creditScore < 500) {
            await this.creditscorelessthan500.click();
            console.log('Credit score is less than 500');
            return this.creditscorelessthan500;
        } else if (creditScore >= 500 && creditScore <= 539) {
            await this.creditscorebtw500and539.click();
            console.log('Credit score is between 500 and 539');
            return this.creditscorebtw500and539;                    
        } else if (creditScore >= 540 && creditScore <= 579) {
            await this.creditscorebtw540and579.click();
            console.log('Credit score is between 540 and 579');
            return this.creditscorebtw540and579;    
        } else if (creditScore >= 580) {
            await this.creditscorebtwabove580.click();
            console.log('Credit score is equal or above 580');
            return this.creditscorebtwabove580;
        } else {
            throw new Error('Invalid credit score option');
        }
        
    }
    async clickLatePaymentsDetailsNoBtn() {
                await this.latePaymentsDetailsNobtn.click();
    }
    async clickLatePaymentsDetailsYesBtn() {
        await this.latePaymentsDetailsYesbtn.click();
    }
    async clickNextButton() {
        await this.nextbtn.click();
        await this.page.waitForURL('**/has-fbm');
        //await this.page.waitForNavigation({ waitUntil: 'networkidle' });

        }
    async verifyLatePaymentsDetailsYesbtnIsVisible() {
    
        await this.latePaymentsDetailsYesbtn.waitFor();
        return this.latePaymentsDetailsYesbtn;
    }
    async verifyLatePaymentsDetailsNobtnIsVisible() {
        await this.latePaymentsDetailsNobtn.waitFor();
        return this.latePaymentsDetailsNobtn;
    } 
    async verifyUserDirectedToHasFBMPage() {
        const currentURL = this.page.url();
        return currentURL;
    }
    async clickBackButton() {
    await this.backbtn.click();
    await this.page.waitForTimeout(2000);
    }
    async verifyUserdirectedtoHomeValuePage() {
        const currentURL = this.page.url();
        return currentURL;
    }
verifyLatePayementsDetailsErrorMessage() {
    this.latePaymentsDetailsErrorMessage.waitFor();
    return this.latePaymentsDetailsErrorMessage.innerText();
}
verifyEnterCreditScoreErrorMessage() {
    this.enterCreditScoreErrorMessage.waitFor();
    return this.enterCreditScoreErrorMessage.innerText();
}


}