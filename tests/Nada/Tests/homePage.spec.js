import { test, expect, chromium } from "@playwright/test";
import { HomePage } from "../Pages/homePage.js";



test('@smoke @TC-NADA-01 Navigate to home page and Verify home page logo ', async ({ page }) => {

   const homepage = new HomePage(page);

   await homepage.navigateToHomePage()
   await homepage.verifyHomePage()
   await homepage.verifyHomePageLogo()
});
test('@smoke @TC-NADA-04 Verify header buttons directs to respective page', async ({ page }) => {
   const homepage = new HomePage(page);
   await homepage.navigateToHomePage()
   await homepage.verifyClickingFAQbutton()
   await homepage.verifyClickingWholesalePortalLoginbtn()
   await homepage.verifyClickingConsumerLoginbtn()
   await homepage.verifyClickingApplyNowbtn()
});
test('@smoke @TC-NADA-02 Verify the footer links of the Home page', async ({ page }) => {
   const homepage = new HomePage(page);
   await homepage.navigateToHomePage()
   await homepage.verifyNMLSConsumerAccessLink()
   await homepage.verifyPrivacyLink()
   await homepage.verifyTermsLink()
   await homepage.verifyLicensingLink()
});
test('@smoke @TC-NADA-05 Verify the header contains all the buttons', async ({ page }) => {
   const homepage = new HomePage(page);
   await homepage.navigateToHomePage()
   await homepage.verifyHeaderFAQlink()
   await homepage.verifyHeaderWholesalePortalLoginbtn()  
   await homepage.verifyHeaderConsumerLoginbtn()
   await homepage.verifyHeaderApplyNowbtn()
});
test('@smoke @TC-NADA-07 Verify the FAQ video is present and plays', async ({ page }) => {
   const homepage = new HomePage(page);
   await homepage.navigateToHomePage()
   await homepage.verifyFAQVideoIsPresent()
   await homepage.verifyFAQVideoPlay()
   await homepage.verifyHomePagebtns()   
});

