import {expect} from '@playwright/test';
import { HasFBMPage } from './hasFBMPage';

export class AddressPage {
    constructor(page) {
        this.page = page;
        this.propertyAddresstxt = page.getByRole('textbox', { name: 'Property Address' });
        this.addressDropDown = page.getByText('Wayne StJackson, MO, USA');
        this.nextbtn = page.getByRole('button', { name: 'Next' });
        this.addressErrorMessage = page.getByText('Please type in your address and select an option from the list');
        this.backbtn = page.getByText('Back');
        this.addressMenu = page.getByRole('link', { name: 'Address' })
        this.addressMenuNumber = page.locator('//*[@id="__next"]/div[1]/div[2]/aside/div[2]/a[5]/div/div');
        this.stepNumber = page.locator('span:has-text("Step 5")');
        

        
        
    }
async navigateToAddressPage() {
    const hasFBMPage = new HasFBMPage(this.page);
    await hasFBMPage.navigateToHasFBMPage();
    await hasFBMPage.clickForeclosureNobtn();
    await hasFBMPage.clickBankruptcyNobtn();
    await hasFBMPage.clickModificationNobtn();
    await hasFBMPage.clickNextButton();
    return this.page.url(); // Return the current URL of the page
    }
async enterPropertyAddress(address) {
    await this.propertyAddresstxt.fill(address);
}
async selectTheAddressFromDropdown() {
    await this.addressDropDown.waitFor();
    await this.addressDropDown.click();
    console.log('Address selected from dropdown');
}
async clickNextButton() {
    await this.nextbtn.click();
    await this.page.waitForNavigation();
    console.log('Next button in address page is clicked');
    return this.page.url();
}
async getErrorMessage() {
    const errorMessage = await this.addressErrorMessage.innerText();
    return errorMessage;
}
async clickBackButton() {
    await this.backbtn.click();
    console.log('Back button in address page is clicked');
    return this.page.url(); // Return the current URL of the page
}
}