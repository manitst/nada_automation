import { expect } from '@playwright/test';
import { HasFBMPage } from './hasFBMPage';

export class AddressPage {
    constructor(page) {
        this.page = page;
        this.propertyAddresstxt = page.getByRole('textbox', { name: 'Property Address' });
        //this.addressDropDown = page.getByText('Wayne StJackson, MO, USA').nth(1); // Updated selector for address dropdown
        this.addressDropDown = page.locator('//html/body/div[5]/div[1]/span[2]/span');
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
        return this.page.url();
    }
    async enterPropertyAddress(address) {
        await this.propertyAddresstxt.fill(address);
    }
    async selectTheAddressFromDropdown() {
        //await this.addressDropDown.waitForLoadState('visible'); 
        //await this.page.waitForTimeout(2000); // Wait for 2 seconds to ensure the dropdown is visible
        //await this.page.waitForSelector('addressDropDown', { state: 'visible' });
        await this.addressDropDown.click({ force: true });
        console.log('Address selected from dropdown');
    }
    async clickNextButton() {
        //await this.nextbtn.waitFor();
        await this.nextbtn.click();
        await this.page.waitForURL('**/occupancy');
        //await this.page.waitForTimeout(2000); 
        //await this.page.waitForNavigation({ waitUntil: 'networkidle' });
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