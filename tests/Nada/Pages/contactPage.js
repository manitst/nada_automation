import { expect } from '@playwright/test';
import { HomePage } from "../../nada/pages/homePage.js";


export class ContactPage{  

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

      
}
