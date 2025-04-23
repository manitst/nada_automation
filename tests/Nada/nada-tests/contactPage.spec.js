import { test, expect, chromium } from "@playwright/test";
import { HomePage } from "../pages/homePage.js";
import { ContactPage } from "../pages/contactPage.js";
import { generateUniqueEmail } from "../Utils/commonUtils.js";

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

test('@regression @TC-NADA-22-1 @TC-NADA-26 verify the error messages when user does not enters any data', async ({ page }) => {

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
test('@regression @TC-NADA-23 verify when the user enter valid data then user can proceed to next page ', async ({ page }) => {

    const homepage = new HomePage(page);
    const contactpage = new ContactPage(page)
    
    await homepage.navigateToHomePage()
    await contactpage.clickApplyNowButton()
    await contactpage.enterFirstname('Test')
    await contactpage.enterLastname('Automation')
    await contactpage.enterEmail(generateUniqueEmail())
    await contactpage.enterPhonenumber('1234567890')
    await contactpage.clickHomeSharePgmbtn()
    await contactpage.clickNextButton()
    const currentPage = await contactpage.verifyUserDirectedToPropertyDetailsPage();
    console.log('currentPage-', currentPage);
    expect(currentPage).toBe('https://hitch-hei.onrender.com/apply/home-value'); // Update the expected URL as needed
});
test('@regression @TC-NADA-24 verify whether the correct menu is highlighted', async ({ page }) => { 
    
        const homepage = new HomePage(page);
        const contactpage = new ContactPage(page)
        
        await homepage.navigateToHomePage()
        await contactpage.clickApplyNowButton()
        const isHighlighted = await contactpage.contactInfoMenu.evaluate((element) => {
            return window.getComputedStyle(element).borderColor === 'rgb(0, 198, 94)'; // Check if the background color is white
        }); 
        console.log(isHighlighted);
        if(isHighlighted === true)
        {
            console.log('Contact Info menu is highlighted in green color');
        }
        else
        {
            console.log('Contact Info menu is not highlighted in green color');
        }
    
    });
    test('@regression @TC-NADA-25 verify the contact info menu number', async ({ page }) => {
        
            const homepage = new HomePage(page);
            const contactpage = new ContactPage(page)
            
            await homepage.navigateToHomePage()
            await contactpage.clickApplyNowButton()
            const contactInfoMenuNumber = await contactpage.contactInfoMenuNumber.innerText();
            console.log('contactInfoMenuNumber-', contactInfoMenuNumber);
            expect(contactInfoMenuNumber).toBe('1'); 
            const stepNumber = await contactpage.stepNumber.innerText();
            console.log('stepNumber-', stepNumber);
            expect(stepNumber).toContain('1'); 
            const stepNumberExtracted = stepNumber.match(/\d+/)?.[0];
            expect(contactInfoMenuNumber).toBe(stepNumberExtracted);
    });
    test('@regression @TC-NADA-27 verify all the links are available in the footer of the page', async ({ page }) => {
        
            const homepage = new HomePage(page);
            const contactpage = new ContactPage(page)
            await homepage.navigateToHomePage()
            await contactpage.clickApplyNowButton()
            expect(await contactpage.NMLSConsumerAccesslink.isVisible());
            expect(await contactpage.privacyLink.isVisible());
            expect(await contactpage.termsLink.isVisible());
            expect(await contactpage.licensingLink.isVisible());
            expect(await contactpage.logoutlink.isVisible());        
            
    }); 
    test('@regression @TC-NADA-28 verify contact phone number is visible in header ', async ({ page }) => {
            
                const homepage = new HomePage(page);
                const contactpage = new ContactPage(page)
                await homepage.navigateToHomePage()
                await contactpage.clickApplyNowButton()
                expect(await contactpage.verifyGiveUsACallNumberIsvisible()).toBeVisible();
                console.log('Give us a call number is visible in header');

    });
    test('@regression @TC-NADA-29 verify email option is visible in header ', async ({ page }) => {
            
                const homepage = new HomePage(page);
                const contactpage = new ContactPage(page)
                await homepage.navigateToHomePage()
                await contactpage.clickApplyNowButton()
                expect(await contactpage.verifyEmailUsLinkIsVisible()).toBeVisible();
                console.log('Email us link is visible in header'); 
    });
