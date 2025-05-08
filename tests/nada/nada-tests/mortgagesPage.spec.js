import {test,expect} from '@playwright/test';
import { MortgagesPage } from '../pages/mortgagesPage.js';


test('@regression @TC-NADA-78 Verify the user is able to select a lender and click next button', async ({ page }) => {
    test.setTimeout(60000); 
    const mortgagesPage = new MortgagesPage(page);
    const currentUrl = await mortgagesPage.navigateToMortgagesPage();
    console.log('Current URL:', currentUrl);
    await page.waitForURL('**/mortgages');
    await mortgagesPage.clickLenderJPMorganChkbox();
    const currentUrlAfterClick = await mortgagesPage.clickNextButton();
    console.log('Current URL after clicking next:', currentUrlAfterClick);
    await expect(page).toHaveURL('https://hitch-hei.onrender.com/apply/offer-preview');
});

