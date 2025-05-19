import { test, expect } from "@playwright/test"
import { TitleInformation } from "../pages/titleInformationPage"
import { OverviewPage } from "../pages/overviewPage";

test('@regression @TC-NADA-82 Verify user can upload documents', async ({ page }) => {
    test.setTimeout(80000);
    const titleInformation = new TitleInformation(page);
    const overviewpage = new OverviewPage(page)
    await overviewpage.navigateTooverviewPage();
    const urlAfterClickingNext = await titleInformation.clickNextButton();
    console.log('current URL', urlAfterClickingNext);
    await expect(page).toHaveURL('https://hitch-hei.onrender.com/offer/overview');



    const successMessagessn = await overviewpage.uploadSSNProofDocument();
    expect(successMessagessn).toBe('File uploaded successfully!');
    const successMessageIncome = await overviewpage.uploadProofOfIncomeDocument();
    expect(successMessageIncome).toBe('File uploaded successfully!');
    const successMessageId = await overviewpage.uploadIDDocument();
    expect(successMessageId).toBe('File uploaded successfully!');
    const successMessagemortgage = await overviewpage.uploadMortgageStatementDocument();
    expect(successMessagemortgage).toBe('File uploaded successfully!');
    const successMessageIns = await overviewpage.uploadHomeownersInsuranceDocument();
    expect(successMessageIns).toBe('File uploaded successfully!');
    const documentURL = await overviewpage.navigateToDocument();
    expect(documentURL).toBe('https://hitch-hei.onrender.com/offer/documents');
    const offerdetailsURL = await overviewpage.navigateToOfferDetails();
    expect(offerdetailsURL).toBe('https://hitch-hei.onrender.com/offer/offer-details');
    const faqURL = await overviewpage.navigateToFAQs();
    expect(faqURL).toBe('https://hitch-hei.onrender.com/offer/faq');
    const reviewandsignurl = await overviewpage.reviewAndSign();
    console.log(reviewandsignurl);

});