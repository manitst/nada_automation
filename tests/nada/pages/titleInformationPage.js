import { IncomePage } from "./incomePage.js";

export class TitleInformation{
    constructor(page)
    {
        this.page = page;
        this.propertyHeldInTrustNo = page.locator('div').filter({ hasText: /^Is this property held in a trust\?YesNo$/ }).getByLabel('No');
        this.propertyHeldInTrustYes = page.locator('div').filter({ hasText: /^Is this property held in a trust\?YesNo$/ }).getByLabel('Yes');
        //this.martialStatusSingle = page.locator('input[type="radio"][value="single"]');
        this.martialStatusSingle = page.getByText('Single');

        this.anyoneOnTitleNo = page.locator('div').filter({ hasText: /^Is there anyone else on title\?YesNo$/ }).getByLabel('No');
        this.anyoneOnTitleYes = page.locator('div').filter({ hasText: /^Is there anyone else on title\?YesNo$/ }).getByLabel('Yes');
        this.nextbtn = page.getByRole('button', { name: 'Next' });

    }
    async navigateToTitleInformation()
    {
        const incomePage = new IncomePage(this.page);
        await incomePage.navigateToIncomePage();
        await incomePage.selectPrimaryIncome();
        await incomePage.fillCurrentEmployerName('Acme Inc');
        await incomePage.fillStartWorkingDate('11/2020');
        await incomePage.enterTotalExperience('12');
        //await incomePage.clickNextButton();
    }
    async checkPropertyInTrustNoChkbox()
    {
        this.propertyHeldInTrustNo.click();
        console.log("Property In Trust - No is selected");
    }
    async selectMartialStatusrdbox()
    {
        this.martialStatusSingle.click();
        console.log('Martial status - single is selected');
    }
    async selectAnyoneOnTitleNo()
    {
        this.anyoneOnTitleNo.click();
        console.log('Anyone on title - No is selected');
    }
    async clickNextButton() {
        await this.nextbtn.click();
        console.log('Next button in Title information page is clicked');
        await this.page.waitForURL('**/overview'); 
        return this.page.url(); 
    }

}