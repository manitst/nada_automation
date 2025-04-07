import { test, expect, chromium } from "@playwright/test";
import { HomePage } from "../../Nada/Pages/homePage.js";


test('@smoke Home page', async ({ page }) => {

   const homepage = new HomePage(page);

   await homepage.navigateToHomePage()
   await homepage.verifyHomePage()
   await homepage.verifyHomePageLogo()
   await homepage.verifyNMLSConsumerAccessLink()
   await homepage.verifyPrivacyLink()
   await homepage.verifyTermsLink()
   await homepage.verifyLicensingLink()
   await homepage.verifyHeaderFAQlink()
   await homepage.verifyHeaderWholesalePortalLoginbtn()  
   await homepage.verifyHeaderConsumerLoginbtn()
   await homepage.verifyHeaderApplyNowbtn()
   await homepage.verifyFAQVideoIsPresent()
   await homepage.verifyFAQVideoPlay()
   await homepage.verifyHomePagebtns()   
});

