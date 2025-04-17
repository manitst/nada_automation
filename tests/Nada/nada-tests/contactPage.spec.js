import { test, expect, chromium } from "@playwright/test";
import { HomePage } from "../pages/homePage.js";
import { ContactPage } from "../pages/contactPage.js";

test.beforeEach(async ({ page }) => {
    
    await page.goto('about:blank'); 
});


test('@regression Contact page', async ({ page }) => {

    const homepage = new HomePage(page);
    //const contactpage = new ContactPage(TestRunner.page)
    const contactpage = new ContactPage(page)
    
    await homepage.navigateToHomePage()
    await contactpage.clickApplyNowButton()
    await contactpage.verifyFirstNameText() 
    await contactpage.enterFirstname('Manikandan')
    await contactpage.verifyLastNameText()
    await contactpage.enterLastname('Teknotrait')
    await contactpage.verifyEmailText()
    await contactpage.enterEmail('test@gmail.com')
    await contactpage.verifyPhoneNumberText()
    await contactpage.enterPhonenumber('1234567890')
    await contactpage.clickNextButton()
    await contactpage.verifyContactPage()

});