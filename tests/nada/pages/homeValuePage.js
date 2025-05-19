import { } from '@playwright/test';
import { HomePage } from '../pages/homePage.js';
import { ContactPage } from '../pages/contactPage.js';
import { generateUniqueEmail } from "../utils/commonUtils.js";

export class HomeValuePage {
    constructor(page) {
        this.page = page;
        this.homeValueText = this.page.locator('[id=":ra:"]')
        this.mortgageBalanceText = this.page.getByRole('textbox', { name: 'Enter mortgage balance' })
        this.propertyTypeDropdown = this.page.locator('#buildingType')
        this.propertyTypeDropdownListItem = this.page.locator('[id=":rc:"]')
        this.propertyTypeSingleFamilyHome = this.page.getByRole('option', { name: 'Single Family' })
        this.nextbtn = this.page.getByRole('button', { name: 'Next' });
        this.propertyDetailsMenu = this.page.getByRole('link', { name: 'Property Details' })
        this.propertyDetailsMenuNumber = this.page.locator('//*[@id="__next"]/div[1]/div[2]/aside/div[2]/a[2]/div/div');
        this.stepNumber = this.page.locator('span:has-text("Step 2")');
        this.homeValueTextErrorMessage = this.page.getByText('Home value is required')
        this.mortgageBalanceTextErrorMessage = this.page.getByText('Mortgage balance is required')
        this.propertyTypeDropdownErrorMessage = this.page.getByText('Please select Property type')
        this.backbtn = this.page.getByText('Back');
        //this.logOutbtn = this.page.getByRole('link', { name: 'Log Out' })
        this.logOutbtn = this.page.getByText('Log Out')

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
        console.log('The property Dropdown list item - \n', dropdownOptions[0].split('\n').join('\n'));
        return dropdownOptions;
    }
    async enterHomeValueTxt(homeValue) {
        await this.homeValueText.fill(homeValue);
        console.log('The home value has been entered as ', homeValue);
    }
    async enterMortgageBalanceTxt(mortgageBalance) {
        await this.mortgageBalanceText.fill(mortgageBalance);
        console.log('The Mortgage balance is entered as ', mortgageBalance)
    }
    async selectPropertyTypeSingleFamilyHome() {
        await this.propertyTypeSingleFamilyHome.click();
        console.log('Single Family home is selected from the dropdown');
    }
    async clickNextButton() {
        await this.nextbtn.click();
        await this.page.waitForURL('**/credit-score');
        console.log('The Next button in Home value page is clicked');
    }
    verifyUserdirectedtoFinancialInfoPage() {
        return this.page.url();
    }
    verifyHomeValueTextErrorMessage() {
        this.homeValueTextErrorMessage.waitFor();
        console.log('homeValueTextErrorMessage-', this.homeValueTextErrorMessage)
        return this.homeValueTextErrorMessage.innerText();
    }
    verifyMortgageBalanceTextErrorMessage() {
        this.mortgageBalanceTextErrorMessage.waitFor();
        return this.mortgageBalanceTextErrorMessage.innerText();
    }
    verifyPropertyTypeDropdownErrorMessage() {
        this.propertyTypeDropdownErrorMessage.waitFor();
        return this.propertyTypeDropdownErrorMessage.innerText();
    }
    async clickBackButton() {
        await this.backbtn.click();
        //await this.page.waitForTimeout(2000);
        // await this.page.waitForNavigation();
        return this.page.url();
    }
    verifyUserDirectedToContactPage() {
        return this.page.url();
    }
    async clickLogOutButton() {
        await this.logOutbtn.click();
        await this.page.waitForTimeout(2000);
    }
    verifyUserDirectedToHomePage() {
        return this.page.url();
    }



}