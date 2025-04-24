import{test,expect} from '@playwright/test';
import {HomeValuePage} from '../pages/homeValuePage.js';




test('@regression @TC-NADA-30 verify placeholder text of all the text fields in home value page', async ({ page }) => {
    
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