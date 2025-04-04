import { expect } from '@playwright/test';
import { HomePage } from "../../Nada/Pages/homePage.js";
//import HomePage from "../../Nada/Pages/homePage.js"

export class ContactPage{  

    constructor(page) {
       
        //console.log("runner page ", page);
        this.page = page;
        this.applynowbtn = this.page.locator('[id=":r3:"]');
        this.firstnametext = this.page.locator('[id=":r2:"]');
        this.lastnametext = this.page.locator('[id=":r3:"]');
        this.emailtext = this.page.locator('[id=":r4:"]');
        this.phonenumbertext = this.page.locator('[id=":r5:"]');
        this.nextbtn = this.page.locator('[id="pos_email_next_button"]');
            }
  
    async navigateToHomePage() {
        const homepage = new HomePage(this.page);
        await homepage.navigateToHomePage();
    }

    async clickApplyNowButton() {
        await this.applynowbtn.click();
    } 
    async verifyFirstNameText() {
        const placeHolderText = await this.page.locator('[id=":r2:"]').getAttribute('placeholder');
        expect(placeHolderText).toBe('Enter First Name');
    }
    async enterFirstname(firstname) {
        await this.firstnametext.fill(firstname);
          
    }
    async verifyLastNameText() {
        const placeHolderText = await this.page.locator('[id=":r3:"]').getAttribute('placeholder');
        expect(placeHolderText).toBe('Enter Last Name');
    }
    async enterLastname(lastname) {
        await this.lastnametext.fill(lastname);
        
    }
    async verifyEmailText() {
        const placeHolderText = await this.page.locator('[id=":r4:"]').getAttribute('placeholder');
        expect(placeHolderText).toBe('Enter email address');
    }
    async enterEmail(email) {
        await this.emailtext.fill(email);
    }  
    async verifyPhoneNumberText() {
        const placeHolderText = await this.page.locator('[id=":r5:"]').getAttribute('placeholder');
        expect(placeHolderText).toBe('Enter mobile number');
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
      
}
//module.export =  contactPage;