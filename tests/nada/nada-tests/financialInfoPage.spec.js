import {test,expect} from '@playwright/test';
import {FinancialInfoPage} from '../pages/financialInfoPage.js';


// test('@regression @TC-NADA-38 verify the financial info page is displayed', async ({ page }) => {
//     const financialInfoPage = new FinancialInfoPage(page);
//     await financialInfoPage.navigateToFinancialInfoPage()
//     expect(await financialInfoPage.verifyUserdirectedtoFinancialInfoPage()).toBe('https://hitch-hei.onrender.com/apply/credit-score');

// });
test('@regression @TC-NADA-38 verify the credit score radio buttons are displayed and user can check the credit score', async ({ page }) => {
    const financialInfoPage = new FinancialInfoPage(page);
    await financialInfoPage.navigateToFinancialInfoPage() 
    expect(financialInfoPage.creditscorelessthan500).toBeVisible();
    expect(financialInfoPage.creditscorebtw500and539).toBeVisible();
    expect(financialInfoPage.creditscorebtw540and579).toBeVisible();
    expect(financialInfoPage.creditscorebtwabove580).toBeVisible();
    await financialInfoPage.clickCreditScoreBtn('560');
    
    if(await financialInfoPage.creditscorelessthan500.isChecked()) {
        expect(await financialInfoPage.creditscorelessthan500.isChecked());
    }else if(financialInfoPage.creditscorebtw500and539.isChecked()) {
        expect(await financialInfoPage.creditscorebtw500and539.isChecked());
    } else if(financialInfoPage.creditscorebtw540and579.isChecked()) {
        expect(await financialInfoPage.creditscorebtw540and579.isChecked());
    } else if(financialInfoPage.creditscorebtwabove580.isChecked()) {
        expect(await financialInfoPage.creditscorebtwabove580.isChecked());
    }
});
test('@regression @TC-NADA-39 verify the late payments details radio buttons are displayed', async ({ page }) => {
    const financialInfoPage = new FinancialInfoPage(page);
    await financialInfoPage.navigateToFinancialInfoPage() 
    await financialInfoPage.verifyLatePaymentsDetailsYesbtnIsVisible();
    await financialInfoPage.verifyLatePaymentsDetailsNobtnIsVisible();

});
test('@regression @TC-NADA-40 verify the user can navigate the next page after entering details', async ({ page }) => {

    const financialInfoPage = new FinancialInfoPage(page);
    await financialInfoPage.navigateToFinancialInfoPage() 
    await financialInfoPage.clickCreditScoreBtn('560');
    await financialInfoPage.clickLatePaymentsDetailsNoBtn();
     
    if(await financialInfoPage.latePaymentsDetailsYesbtn.isChecked()) {
        expect(await financialInfoPage.latePaymentsDetailsYesbtn.isChecked());
        console.log('Late payments details Yes button is checked')
    }else if(financialInfoPage.latePaymentsDetailsNobtn.isChecked()) {
        expect(await financialInfoPage.latePaymentsDetailsNobtn.isChecked());
        console.log('Late payments details No button is checked')
    }
    await financialInfoPage.clickNextButton(); 
    expect(await financialInfoPage.verifyUserDirectedToHasFBMPage()).toBe('https://hitch-hei.onrender.com/apply/has-fbm');
});
test('@regression @TC-NADA-41 verify the user can navigate back to Home Value page', async ({ page }) => {
    const financialInfoPage = new FinancialInfoPage(page);
    await financialInfoPage.navigateToFinancialInfoPage() 
    await financialInfoPage.clickBackButton(); 
    expect(await financialInfoPage.verifyUserdirectedtoHomeValuePage()).toBe('https://hitch-hei.onrender.com/apply/home-value');    
    console.log('User successfully navigated back to Home Value page'); 
    
});
test('@regression @TC-NADA-42-1 verify the financial info menu is highlighted', async ({ page }) => {
    const financialInfoPage = new FinancialInfoPage(page);
    await financialInfoPage.navigateToFinancialInfoPage() 
    const isHighlighted = await financialInfoPage.financialInfoMenu.evaluate((element) => {
        return window.getComputedStyle(element).borderColor === 'rgb(0, 198, 94)'; // Checks if the border color is green
    }); 
    console.log(isHighlighted);
    if(isHighlighted === true)
    {
        console.log('Financial Info menu is highlighted in green color');
    }
    else
    {
        console.log('Financial Info menu is not highlighted in green color');
    }
});
test('@regression @TC-NADA-42 verify the financial info step number is displayed and matches', async ({ page }) => {
    const financialInfoPage = new FinancialInfoPage(page);
    await financialInfoPage.navigateToFinancialInfoPage() 
    const financialInfoMenuNumber = await financialInfoPage.financialInfoMenuNumber.innerText();
    console.log('financialInfoMenuNumber-', financialInfoMenuNumber);
    expect(financialInfoMenuNumber).toBe('3'); ``
    const stepNumber = await financialInfoPage.stepNumber.innerText();
    console.log('stepNumber-', stepNumber);
    expect(stepNumber).toContain('3'); 
    const stepNumberExtracted = stepNumber.match(/\d+/)?.[0];
    expect(financialInfoMenuNumber).toBe(stepNumberExtracted);
});
test('@regression @TC-NADA-43 verify the user cannot proceed to next page without entering any data', async ({ page }) => { 

    const financialInfoPage = new FinancialInfoPage(page);
    await financialInfoPage.navigateToFinancialInfoPage();
    await financialInfoPage.clickNextButton();
    const enterCreditScoreErrorMessage = await financialInfoPage.enterCreditScoreErrorMessage.innerText();
    expect(enterCreditScoreErrorMessage).toContain('Please select an option for credit score');
    console.log('enterCreditScoreErrorMessage-', enterCreditScoreErrorMessage)
    const latePaymentsDetailsErrorMessage = await financialInfoPage.latePaymentsDetailsErrorMessage.innerText();
    expect(latePaymentsDetailsErrorMessage).toContain('Please select an option for late payments');
    console.log('latePaymentsDetailsErrorMessage-', latePaymentsDetailsErrorMessage)
    

    
    
});