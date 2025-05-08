import { OfferPreviewPage } from "./offerPreviewPage.js";


export class IncomePage {
    constructor(page) {
        this.page = page;
        //this.offerPreviewPage = new OfferPreviewPage(page);
        this.selectPrimaryIncomedrpdown = page.getByRole('combobox', { name: 'Select you primary source of' });
        this.employedFullTimeoptn = page.getByRole('option', { name: 'Employed full-time' });
        this.currentEmployerTextbox = page.getByRole('textbox', { name: 'Enter current employer' });;
        this.startOWorkingDate = page.getByRole('textbox', { name: 'MM/YYYY' });
        this.totalExperience = page.getByPlaceholder('In years')
        this.backbtn = page.getByText('Back');
        this.nextbtn = page.getByRole('button', { name: 'Next' });
    }
    async navigateToIncomePage() {
        
        const offerPreviewPage = new OfferPreviewPage(this.page);
        await offerPreviewPage.navigateToOfferPreviewPage();
        const currentUrl = await offerPreviewPage.clickNextButton();
        console.log('Navigated to income page with URL:', currentUrl);
    }
    async selectPrimaryIncome() {
        await this.selectPrimaryIncomedrpdown.click();
        console.log('Primary income dropdown is clicked');
        await this.employedFullTimeoptn.click();
        console.log('Employed full-time is selected from the dropdown');
    }
    async fillCurrentEmployerName(employername) {
        await this.currentEmployerTextbox.fill(employername);
        console.log('Current employer name is filled');        
    }
   
    async fillStartWorkingDate(startingdate) {
        await this.startOWorkingDate.fill(startingdate);
        console.log('Start working date is filled');        
    }
    async enterTotalExperience(totalexp) {
        await this.totalExperience.fill(totalexp);
        console.log('Total experience is filled');        
    }

    async clickBackButton() {
        await this.backbtn.click();
        console.log('Back button in income page is clicked');
    }
    async clickNextButton() {
        await this.nextbtn.click();
        console.log('Next button in income page is clicked');
        await this.page.waitForURL('**/title-information'); 
        return this.page.url(); 
    }
}