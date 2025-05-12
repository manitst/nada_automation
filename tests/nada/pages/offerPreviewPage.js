import { MortgagesPage } from "./mortgagesPage";

export class OfferPreviewPage {
    constructor(page) {
        this.page = page;

        this.backbtn = page.getByText('Back');
        this.nextbtn = page.getByRole('button', { name: 'Next' });

    }
    async navigateToOfferPreviewPage() {
        const mortgagesPage = new MortgagesPage(this.page);
        const currentUrl = await mortgagesPage.navigateToMortgagesPage();
        console.log('Current URL:', currentUrl);
        await this.page.waitForURL('**/mortgages');
        await mortgagesPage.clickLenderJPMorganChkbox();
        const newURL = await mortgagesPage.clickNextButton();
        console.log('Navigated to offer preview page ', newURL);
        return this.page.url(); // Return the current URL of the page

    }

    async clickBackButton() {
        await this.backbtn.click();
        console.log('Back button in offer preview page is clicked');
    }
    async clickNextButton() {
        await this.nextbtn.click();
        console.log('Next button in offer preview page is clicked');
        await this.page.waitForURL('**/income'); // Wait for the URL to contain 'mortgages'
        return this.page.url();
    }
}