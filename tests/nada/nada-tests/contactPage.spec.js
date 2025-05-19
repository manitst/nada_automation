import { test, expect, chromium } from "@playwright/test";
import { HomePage } from "../pages/homePage.js";
import { ContactPage } from "../pages/contactPage.js";
import { generateUniqueEmail } from "../utils/commonUtils.js";



test('@regression @TC-NADA-22 verify placeholder text of all the text fields in contact info page ', async ({ page }) => {

    const homepage = new HomePage(page);
    const contactpage = new ContactPage(page)

    await homepage.navigateToHomePage()
    await contactpage.clickApplyNowButton()
    const placeHolderText = await contactpage.verifyFirstNamePlaceHolderText();
    console.log('placeHolderText-', placeHolderText)
    expect(placeHolderText).toBe('Enter First Name');
    const lastNamePlaceHolderText = await contactpage.verifyLastNamePlaceHolderText();
    console.log('lastNamePlaceHolderText-', lastNamePlaceHolderText);
    expect(lastNamePlaceHolderText).toBe('Enter Last Name');
    const emailPlaceHolderText = await contactpage.verifyEmailPlaceHolderText();
    console.log('emailPlaceHolderText-', emailPlaceHolderText);
    expect(emailPlaceHolderText).toBe('Enter email address');
    const phoneNumberPlaceHolderText = await contactpage.verifyPhoneNumberPlaceHolderText();
    console.log('phoneNumberPlaceHolderText-', phoneNumberPlaceHolderText);
    expect(phoneNumberPlaceHolderText).toBe('Enter mobile number');
    await contactpage.enterFirstname('Test')
    await contactpage.enterLastname('Automation')
    await contactpage.enterEmail(generateUniqueEmail())
    await contactpage.enterPhonenumber('1234567890')
    await contactpage.clickHomeSharePgmbtn()
    await contactpage.clickNextButton()
    const currentPage = await contactpage.verifyUserDirectedToPropertyDetailsPage();
    console.log('currentPage-', currentPage);
    expect(currentPage).toBe('https://hitch-hei.onrender.com/apply/home-value');
});

