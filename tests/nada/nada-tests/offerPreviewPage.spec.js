import {test,expect} from '@playwright/test';
import { MortgagesPage } from '../pages/mortgagesPage';
import { OfferPreviewPage } from '../pages/offerPreviewPage';

test('@regression @TC-NADA-79 Verify the user can see offer offer preview and click next button', async ({ page }) => {
test.setTimeout(60000);

const offerPreviewPage = new OfferPreviewPage(page);
await offerPreviewPage.navigateToOfferPreviewPage();
const currentUrlAfterClick = await offerPreviewPage.clickNextButton();
console.log('Current URL after clicking next:', currentUrlAfterClick);
await expect(page).toHaveURL('https://hitch-hei.onrender.com/apply/income');


})