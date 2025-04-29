import { expect, test } from "@playwright/test";
import { HomePage } from "../pages/homePage.js";

// test.describe('Consumer Login Page Tests', () => {
//    let page;

//    test.beforeAll(async ({ browser }) => {
//       const context = await browser.newContext();
//       page = await context.newPage();
//    });


   test('@smoke @regression @homepage @TC-NADA-01 Navigate to home page and Verify home page logo ', async ({ page }) => {

      const homepage = new HomePage(page);

      await homepage.navigateToHomePage()
      await expect(homepage.verifyHomePageVisible()).toBeVisible();
      await expect(homepage.verifyHomePageVisible()).toHaveText('Access your Home Equity —  No Debt, No Monthly Payments');
      await expect(homepage.verifyHomePageLogo()).toBeVisible();
      //await homepage.verifyHomePageLogo()
   });
   test('@smoke @homepage @regression @TC-NADA-04 Verify header buttons directs to respective page', async ({ page }) => {
      const homepage = new HomePage(page);
      await homepage.navigateToHomePage()
      
      //const currentURL = page.url();
      //await expect(currentURL).toContain('/#FAQ'); // Updated to check the FAQ link
      
      await homepage.verifyClickingFAQbutton()
      await homepage.verifyClickingWholesalePortalLoginbtn()
      await homepage.verifyClickingConsumerLoginbtn()
      await homepage.verifyClickingApplyNowbtn()
   });
   test('@smoke @homepage @regression  @TC-NADA-02 Verify the footer links of the Home page', async ({ page }) => {
      const homepage = new HomePage(page);
      await homepage.navigateToHomePage()
      const linkText = await homepage.NMLSConsumerAccesslink.getAttribute('href');
      expect(linkText).toBe('https://www.nmlsconsumeraccess.org')
      const privacylinkText = await homepage.privacyLink.getAttribute('href');
      expect(privacylinkText).toBe('https://www.nmlsconsumeraccess.org')
      const termslinkText = await homepage.termsLink.getAttribute('href');
      expect(termslinkText).toBe('https://www.nmlsconsumeraccess.org')
      const licensinglinkText = await homepage.licensingLink.getAttribute('href');
      expect(licensinglinkText).toBe('https://www.nmlsconsumeraccess.org')
      
   });
   test('@smoke @homepage @regression @TC-NADA-05 Verify the header contains all the buttons', async ({ page }) => {
      const homepage = new HomePage(page);
      await homepage.navigateToHomePage()
       
      const headerFAQHeaderbtnText = await homepage.FAQHeaderbtn.getAttribute('href');
      console.log('headerFAQHeaderbtnText', headerFAQHeaderbtnText)
      expect(headerFAQHeaderbtnText).toBe('/#FAQ'); // Updated to check the FAQ link    
      const headerConsumerLoginbtnText = await homepage.consumerLoginbtn.getAttribute('href');
      expect(headerConsumerLoginbtnText).toBe('/apply/login');
      const headerWholesalePortalLoginbtnText = await homepage.wholesalePrtalLoginbtn.getAttribute('href');
      expect(headerWholesalePortalLoginbtnText).toBe('/portal');
      const headerApplyNowbtnText = await homepage.applynowbtn.getAttribute('href');
      expect(headerApplyNowbtnText).toBe('/apply/contact');      
   });
   test('@smoke @homepage @regression @TC-NADA-07 Verify the FAQ video is present and plays', async ({ page }) => {
      const homepage = new HomePage(page);
      await homepage.navigateToHomePage()
      await expect(homepage.verifyFAQVideoIsPresent()).toBeVisible()
      await homepage.verifyFAQVideoPlay()
      await expect(homepage.verifyHomePageApplyNowbtn()).toBeVisible()
      await expect(homepage.verifyHomePageGetStartedbtn()).toBeVisible()
      await expect(homepage.verifyHomePageGetStartedHomeEquitySectionbtn()).toBeVisible()
      await expect(homepage.verifyHomePageLearnMorebtn()).toBeVisible()
      await expect(homepage.verifyHomePageUnlockOfferbtn()).toBeVisible()   

   });
   test.afterAll(async ({ browser }) => {
      await browser.close();
   });

//});

