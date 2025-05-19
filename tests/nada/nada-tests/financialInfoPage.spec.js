import { test, expect } from '@playwright/test';
import { FinancialInfoPage } from '../pages/financialInfoPage.js';




test('@regression @TC-NADA-38 verify the credit score radio buttons are displayed and user can check the credit score', async ({ page }) => {
    const financialInfoPage = new FinancialInfoPage(page);
    await financialInfoPage.navigateToFinancialInfoPage()
    expect(financialInfoPage.creditscorelessthan500).toBeVisible();
    expect(financialInfoPage.creditscorebtw500and539).toBeVisible();
    expect(financialInfoPage.creditscorebtw540and579).toBeVisible();
    expect(financialInfoPage.creditscorebtwabove580).toBeVisible();
    await financialInfoPage.clickCreditScoreBtn('560');

    if (await financialInfoPage.creditscorelessthan500.isChecked()) {
        expect(await financialInfoPage.creditscorelessthan500.isChecked());
    } else if (financialInfoPage.creditscorebtw500and539.isChecked()) {
        expect(await financialInfoPage.creditscorebtw500and539.isChecked());
    } else if (financialInfoPage.creditscorebtw540and579.isChecked()) {
        expect(await financialInfoPage.creditscorebtw540and579.isChecked());
    } else if (financialInfoPage.creditscorebtwabove580.isChecked()) {
        expect(await financialInfoPage.creditscorebtwabove580.isChecked());
    }
    await financialInfoPage.clickLatePaymentsDetailsNoBtn();

    if (await financialInfoPage.latePaymentsDetailsYesbtn.isChecked()) {
        expect(await financialInfoPage.latePaymentsDetailsYesbtn.isChecked());
        console.log('Late payments details Yes button is checked')
    } else if (financialInfoPage.latePaymentsDetailsNobtn.isChecked()) {
        expect(await financialInfoPage.latePaymentsDetailsNobtn.isChecked());
        console.log('Late payments details No button is checked')
    }
    await financialInfoPage.clickNextButton();
    expect(await financialInfoPage.verifyUserDirectedToHasFBMPage()).toBe('https://hitch-hei.onrender.com/apply/has-fbm');
});

