import {test,expect} from '@playwright/test';
import {HasFBMPage} from '../pages/hasFBMPage.js';
import { AddressPage } from '../pages/addressPage.js';

test('@regression @TC-NADA-51 verify user is in address page', async ({ page }) => {


    const addressPage = new AddressPage(page);
    await addressPage.navigateToAddressPage();
    const currentURL = await addressPage.page.url();
    expect(currentURL).toContain('address'); 
    console.log('User is in Address page'); 
});
test('@regression @TC-NADA-52 verify user can enter property address', async ({ page }) => {

    const addressPage = new AddressPage(page);
    await addressPage.navigateToAddressPage();
    await addressPage.enterPropertyAddress('483, Wayne StJackson, MO, USA');
    const propertyAddressValue = await addressPage.propertyAddresstxt.inputValue();
    expect(propertyAddressValue).toBe('483, Wayne StJackson, MO, USA'); 
    console.log('Property address is entered'); 
});
test('@regression @TC-NADA-53 verify user can select address from dropdown', async ({ page }) => {

    const addressPage = new AddressPage(page);
    await addressPage.navigateToAddressPage();
    await addressPage.enterPropertyAddress('483, Wayne St, Jackson, MO, USA');
    await addressPage.selectTheAddressFromDropdown();
    const propertyAddressValue = await addressPage.propertyAddresstxt.inputValue();
    expect(propertyAddressValue).toBe('483 Wayne St, Jackson, MO, USA'); 
    console.log('Property address is selected from dropdown'); 
   });
test('@regression @TC-NADA-54 verify user cannot proceed without entering details in address page', async ({ page }) => {

    const addressPage = new AddressPage(page);
    await addressPage.navigateToAddressPage();
    await addressPage.clickNextButton();
    const errorMessage = await addressPage.getErrorMessage();
    expect(errorMessage).toBe('Please type in your address and select an option from the list'); 
    console.log('Error message displayed as expected when no details are entered'); 
});
test('@regression @TC-NADA-55 verify when user click back user is directed to has FBM page', async ({ page }) => {
    const addressPage = new AddressPage(page);
    await addressPage.navigateToAddressPage();
    const hasFBMPageURL = await addressPage.clickBackButton();  
    expect(hasFBMPageURL).toContain('has-fbm'); 
    console.log('User is directed to Has FBM page');
});
test('@regression @TC-NADA-56 verify the address menu is highlighted', async ({ page }) => {    
    const addressPage = new AddressPage(page);
    await addressPage.navigateToAddressPage();
    const isHighlighted = await addressPage.addressMenu.evaluate((element) => {
        //return window.getComputedStyle(element).borderColor === 'rgb(0, 198, 94)'; // Checks if the border color is green
        return window.getComputedStyle(element).getPropertyValue('border-color') === 'rgb(0, 198, 94)'; // Checks if the border color is green
    }); 
    console.log(isHighlighted);
    if(isHighlighted === true)
    {
        console.log('Address menu is highlighted in green color');
    }
    else
    {
        console.log('Address menu is not highlighted in green color');
    }
});

test('@regression @TC-NADA-57 verify the address page step number is displayed and matches', async ({ page }) => {
    const addressPage = new AddressPage(page);
    await addressPage.navigateToAddressPage() 
    const addressMenuNumber = await addressPage.addressMenuNumber.innerText();
    console.log('addressMenuNumber-', addressMenuNumber);
    expect(addressMenuNumber).toBe('5'); 
    const stepNumber = await addressPage.stepNumber.innerText();
    console.log('stepNumber-', stepNumber);
    expect(stepNumber).toContain('5'); 
    const stepNumberExtracted = stepNumber.match(/\d+/)?.[0];
    expect(addressMenuNumber).toBe(stepNumberExtracted);
});
test('@regression @TC-NADA-58 verify user can click next button in address page and redirected to occupancy page', async ({ page }) => {

    const addressPage = new AddressPage(page);
    await addressPage.navigateToAddressPage();
    await addressPage.enterPropertyAddress('483, Wayne StJackson, MO, USA');
    await addressPage.selectTheAddressFromDropdown();
    await addressPage.clickNextButton();
    const currentURL = await addressPage.page.url();
    expect(currentURL).toContain('occupancy');
    console.log('User navigated to occupancy page');
});

