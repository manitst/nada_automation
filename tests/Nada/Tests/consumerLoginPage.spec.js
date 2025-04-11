import {expect,test} from '@playwright/test';
import { HomePage } from "../Pages/homePage.js";
import { ConsumerLoginPage } from "../Pages/consumerLoginPage.js";

// test.describe('Consumer Login Page Tests', () => {
//     let page;
  
//     test.beforeAll(async ({ browser }) => {
//       const context = await browser.newContext();
//       page = await context.newPage();
//     });

test('@smoke @TC-NADA-CL-01 Navigate to Consumer Login page ', async ({ page }) => {

    const homepage = new HomePage(page);
    const consumerloginPage = new ConsumerLoginPage(page);

    
    await consumerloginPage.navigateToConsumerLoginPage()
    await consumerloginPage.verifyUserDirectsToConsumerLoginPage()
});

test('@smoke @TC-NADA-CL-02 Verify user can enter email address ', async ({ page }) => {
    
    const consumerloginPage = new ConsumerLoginPage(page);
    await consumerloginPage.navigateToConsumerLoginPage()
    await consumerloginPage.verifyEnterEmailPlaceHolderText()
    await consumerloginPage.enterEmail('test_nada_consumer_login@yopmail.com')
    
 });
 test ('@smoke TC-NADA-CL-03 Verify when user enters valid email address the magic link is sent ', async ({ page }) => {
        
    const consumerloginPage = new ConsumerLoginPage(page);
   await consumerloginPage.navigateToConsumerLoginPage()
   await consumerloginPage.enterEmail('test_nada_consumer_login@yopmail.com')
    await consumerloginPage.verifyMagicLinkIsSent()
    
});

  test ('@smoke TC-NADA-CL-04 Verify user received magic link ', async ({ page }) => {
        
         const consumerloginPage = new ConsumerLoginPage(page);
         await consumerloginPage.verifyMagicLinkHasBeenReceived()
        
    });
    test ('@smoke @TC-NADA-CL-02-01 Verify user without email address ', async ({ page }) => {
        
        const consumerloginPage = new ConsumerLoginPage(page);
        await consumerloginPage.navigateToConsumerLoginPage()
        await consumerloginPage.verifyWithoutEmailaddress()
        
    });
    test ('@smoke @TC-NADA-CL-02-02 Verify entering unregistered email address ', async ({ page }) => {
        
        const consumerloginPage = new ConsumerLoginPage(page);
        await consumerloginPage.navigateToConsumerLoginPage()
        await consumerloginPage.enterEmail('newuser@yopmail.com')
        await consumerloginPage.verifyWithoutEmailaddress()
        
    });
// test.afterAll(async () => {
//     await page.close();
//   });

//});