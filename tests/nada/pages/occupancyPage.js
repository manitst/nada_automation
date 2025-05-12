import { AddressPage } from "./addressPage";

export class OccupancyPage {
    constructor(page) {
        this.page = page;

        this.occupancyTypePrimaryHomerdbtn = page.getByText('Primary Home');
        this.occupancyTypeSecondaryHomerdbtn = page.getByText('Secondary Home');
        this.occupancyTypeInvestmentrdbtn = page.getByText('Investment');
        this.secondaryHomeAddress = page.locator('input[name="address"]');
        this.secondaryHomeAddressDropDown = page.getByText('Jefferson City').nth(1); // Updated selector for secondary home address
        this.investmentHomeAddress = page.locator('input[name="address"]'); // Updated selector for primary home address
        this.investmentHomeAddressDropDown = page.getByText('Washington, MO, USA').nth(1);
        this.nextbtn = page.getByRole('button', { name: 'Next' });
        this.backbtn = page.getByText('Back');
        this.occupancyMenu = page.getByRole('link', { name: 'Occupancy' })
        this.occupancyMenuNumber = page.locator('//*[@id="__next"]/div[1]/div[2]/aside/div[2]/a[6]/div/div');
        this.stepNumber = page.locator('span:has-text("Step 6")');
        this.secondaryHomeAddressError = page.locator('text=Please type in your address and select an option from the list');
        this.investmentHomeAddressError = page.locator('text=Please type in your address and select an option from the list');
    }
    async navigateToOccupancyPage() {
        const addressPage = new AddressPage(this.page);
        await addressPage.navigateToAddressPage();
        await addressPage.enterPropertyAddress('483 Wayne St, Jackson, MO, USA');
        await addressPage.selectTheAddressFromDropdown();
        await addressPage.clickNextButton();
        return this.page.url(); // Return the current URL of the page
    }
    async clickPrimaryHomeRadioButton() {
        await this.occupancyTypePrimaryHomerdbtn.click();
        console.log('Primary Home radio button is clicked');
    }
    async clickSecondaryHomeRadioButton() {
        await this.occupancyTypeSecondaryHomerdbtn.click();
        console.log('Secondary Home radio button is clicked');
    }
    async clickInvestmentRadioButton() {
        await this.occupancyTypeInvestmentrdbtn.click();
        console.log('Investment radio button is clicked');
    }
    async enterSecondaryHomeAddress(address) {
        await this.secondaryHomeAddress.fill(address);
        console.log('Secondary home address is entered');
        await this.secondaryHomeAddressDropDown.click();
        console.log('Secondary home address is selected from dropdown');
    }
    async enterInvestmentHomeAddress(address) {
        await this.investmentHomeAddress.fill(address);
        console.log('Investment home address is entered');
        await this.investmentHomeAddressDropDown.click();
        console.log('Investment home address is selected from dropdown');
    }
    async clickNextButton() {
        //await this.nextbtn.waitFor();
        await this.nextbtn.click();
        console.log('Next button in occupancy page is clicked');
        return this.page.url();
    }
    async triggerSecondaryHomeAddressError() {
        const occupancyPage = new OccupancyPage(this.page);
        await occupancyPage.navigateToOccupancyPage();
        await occupancyPage.clickSecondaryHomeRadioButton();
        await occupancyPage.clickNextButton();
    }
    async triggerInvestmentHomeAddressError() {
        const occupancyPage = new OccupancyPage(this.page);
        await occupancyPage.navigateToOccupancyPage();
        await occupancyPage.clickInvestmentRadioButton();
        await occupancyPage.clickNextButton();
    }

}