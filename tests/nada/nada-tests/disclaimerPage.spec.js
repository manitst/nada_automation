import {test,expect} from '@playwright/test';
import { DisclaimerPage } from '../pages/disclaimerPage.js';
import { HomeValuePage } from '../pages/homeValuePage.js';

test('@regression @TC-NADA-69 verify user is in disclaimer page', async ({ page }) => {
    test.setTimeout(50000);
    const disclaimerPage = new DisclaimerPage(page);
    await disclaimerPage.navigateToDisclaimerPage();
    const currentURL = await disclaimerPage.page.url();
    expect(currentURL).toContain('disclaimer');
    console.log('User is in Disclaimer page');
});
test('@regression @TC-NADA-70 verify user can enter data in dob text field', async ({page}) =>{
    test.setTimeout(40000);
    const disclaimerPage = new DisclaimerPage(page);
    await disclaimerPage.navigateToDisclaimerPage();
    await disclaimerPage.enterDOB('01/01/1971');
    const dobValue = await disclaimerPage.dobText.inputValue();
    expect(dobValue).toBe('01/01/1971');
    console.log('User is able to enter data in dob text field');
});
test('@regression @TC-NADA-73 verify user can enter datas and can proceed to next page', async ({page}) =>{
    test.setTimeout(50000);
    const disclaimerPage = new DisclaimerPage(page);
    await disclaimerPage.navigateToDisclaimerPage();
    await disclaimerPage.enterDOB('01/01/1971');
    //await disclaimerPage.enterSSN('000-00-0018');
    //await disclaimerPage.ssnText.fill('000-00-0018');
    //const ssnValue = await disclaimerPage.ssnText.inputValue();
    //expect(ssnValue).toBe('000-00-0018');
    //console.log('User is able to enter data in ssn text field');
    await disclaimerPage.clickDisclaimerCheckbox();
    await disclaimerPage.clickIAgreeButton();
});
test('@regression @TC-NADA-72 verify user cannot move forward without checking terms and conditions checkbox', async ({page}) =>{
    test.setTimeout(50000);
    const disclaimerPage = new DisclaimerPage(page);
    await disclaimerPage.navigateToDisclaimerPage();
    await disclaimerPage.enterDOB('01/01/1971');
    await disclaimerPage.enterSSN('000-00-0018');
    await disclaimerPage.clickIAgreeButton();
    const errorMessage = await disclaimerPage.disclaimerCheckboxError.innerText();
    console.log('errorMessage-', errorMessage);
    expect(errorMessage).toContain('Agree to Terms and Conditions');
});
test('@regression @TC-NADA-74 verify user can click back button in disclaimer page', async ({page}) =>{
    test.setTimeout(40000);
    const disclaimerPage = new DisclaimerPage(page);
    const homeValuePage = new HomeValuePage(page);
    await disclaimerPage.navigateToDisclaimerPage();
    const currentURL = await homeValuePage.clickBackButton();
    console.log('Back button in disclaimer page is clicked');
    expect(currentURL).toContain('occupancy');
    console.log('User is in occupancy page after clicking back button in disclaimer page');
});
test('@regression @TC-NADA-76 verify occupancy menu in highlighted', async ({ page }) => {
    test.setTimeout(40000);
    const disclaimerPage = new DisclaimerPage(page);
    await disclaimerPage.navigateToDisclaimerPage();
    await expect(disclaimerPage.occupancyMenu).toHaveCSS('border-color', 'rgb(0, 198, 94)');
    const isHighlighted = await disclaimerPage.occupancyMenu.evaluate((element) => {
        return window.getComputedStyle(element).borderColor === 'rgb(0, 198, 94)';
    });
    expect(isHighlighted).toBe(true);
    console.log('Occupancy menu is highlighted in green color');
});
test('@regression @TC-NADA-77 verify occupancy step number is displayed and matches', async ({ page }) => { 
    test.setTimeout(40000);
    const disclaimerPage = new DisclaimerPage(page);
    await disclaimerPage.navigateToDisclaimerPage();
    const disclaimermenuNumber = await disclaimerPage.disclaimerMenuNumber.innerText();
    console.log('disclaimerMenuNumber-', disclaimermenuNumber);
    expect(disclaimermenuNumber).toBe('7'); 
    const stepNumber = await disclaimerPage.stepNumber.innerText();
    console.log('stepNumber-', stepNumber);
    expect(stepNumber).toContain('7'); 
    const stepNumberExtracted = stepNumber.match(/\d+/)?.[0];
    expect(disclaimermenuNumber).toBe(stepNumberExtracted);
});




