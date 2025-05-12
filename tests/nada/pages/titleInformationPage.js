import { IncomePage } from "./incomePage.js";
import {expect} from "@playwright/test"

export class TitleInformation{
    constructor(page)
    {
        this.page = page;
        //this.propertyHeldInTrustNo = page.locator('//*[@id="__next"]/div[1]/div[2]/main/div/div/div[2]/form/div/div/div[1]/div/div/label[2]/span[1]/input')
        this.propertyHeldInTrustNo = page.locator('div').filter({ hasText: /^Is this property held in a trust\?YesNo$/ }).getByLabel('No');
        this.propertyHeldInTrustYes = page.locator('div').filter({ hasText: /^Is this property held in a trust\?YesNo$/ }).getByLabel('Yes');
        //this.martialStatusSingle = page.locator('input[type="radio"][value="single"]');
        this.martialStatusSingle = page.getByText('Single');
        //this.martialStatusSingle = page.locator('//*[@id="__next"]/div[1]/div[2]/main/div/div/div[2]/form/div/div/div[2]/div/div/label[1]/span[1]/span[1]');
        this.anyoneOnTitleNo = page.locator('div').filter({ hasText: /^Is there anyone else on title\?YesNo$/ }).getByLabel('No');
       //this.anyoneOnTitleNo = page.locator('//*[@id="__next"]/div[1]/div[2]/main/div/div/div[2]/form/div/div/div[3]/div/div/label[2]/span[1]/input'); 
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
        this.propertyHeldInTrustNo.click({force : true});
        console.log("Property In Trust - No is selected");
    }
    async selectMartialStatusrdbox()
    {
        this.martialStatusSingle.click({force : true});
        console.log('Martial status - single is selected');
    }
    async selectAnyoneOnTitleNo()
    {
        this.anyoneOnTitleNo.click({force : true});
        console.log('Anyone on title - No is selected');
    }
    async clickNextButton() {
        await expect(this.propertyHeldInTrustNo).toBeChecked();
        await expect(this.martialStatusSingle).toBeChecked();
        await expect(this.anyoneOnTitleNo).toBeChecked();
        await this.nextbtn.click({force : true});
        console.log('Next button in Title information page is clicked');
        await this.page.waitForURL('**/overview'); 
        const currentURL =  this.page.url(); 
        console.log(currentURL);
        return currentURL;
    }

}