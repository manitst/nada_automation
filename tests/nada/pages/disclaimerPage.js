import { OccupancyPage } from "./occupancyPage";

export class DisclaimerPage {
constructor(page) {
        this.page = page;
        this.dobText = page.getByRole('textbox', { name: 'MM/DD/YYYY' });
        //this.ssnText = page.locator('[id=":r1d:"]');
        this.ssnText = page.getByRole('textbox').nth(1);
        this.disclaimerCheckbox = page.getByRole('checkbox', { name: 'By clicking the "I AGREE"' });
        this.iAgreeButton = page.getByRole('button', { name: 'I AGREE' });
        this.nextbtn = page.getByRole('button', { name: 'Next' });
        this.backbtn = page.getByText('Back');
        this.occupancyMenu = page.getByRole('link', { name: 'Occupancy' })
        this.disclaimerMenuNumber = page.locator('//*[@id="__next"]/div[1]/div[2]/aside/div[2]/a[7]/div/div');
        
        this.stepNumber = page.locator('span:has-text("Step 7")');
        this.disclaimerCheckboxError = page.locator('text=Agree to Terms and Conditions');
    }
async navigateToDisclaimerPage() {
        const occupancyPage = new OccupancyPage(this.page);
        await occupancyPage.navigateToOccupancyPage();
        //await occupancyPage.clickNextButton();
        await occupancyPage.clickPrimaryHomeRadioButton();
        await occupancyPage.clickNextButton();
        await this.page.waitForURL('**/disclaimer'); // Wait for the URL to contain 'disclaimer'
        return this.page.url(); // Return the current URL of the page
    }
async enterDOB(dob) {
        await this.dobText.fill(dob);
        console.log('DOB is entered');
    }
async enterSSN(ssn) {
        //await this.ssnText.clear();
        // await this.page.waitForSelector(this.ssnText, { state: 'visible' });
        await this.ssnText.isVisible();
        // await this.ssnText.fill(ssn);
        await this.ssnText.click();
        await this.ssnText.clear();
        await this.ssnText.pressSequentially(ssn);

        console.log('SSN is entered');
    }
async clickIAgreeButton() {
        await this.iAgreeButton.click();
    }
async clickBack() {
        await this.backbtn.click();
    }
async clickDisclaimerCheckbox() {
        await this.disclaimerCheckbox.click();
        
    }

}
