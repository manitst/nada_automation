import {} from '@playwright/test';
import { HomePage } from '../pages/homePage.js';
import { ContactPage } from '../pages/contactPage.js';
import { generateUniqueEmail } from "../Utils/commonUtils.js";

export class HomeValuePage {
    constructor(page) {
        this.page = page;
        this.homeValueText = this.page.locator('[id=":ra:"]')
        this.mortgageBalanceText = this.page.getByRole('textbox', { name: 'Enter mortgage balance' })
        this.propertyTypeDropdown = this.page.locator('#buildingType')
        this.propertyTypeDropdownListItem = this.page.locator('[id=":rc:"]')
        this.propertyTypeSingleFamilyHome = this.page.getByRole('option', { name: 'Single Family' })
        this.nextbtn = this.page.getByRole('button', { name: 'Next' });
    }
    async navigateToHomeValuePage() {
        const homepage = new HomePage(this.page);
        const contactpage = new ContactPage(this.page)

        await homepage.navigateToHomePage();
        await contactpage.clickApplyNowButton();
        await contactpage.enterFirstname('Test')
        await contactpage.enterLastname('Automation')
        await contactpage.enterEmail(generateUniqueEmail())
        await contactpage.enterPhonenumber('1234567890')
        await contactpage.clickHomeSharePgmbtn()
        await contactpage.clickNextButton();
        await this.page.waitForTimeout(1000);
       
    }

    async clickpropertyTypeDropdown() {
        await this.propertyTypeDropdown.click();
    }   
    async getTheDropdownValue() {
        
        const dropdownOptions = await this.propertyTypeDropdownListItem.allInnerTexts();
        console.log(dropdownOptions[0].split('\n').join('\n'));
        return dropdownOptions;
    }
    async enterHomeValueTxt(homeValue) {
        await this.homeValueText.fill(homeValue);
    }   
    async enterMortgageBalanceTxt(mortgageBalance) {
        await this.mortgageBalanceText.fill(mortgageBalance);
    }
    async selectPropertyTypeSingleFamilyHome() {
        await this.propertyTypeSingleFamilyHome.click();
    }
    async clickNextButton() {
        await this.nextbtn.click();
        await this.page.waitForTimeout(2000);
    }
    verifyUserdirectedtoFinancialInfoPage() {
        return this.page.url();
    }


}