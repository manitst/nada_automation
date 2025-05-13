import { IncomePage } from "./incomePage";
import { TitleInformation } from "./titleInformationPage";
import { expect } from "@playwright/test"


export class OverviewPage {
    constructor(page) {
        this.page = page;
        this.SSNProofDocument = page.getByText('Add documents').nth(0);
        //this.idDocument = page.locator('[id="filepond--drop-label-9h11p3vxs"]');
        //this.homeInsuranceDocument = page.locator('div:nth-child(3) > div:nth-child(3) > .filepond--wrapper > .filepond--root > .filepond--drop-label');
        this.proofOfIncomeDocument = page.getByText('Add documents').nth(1);
        //this.SSNProofDocument = page.locator('div:nth-child(4) > div:nth-child(3) > .filepond--wrapper > .filepond--root > .filepond--drop-label');
        this.idDocument = page.getByText('Add documents').nth(2);
        //this.ssnProofButtonLabel = page.locator('.MuiBox-root.css-1u0ecbl');
        this.idDocumentButtonLabel = page.locator('.css-1wr0o59').nth(1);
        //this.idDocument = page.locator('#filepond--drop-label-cegqgrrb4').getByText('Add documents');
        //this.mortgageStatementDocument = page.locator('#filepond--drop-label-rxqutkcci').getByText('Add documents');
        this.mortgageStatementDocument = page.getByText('Add documents').nth(3);
        this.homeownersInsuranceDocument = page.getByText('Add documents').nth(4);
        this.fileUploadSuccessMessage = page.getByText('File uploaded successfully!');
        this.documentMenu = page.getByRole('link', { name: 'Documents' })
        this.offerDetailsMenu = page.getByRole('link', { name: 'Offer Details' })
        this.faqMenu = page.getByRole('link', { name: 'FAQ' })

    }

    async navigateTooverviewPage() {
        const titleinformationPage = new TitleInformation(this.page);
        const incomepage = new IncomePage(this.page);

        await titleinformationPage.navigateToTitleInformation();
        await incomepage.clickNextButton();
        await titleinformationPage.checkPropertyInTrustNoChkbox();
        await titleinformationPage.selectMartialStatusrdbox();
        await titleinformationPage.selectAnyoneOnTitleNo();


    }
    async uploadIDDocument() {

        await this.page.waitForLoadState('networkidle');
        await expect(this.idDocument).toBeVisible();
        console.log(await this.idDocumentButtonLabel.evaluate(el => el.textContent));

        await this.idDocument.setInputFiles('C:\\Users\\User\\Pictures\\Saved Pictures\\Chevrolet-Beat-Activ.jpg');
        await this.page.waitForLoadState('networkidle');
        // await this.page.waitForFunction(async () => {
        //     const elements = Array.from(document.querySelectorAll('.css-1wr0o59'));

        //     return elements.some(el => el.textContent === 'In Progress');
        // });

        console.log('Document for ID proof is uploaded');
        return await this.fileUploadSuccessMessage.innerText();
    }
    async uploadHomeownersInsuranceDocument() {
        await this.page.waitForLoadState('networkidle');
        this.homeownersInsuranceDocument.setInputFiles('C:\\Users\\User\\Pictures\\Saved Pictures\\Chevrolet-Beat-Activ.jpg')
        console.log('Document for home insurance is uploaded');
        return this.fileUploadSuccessMessage.innerText();
    }
    async uploadSSNProofDocument() {
        await this.page.waitForLoadState('networkidle');
        this.SSNProofDocument.setInputFiles('C:\\Users\\User\\Pictures\\Saved Pictures\\Chevrolet-Beat-Activ.jpg');
        console.log('Document for SSN Proof is uploaded');
        return this.fileUploadSuccessMessage.innerText();
    }
    async uploadProofOfIncomeDocument() {
        await this.page.waitForLoadState('networkidle');
        this.proofOfIncomeDocument.setInputFiles('C:\\Users\\User\\Pictures\\Saved Pictures\\Chevrolet-Beat-Activ.jpg');
        console.log('Document for income Proof is uploaded');
        return this.fileUploadSuccessMessage.innerText();
    }
    async uploadMortgageStatementDocument() {
        await this.page.waitForLoadState('networkidle');
        this.mortgageStatementDocument.setInputFiles('C:\\Users\\User\\Pictures\\Saved Pictures\\Chevrolet-Beat-Activ.jpg')
        console.log('Document for mortgage statement is uploaded')
        return this.fileUploadSuccessMessage.innerText();
    }
    async navigateToDocument() {
        await this.documentMenu.click();
        console.log('The use is in Document page');
        return this.page.url();
    }
    async navigateToOfferDetails() {
        await this.offerDetailsMenu.click();
        console.log('The use is in Offer Details page');
        return this.page.url();
    }
    async navigateToFAQs() {
        await this.faqMenu.click();
        console.log('The use is in FAQs page');
        return this.page.url();
    }


}