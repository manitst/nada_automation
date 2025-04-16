import {expect,test} from '@playwright/test';
import { WholesalePortalLoginPage } from "../pages/wholesalePortalLoginPage.js"; 

test('@regression @TC-NADA-12 Navigate to Wholesale Portal Login page ', async ({ page }) => {
    
    const wholesalePortalLoginPage = new WholesalePortalLoginPage(page);
    await wholesalePortalLoginPage.navigateToWholesalePortalLoginPage()
    await wholesalePortalLoginPage.verifyUserDirectsToWholesalePortalLoginPage()
});
test('@regression @TC-NADA-13 Verify user can enter email address ', async ({ page }) => {
    const wholesalePortalLoginPage = new WholesalePortalLoginPage(page);
    await wholesalePortalLoginPage.navigateToWholesalePortalLoginPage()
    await wholesalePortalLoginPage.verifyEnterEmailPlaceHolderText();
    await wholesalePortalLoginPage.enterEmail('test_nada_consumer_login@yopmail.com');
    });
    test('@regression @TC-NADA-14 Verify user can enter email address ', async ({ page }) => {
        const wholesalePortalLoginPage = new WholesalePortalLoginPage(page);
        await wholesalePortalLoginPage.navigateToWholesalePortalLoginPage()
        await wholesalePortalLoginPage.enterEmail('test@gmail.com.@');  
        await wholesalePortalLoginPage.verifyErrorMessage();
    });
    test('@regression @TC-NADA-14-1 Verify the error message if there is no email address ', async ({ page }) => {

        const wholesalePortalLoginPage = new WholesalePortalLoginPage(page);
        await wholesalePortalLoginPage.navigateToWholesalePortalLoginPage();
        await wholesalePortalLoginPage.enterEmail('');
        await wholesalePortalLoginPage.getMagicLinkbtn.click(); 
        const errorMessageTexts = await wholesalePortalLoginPage.errorMessageText.innerText();
        console.log('errorMessageText', errorMessageTexts)
        expect(errorMessageTexts).toBe('Email required');
        });
    test('@regression @TC-NADA-14-2 Verify the error message if it unregistered user ', async ({ page }) => {

        const wholesalePortalLoginPage = new WholesalePortalLoginPage(page);
        await wholesalePortalLoginPage.navigateToWholesalePortalLoginPage();
        await wholesalePortalLoginPage.enterEmail('unregistered_user@yopmail.com');
        await wholesalePortalLoginPage.verifyErrorMessage();
        const errorMessageText = await wholesalePortalLoginPage.errorMessage.innerText();
        console.log('errorMessageText', errorMessageText);
        expect(errorMessageText).toBe('User not found');
    });