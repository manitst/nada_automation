import {expect,test} from '@playwright/test';
import { WholesalePortalLoginPage } from "../Pages/wholesalePortalLoginPage.js"; 

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
