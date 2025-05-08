import {test,expect} from '@playwright/test';
import { IncomePage } from '../pages/incomePage.js';


test('@regression @TC-NADA-80 Verify the user can see offer offer preview and click next button', async ({ page }) => {
test.setTimeout(50000);
const incomePage = new IncomePage(page);

await incomePage.navigateToIncomePage();
await incomePage.selectPrimaryIncome();
await incomePage.fillCurrentEmployerName('Acme Inc.');
await incomePage.fillStartWorkingDate('01/2020');
await incomePage.enterTotalExperience('12');
const currentUrlIncomePage = await incomePage.clickNextButton();
await expect(page).toHaveURL('https://hitch-hei.onrender.com/apply/title-information');
console.log('Current URL after clicking next in income page:', currentUrlIncomePage);

});