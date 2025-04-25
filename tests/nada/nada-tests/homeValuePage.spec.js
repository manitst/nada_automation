import{test,expect} from '@playwright/test';
import {HomeValuePage} from '../pages/homeValuePage.js';




test('@regression @TC-NADA-30 @TC-NADA-31 @TC-NADA-32 verify placeholder text of all the text fields in home value page', async ({ page }) => {
    
    const homeValuePage = new HomeValuePage(page);
    
    await homeValuePage.navigateToHomeValuePage()
    await homeValuePage.enterHomeValueTxt('500000')
    await homeValuePage.enterMortgageBalanceTxt('20000')
    await expect(homeValuePage.homeValueText).toHaveAttribute('placeholder', 'Enter home value');
    await expect(homeValuePage.mortgageBalanceText).toHaveAttribute('placeholder', 'Enter mortgage balance');
    const placeHolderText = await homeValuePage.propertyTypeDropdown.innerText();
    console.log('placeHolderText-', placeHolderText)
    expect(placeHolderText).toBe('Select Property type');
    await expect(homeValuePage.nextbtn).toBeVisible();
    await expect(homeValuePage.nextbtn).toHaveText('Next');
    await homeValuePage.clickpropertyTypeDropdown();
    await expect(homeValuePage.propertyTypeSingleFamilyHome).toBeVisible();
    await homeValuePage.getTheDropdownValue();
    await homeValuePage.propertyTypeSingleFamilyHome.click();
    await homeValuePage.clickNextButton(); 
    expect(homeValuePage.verifyUserdirectedtoFinancialInfoPage()).toBe('https://hitch-hei.onrender.com/apply/credit-score');
           
});
test('@regression @TC-NADA-33 verify property details page is highlighted', async ({ page }) => {
    
    const homeValuePage = new HomeValuePage(page);
    
    await homeValuePage.navigateToHomeValuePage()
    const isHighlighted = await homeValuePage.propertyDetailsMenu.evaluate((element) => {
        return window.getComputedStyle(element).borderColor === 'rgb(0, 198, 94)'; // Check if the border color is green
    }); 
    console.log(isHighlighted);
    if(isHighlighted === true)
    {
        console.log('Property Details menu is highlighted in green color');
    }
    else
    {
        console.log('Property Details menu is not highlighted in green color');
    }
    
});
test('@regression @TC-NADA-34 verify the property details menu number', async ({ page }) => {
    
    const homeValuePage = new HomeValuePage(page);
    
    await homeValuePage.navigateToHomeValuePage()
    const propertyDetailsMenuNumber = await homeValuePage.propertyDetailsMenuNumber.innerText();
    console.log('propertyDetailsMenuNumber-', propertyDetailsMenuNumber);
    expect(propertyDetailsMenuNumber).toBe('2'); 
    const stepNumber = await homeValuePage.stepNumber.innerText();
    console.log('stepNumber-', stepNumber);
    expect(stepNumber).toContain('2'); 
    const stepNumberExtracted = stepNumber.match(/\d+/)?.[0];
    expect(propertyDetailsMenuNumber).toBe(stepNumberExtracted);
});
test('@regression @TC-NADA-35 verify user cannot proceed to next page without entering any data', async ({ page }) => {
    
    const homeValuePage = new HomeValuePage(page);
    
    await homeValuePage.navigateToHomeValuePage()
    await homeValuePage.enterHomeValueTxt('')
    await homeValuePage.enterMortgageBalanceTxt('')
    await homeValuePage.clickNextButton();
    const homeValueTextErrorMessage = await homeValuePage.homeValueTextErrorMessage.innerText();
    expect(homeValueTextErrorMessage).toContain('Home value is required');
    console.log('homeValueTextErrorMessage-', homeValueTextErrorMessage)
    const mortgageBalanceTextErrorMessage = await homeValuePage.mortgageBalanceTextErrorMessage.innerText();
    expect(mortgageBalanceTextErrorMessage).toContain('Mortgage balance is required');
    console.log('mortgageBalanceTextErrorMessage-', mortgageBalanceTextErrorMessage)
    const propertyTypeDropdownErrorMessage = await homeValuePage.propertyTypeDropdownErrorMessage.innerText();
    expect(propertyTypeDropdownErrorMessage).toContain('Please select Property type');
    console.log('propertyTypeDropdownErrorMessage-', propertyTypeDropdownErrorMessage)   
    
});
test('@regression @TC-NADA-36 verify user can navigate back to Contact Info page', async ({ page }) => {

    const homeValuePage = new HomeValuePage(page);
    
    await homeValuePage.navigateToHomeValuePage();
    await homeValuePage.clickBackButton();
    expect(homeValuePage.verifyUserDirectedToContactPage()).toBe('https://hitch-hei.onrender.com/apply/contact'); // Verify the URL of the Contact Info page
});
test('@regression @TC-NADA-37 verify user can log out from home value page', async ({ page }) => {
    
    const homeValuePage = new HomeValuePage(page);
    
    await homeValuePage.navigateToHomeValuePage()
    await homeValuePage.clickLogOutButton();
    expect(homeValuePage.verifyUserDirectedToHomePage()).toBe('https://hitch-hei.onrender.com/login'); // Verify the URL of the Contact Info page
});