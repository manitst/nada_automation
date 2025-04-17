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
    test('@regression @TC-NADA-13-1 Verify user can enter email address ', async ({ page }) => {
        const wholesalePortalLoginPage = new WholesalePortalLoginPage(page);
        await wholesalePortalLoginPage.navigateToWholesalePortalLoginPage()
        await wholesalePortalLoginPage.enterEmail('test@gmail.com.@');  
        await wholesalePortalLoginPage.verifyErrorMessage();
    });
    test('@regression @TC-NADA-13-2 Verify the error message if there is no email address ', async ({ page }) => {

        const wholesalePortalLoginPage = new WholesalePortalLoginPage(page);
        await wholesalePortalLoginPage.navigateToWholesalePortalLoginPage();
        await wholesalePortalLoginPage.enterEmail('');
        await wholesalePortalLoginPage.getMagicLinkbtn.click(); 
        const errorMessageTexts = await wholesalePortalLoginPage.errorMessageText.innerText();
        console.log('errorMessageText', errorMessageTexts)
        expect(errorMessageTexts).toBe('Email required');
        });
    test('@regression @TC-NADA-13-3 Verify user gets the error message if it unregistered user ', async ({ page }) => {

        const wholesalePortalLoginPage = new WholesalePortalLoginPage(page);
        await wholesalePortalLoginPage.navigateToWholesalePortalLoginPage();
        await wholesalePortalLoginPage.enterEmail('unregistered_user@yopmail.com');
        await wholesalePortalLoginPage.verifyErrorMessage();
        const errorMessageText = await wholesalePortalLoginPage.errorMessage.innerText();
        console.log('errorMessageText', errorMessageText);
        expect(errorMessageText).toBe('User not found');
    });
    test('@regression @TC-NADA-14 verify unregistered user does not get magic link ', async ({ page }) => {
        const wholesalePortalLoginPage = new WholesalePortalLoginPage(page);
        await wholesalePortalLoginPage.navigateToWholesalePortalLoginPage();
        await wholesalePortalLoginPage.enterEmail('unregistered_user@yopmail.com');
        await wholesalePortalLoginPage.getMagicLinkbtn.click();
        wholesalePortalLoginPage.verifyUserDoesNotGetMagicLink();
        const inboxMessageText = await wholesalePortalLoginPage.inboxMessage.innerText();
        expect(inboxMessageText).toBe('This inbox is empty'); 
        
    });
    // test('@regression @TC-NADA-15 verify user redirected to respective page when he clicks magic link ', async ({ page }) => {
    //     const wholesalePortalLoginPage = new WholesalePortalLoginPage(page);
    //     await wholesalePortalLoginPage.navigateToWholesalePortalLoginPage();
    //     await wholesalePortalLoginPage.enterEmail('test_nada_consumer_login@yopmail.com')
    //     await wholesalePortalLoginPage.getMagicLinkbtn.click();
    //     wholesalePortalLoginPage.verifyUserGetsRedirectedToHomePage(); 
    //     //const redirectedURL = await wholesalePortalLoginPage.verifyUserGetsRedirectedToHomePage(); 
    //     //console.log('Redirected URL:', redirectedURL);


    //     // const redirectedPageText = await wholesalePortalLoginPage.redirectedPageText.innerText();
    //     // console.log('redirectedPageText', redirectedPageText);
    //     // expect(redirectedPageText).toBe('Welcome to your dashboard');
    // });

test('@regression @TC-NADA-16 verify user can login with username password ', async ({ page }) => {

    const wholesalePortalLoginPage = new WholesalePortalLoginPage(page);
    await wholesalePortalLoginPage.navigateToWholesalePortalLoginPage();
    await wholesalePortalLoginPage.verifyUserDirectsToWholesalePortalLoginPage();
    await wholesalePortalLoginPage.clickLoginWithPassword();
    await wholesalePortalLoginPage.enterEmailAddressText('test_nada_ws_login@yopmail.com');
    await wholesalePortalLoginPage.enterPassword('password123');
    await wholesalePortalLoginPage.clickLoginbtn(); 
    
    const currentPageURL = await wholesalePortalLoginPage.verifyUserDirectedToPortal();
    console.log('currentPageURL', currentPageURL)
    //expect(currentPageURL).toContain('/portal');
    expect(currentPageURL).toBe('https://hitch-hei.onrender.com/portal');
});