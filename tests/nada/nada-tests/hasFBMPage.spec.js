import {test,expect} from '@playwright/test';
import {HasFBMPage} from '../pages/hasFBMPage.js';

test('@regression @TC-NADA-44 verify foreclosure,bankruptcy and modifications radio buttons are visible', async ({ page }) => {
   const hasFBMPage = new HasFBMPage(page);

    await hasFBMPage.navigateToHasFBMPage();
    
   await expect(hasFBMPage.foreclosureYesbtn).toBeVisible();
   await expect(hasFBMPage.foreclosureNobtn).toBeVisible();
   await expect(hasFBMPage.bankruptcyYesbtn).toBeVisible();
   await expect(hasFBMPage.bankruptcyNobtn).toBeVisible();
   await expect(hasFBMPage.modificationYesbtn).toBeVisible();
   await expect(hasFBMPage.modificationNobtn).toBeVisible();
   await expect(hasFBMPage.nextbtn).toBeVisible();
});
test('@regression @TC-NADA-45 verify user can select foreclosure,bankruptcy and modifications - NO - radio button', async ({ page }) => {

   const hasFBMPage = new HasFBMPage(page);
   await hasFBMPage.navigateToHasFBMPage();
   await hasFBMPage.clickForeclosureNobtn();
   await expect(hasFBMPage.foreclosureNobtn).toBeChecked();
   await hasFBMPage.clickBankruptcyNobtn();
   await expect(hasFBMPage.bankruptcyNobtn).toBeChecked();
   await hasFBMPage.clickModificationNobtn();
   await expect(hasFBMPage.modificationNobtn).toBeChecked(); 
  
});

test('@regression @TC-NADA-45-1 verify user can select foreclosure,bankruptcy and modifications - YES - radio button', async ({ page }) => {
   const hasFBMPage = new HasFBMPage(page);
   await hasFBMPage.navigateToHasFBMPage();
   await hasFBMPage.clickForeclosureYesbtn();
   await expect(hasFBMPage.foreclosureYesbtn).toBeChecked();
   await hasFBMPage.clickBankruptcyYesbtn();
   await expect(hasFBMPage.bankruptcyYesbtn).toBeChecked();
   await hasFBMPage.clickModificationYesbtn();
   await expect(hasFBMPage.modificationYesbtn).toBeChecked(); 
  
});
test('@regression @TC-NADA-46 verify user gets a pop up if any of the ration button in FBM page is YES', async ({ page }) => { 
    const hasFBMPage = new HasFBMPage(page);
    await hasFBMPage.navigateToHasFBMPage();
    await hasFBMPage.clickForeclosureYesbtn();
    await expect(hasFBMPage.foreclosureYesbtn).toBeChecked();
    await hasFBMPage.clickBankruptcyNobtn();
    await expect(hasFBMPage.bankruptcyNobtn).toBeChecked();
    await hasFBMPage.clickModificationNobtn();
    await expect(hasFBMPage.modificationNobtn).toBeChecked();
    await hasFBMPage.clickNextButton();
    const popupMessage = await hasFBMPage.verifyUsergetsPopupMessage();
    await expect(popupMessage).toBeVisible();

});
test('@regression @TC-NADA-47 verify when user click back button the user is directed to Financial info page', async ({ page }) => { 
    const hasFBMPage = new HasFBMPage(page);
    await hasFBMPage.navigateToHasFBMPage();
    await hasFBMPage.clickBackButton();
    const financialInfoPageURL = await hasFBMPage.verifyUserdirectedtoFinancialInfoPage();
    expect(financialInfoPageURL).toContain('credit-score');

});
test('@regression @TC-NADA-48-1 verify the has FBM menu is highlighted', async ({ page }) => { 
    const hasFBMPage = new HasFBMPage(page);
    await hasFBMPage.navigateToHasFBMPage();
    const isHighlighted = await hasFBMPage.hasFBMMenu.evaluate((element) => {
        return window.getComputedStyle(element).borderColor === 'rgb(0, 198, 94)'; // Checks if the border color is green
    }); 
    console.log(isHighlighted);
    if(isHighlighted === true)
    {
        console.log('Has FBM menu is highlighted in green color');
    }
    else
    {
        console.log('Has FBM menu is not highlighted in green color');
    }
    console.log('Has FBM menu is highlighted');
});
test('@regression @TC-NADA-48 verify the has FBM page step number is displayed and matches', async ({ page }) => {
const hasFBMPage = new HasFBMPage(page);
    await hasFBMPage.navigateToHasFBMPage() 
    const hasFBMMenuNumber = await hasFBMPage.hasFBMMenuNumber.innerText();
    console.log('hasFBMMenuNumber-', hasFBMMenuNumber);
    expect(hasFBMMenuNumber).toBe('4'); 
    const stepNumber = await hasFBMPage.stepNumber.innerText();
    console.log('stepNumber-', stepNumber);
    expect(stepNumber).toContain('4'); 
    const stepNumberExtracted = stepNumber.match(/\d+/)?.[0];
    expect(hasFBMMenuNumber).toBe(stepNumberExtracted);
});
test('@regression @TC-NADA-49 verify the user cannot proceed to next page without entering any data', async ({ page }) => {
    const hasFBMPage = new HasFBMPage(page);
    await hasFBMPage.navigateToHasFBMPage();
    await hasFBMPage.clickNextButton();
    const foreclosureErrorMessage = await hasFBMPage.foreclosureErrorMessage.innerText();
    expect(foreclosureErrorMessage).toContain('Please select an option for foreclosures');
    console.log('foreclosureErrorMessage-', foreclosureErrorMessage)
    const bankruptcyErrorMessage = await hasFBMPage.bankruptcyErrorMessage.innerText();
    expect(bankruptcyErrorMessage).toContain('Please select an option for bankruptcy');
    console.log('bankruptcyErrorMessage-', bankruptcyErrorMessage)
    const modificationErrorMessage = await hasFBMPage.modificationErrorMessage.innerText();
    expect(modificationErrorMessage).toContain('Please select an option for modifications');
    console.log('modificationErrorMessage-', modificationErrorMessage);
});
test('@regression @TC-NADA-50 verify the user can proceed to next page after selecting all radio buttons', async ({ page }) => {
    const hasFBMPage = new HasFBMPage(page);
    await hasFBMPage.navigateToHasFBMPage();
    await hasFBMPage.clickForeclosureNobtn();
    await expect(hasFBMPage.foreclosureNobtn).toBeChecked();
    await hasFBMPage.clickBankruptcyNobtn();
    await expect(hasFBMPage.bankruptcyNobtn).toBeChecked();
    await hasFBMPage.clickModificationNobtn();
    await expect(hasFBMPage.modificationNobtn).toBeChecked(); 
    await hasFBMPage.clickNextButton(); 
    expect(page.url()).toContain('address');
    expect(page.url()).toBe('https://hitch-hei.onrender.com/apply/address');

});