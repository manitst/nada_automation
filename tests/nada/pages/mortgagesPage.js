import { DisclaimerPage } from "./disclaimerPage";
import { OccupancyPage } from "./occupancyPage";

export class MortgagesPage {
    constructor(page) {
        this.page = page;
        this.lenderJPMorganChkbox = page.getByRole('row', { name: 'JP MORGAN 01/2015 $' }).getByLabel('')
        this.noExistingMortgageChkbox = page.getByRole('checkbox', { name: 'No existing mortgage for this' });
        this.nextbtn = page.getByRole('button', { name: 'Next' });
        this.backbtn = page.getByText('Back');
        this.disclaimerMenuNumber = page.locator('//*[@id="__next"]/div[1]/div[2]/aside/div[2]/a[7]/div/div');
    }

async navigateToMortgagesPage() {
        const disclaimerPage = new DisclaimerPage(this.page);
        await disclaimerPage.navigateToDisclaimerPage();
        await disclaimerPage.enterDOB('01/01/1962');
        await disclaimerPage.clickDisclaimerCheckbox();
        await disclaimerPage.clickIAgreeButton();
        await this.page.waitForURL('**/mortgages'); // Wait for the URL to contain 'mortgages'
        return this.page.url(); // Return the current URL of the page
    }
async clickLenderJPMorganChkbox() {
        await this.lenderJPMorganChkbox.click();
        console.log('JP Morgan checkbox checked');
    }
async clickNoExistingMortgage()
{
    await this.noExistingMortgageChkbox.click();
}
async clickNextButton() {
        await this.nextbtn.click();
        console.log('Next button in mortgages pages is clicked');
        await this.page.waitForURL('**/offer-preview'); // Wait for the URL to contain 'offer-preview'
        return this.page.url(); 
    }

}