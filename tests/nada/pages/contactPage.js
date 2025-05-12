import { expect } from '@playwright/test';
import { HomePage } from "../../nada/pages/homePage.js";


export class ContactPage {

    constructor(page) {


        this.page = page;
        this.applynowbtn = this.page.locator('[id=":r3:"]');
        this.firstnametext = this.page.locator('[id=":r0:"]');
        this.lastnametext = this.page.locator('[id=":r1:"]');
        this.emailtext = this.page.locator('[id=":r2:"]');
        this.phonenumbertext = this.page.locator('[id=":r3:"]');
        this.nextbtn = this.page.locator('[id="pos_email_next_button"]');
        this.errorMessageFirstName = this.page.getByText('First name required')
        this.errorMessageLastName = this.page.getByText('Last name required');
        this.errorMessageEmail = this.page.getByText('Email required');
        this.errorMessagePhoneNumber = this.page.getByText('Phone number required');
        this.homeSharePgmbtn = this.page.getByRole('radio', { name: 'No' })
        this.contactInfoMenu = this.page.getByRole('link', { name: 'Contact Info' })
        this.contactInfoMenuNumber = this.page.locator('//*[@id="__next"]/div[1]/div[2]/aside/div[2]/a[1]/div/div');
        this.stepNumber = this.page.locator('span:has-text("Step 1")');
        this.NMLSConsumerAccesslink = this.page.locator('text=NMLS Consumer Access');
        this.privacyLink = this.page.getByRole('link', { name: 'Privacy', exact: true });
        this.termsLink = this.page.getByRole('link', { name: 'Terms', exact: true });
        this.licensingLink = this.page.getByRole('link', { name: 'Licensing', exact: true });
        this.logoutlink = this.page.getByRole('link', { name: 'Log Out' })
        this.giveUsACallNumber = this.page.getByRole('link', { name: '(833) 463-' });
        this.emailUsLink = this.page.getByRole('link', { name: 'processing@nada.co' });
    }

    async navigateToHomePage() {
        const homepage = new HomePage(this.page);
        await homepage.navigateToHomePage();
    }

    async clickApplyNowButton() {
        await this.applynowbtn.click();
    }
    async verifyFirstNamePlaceHolderText() {
        this.firstnametext.waitFor();
        return await this.firstnametext.getAttribute('placeholder');
    }
    async enterFirstname(firstname) {
        await this.firstnametext.fill(firstname);
    }
    async verifyLastNamePlaceHolderText() {
        this.lastnametext.waitFor();
        return await this.lastnametext.getAttribute('placeholder');
    }
    async enterLastname(lastname) {
        await this.lastnametext.fill(lastname);
    }
    async verifyEmailPlaceHolderText() {
        this.emailtext.waitFor();
        return await this.emailtext.getAttribute('placeholder');
    }
    async enterEmail(email) {
        await this.emailtext.fill(email);
        console.log('The email id is : ', email);
    }
    async verifyPhoneNumberPlaceHolderText() {
        await this.phonenumbertext.waitFor();
        return await this.phonenumbertext.getAttribute('placeholder');
    }
    async enterPhonenumber(phonenumber) {
        await this.phonenumbertext.fill(phonenumber);
    }
    async clickNextButton() {
        await this.nextbtn.click();
    }
    async verifyContactPage() {
        await expect(this.page.getByRole('link', { name: '(833) 463-' })).toBeVisible();
        await expect(this.page).toHaveURL('https://hitch-hei.onrender.com/apply/login');
    }
    async verifyErrorMessageFirstName() {
        await this.errorMessageFirstName.waitFor();
        return await this.errorMessageFirstName.innerText();
    }
    async verifyErrorMessageLastName() {
        await this.errorMessageLastName.waitFor();
        return await this.errorMessageLastName.innerText();
    }
    async verifyErrorMessageEmail() {
        await this.errorMessageEmail.waitFor();
        return await this.errorMessageEmail.innerText();
    }
    async verifyErrorMessagePhoneNumber() {
        await this.errorMessagePhoneNumber.waitFor();
        return await this.errorMessagePhoneNumber.innerText();
    }
    async clickHomeSharePgmbtn() {
        await this.homeSharePgmbtn.click();
    }
    async verifyUserDirectedToPropertyDetailsPage() {
        await this.page.waitForTimeout(5000); // Wait for 2 seconds to ensure the page has loaded
        return await this.page.url();
    }
    async verifyMenuIsHighlighted() {
        await this.contactInfoMenu.waitFor();
        return this.contactInfoMenu;
    }
    async getContactInfoMenuNumber() {
        await this.contactInfoMenuNumber.waitFor();
        return await this.contactInfoMenuNumber.innerText();
    }
    async getStepNumber() {
        await this.stepNumber.waitFor();
        return await this.stepNumber.innerText();
    }
    async verifyNMLSConsumerAccesslink() {
        await this.NMLSConsumerAccesslink.waitFor();
        return this.NMLSConsumerAccesslink;
    }
    async verifyPrivacyLink() {
        await this.privacyLink.waitFor();
        return this.privacyLink;
    }
    async verifyTermsLink() {
        await this.termsLink.waitFor();
        return this.termsLink;
    }
    async verifyLicensingLink() {
        await this.licensingLink.waitFor();
        return this.licensingLink;
    }
    async verifyLogoutlink() {
        await this.logoutlink.waitFor();
        return this.logoutlink;
    }
    async verifyGiveUsACallNumberIsvisible() {
        await this.giveUsACallNumber.waitFor();
        return this.giveUsACallNumber;
    }
    async verifyEmailUsLinkIsVisible() {
        await this.emailUsLink.waitFor();
        return this.emailUsLink;
    }




}
