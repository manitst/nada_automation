import { test, expect, chromium } from "@playwright/test";
import { HomePage } from "../pages/homePage.js";
import { ContactPage } from "../pages/contactPage.js";

test.beforeEach(async ({ page }) => {
    
    await page.goto('about:blank'); 
});


test('@regression Contact page', async ({ page }) => {

    const homepage = new HomePage(page);
    const contactpage = new ContactPage(page)
    
    await homepage.navigateToHomePage()
    await contactpage.clickApplyNowButton()
     
    await contactpage.enterFirstname('Manikandan')
    
    await contactpage.enterLastname('Teknotrait')
    
    await contactpage.enterEmail('test@gmail.com')
   
    await contactpage.enterPhonenumber('1234567890')
    await contactpage.clickNextButton()
    await contactpage.verifyContactPage()

});
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
});

test('@regression @TC-NADA-22-1 verify the error messages when user does not enters any data', async ({ page }) => {

    const homepage = new HomePage(page);
    const contactpage = new ContactPage(page)
    
    await homepage.navigateToHomePage()
    await contactpage.clickApplyNowButton()
    await contactpage.enterFirstname('')
    await contactpage.enterLastname('')
    await contactpage.enterEmail('')
    await contactpage.enterPhonenumber('')
    await contactpage.clickNextButton()
    const errorMessageFirstName = await contactpage.verifyErrorMessageFirstName();
    console.log('errorMessageFirstName-', errorMessageFirstName)
    expect(errorMessageFirstName).toBe('First name required');
    const errorMessageLastName = await contactpage.verifyErrorMessageLastName();
    console.log('errorMessageLastName-', errorMessageLastName)
    expect(errorMessageLastName).toBe('Last name required');
    const errorMessageEmail = await contactpage.verifyErrorMessageEmail();
    console.log('errorMessageEmail-', errorMessageEmail)
    expect(errorMessageEmail).toBe('Email required');
    const errorMessagePhoneNumber = await contactpage.verifyErrorMessagePhoneNumber();
    console.log('errorMessagePhoneNumber-', errorMessagePhoneNumber)
    expect(errorMessagePhoneNumber).toBe('Phone number required');
});
