import {test,expect} from '@playwright/test';
import { HasFBMPage } from '../pages/hasFBMPage.js';
import { AddressPage } from '../pages/addressPage.js';
import { OccupancyPage } from '../pages/occupancyPage.js';
import { HomeValuePage } from '../pages/homeValuePage.js';

test('@regression @TC-NADA-59 verify user is in occupancy page', async ({ page }) => {
    test.setTimeout(50000);
    const occupancyPage = new OccupancyPage(page);
    await occupancyPage.navigateToOccupancyPage();
    const currentURL = await occupancyPage.page.url();
    expect(currentURL).toContain('occupancy');
    console.log('User is in Occupancy page');
});
test('@regression @TC-NADA-60 verify user is able to select occupancy type as primary home', async ({ page }) => {
    test.setTimeout(40000);
    const occupancyPage = new OccupancyPage(page);
    await occupancyPage.navigateToOccupancyPage();
    await occupancyPage.clickPrimaryHomeRadioButton();
    await occupancyPage.clickNextButton();
    const currentURL = await occupancyPage.page.url();
    expect(currentURL).toContain('disclaimer');
    console.log('User is in disclaimer page after selecting occupancy type');
});
test('@regression @TC-NADA-61 verify user is able to select occupancy type as secondary home', async ({ page }) => {
    test.setTimeout(40000);
    const occupancyPage = new OccupancyPage(page);
    await occupancyPage.navigateToOccupancyPage();
    await occupancyPage.clickSecondaryHomeRadioButton();
    await occupancyPage.enterSecondaryHomeAddress('8315 BUNKER HILL ROAD, ANTHILL,MO 65488');
    await occupancyPage.clickNextButton();
    const currentURL = await occupancyPage.page.url();
    expect(currentURL).toContain('disclaimer');
    console.log('User is in disclaimer page after selecting occupancy type');
});
test('@regression @TC-NADA-62 verify user is able to select occupancy type as investment', async ({ page }) => {
    test.setTimeout(40000);
    const occupancyPage = new OccupancyPage(page);
    await occupancyPage.navigateToOccupancyPage();
    await occupancyPage.clickInvestmentRadioButton();
    await occupancyPage.enterInvestmentHomeAddress('9614 ORIOLE LANE, ANTHILL,MO 65488');
    await occupancyPage.clickNextButton();
    const currentURL = await occupancyPage.page.url();
    expect(currentURL).toContain('disclaimer');
    console.log('User is in disclaimer page after selecting occupancy type');
});
test('@regression @TC-NADA-63 verify user is able to click back button in occupancy page', async ({ page }) => {
    test.setTimeout(40000);
    const occupancyPage = new OccupancyPage(page);
    const homevaluepage = new HomeValuePage(page);
    await occupancyPage.navigateToOccupancyPage();
    const currentURL = await homevaluepage.clickBackButton();
    console.log('Back button in occupancy page is clicked');
    expect(currentURL).toContain('address');
    console.log('User is in address page after clicking back button in occupancy page');
});
test('@regression @TC-NADA-64 verify occupancy menu in highlighted', async ({ page }) => {
    test.setTimeout(40000);
    const occupancyPage = new OccupancyPage(page);
    await occupancyPage.navigateToOccupancyPage();
    await expect(occupancyPage.occupancyMenu).toHaveCSS('border-color', 'rgb(0, 198, 94)');
    const isHighlighted = await occupancyPage.occupancyMenu.evaluate((element) => {
    return window.getComputedStyle(element).borderColor === 'rgb(0, 198, 94)'; // Checks if the border color is green
     });
    console.log(isHighlighted);
    if(isHighlighted === true)
    {
        console.log('Occupancy menu is highlighted in green color');
    }
    else
    {
        console.log('Occupancy menu is not highlighted in green color');
    }
    });
test('@regression @TC-NADA-65 verify occupancy step number is displayed and matches', async ({ page }) => { 
    test.setTimeout(40000);
    const occupancyPage = new OccupancyPage(page);
    await occupancyPage.navigateToOccupancyPage();
    const occupancyMenuNumber = await occupancyPage.occupancyMenuNumber.innerText();
    console.log('occupancyMenuNumber-', occupancyMenuNumber);
    expect(occupancyMenuNumber).toBe('6'); 
    const stepNumber = await occupancyPage.stepNumber.innerText();
    console.log('stepNumber-', stepNumber);
    expect(stepNumber).toContain('6'); 
    const stepNumberExtracted = stepNumber.match(/\d+/)?.[0];
    expect(occupancyMenuNumber).toBe(stepNumberExtracted);
});