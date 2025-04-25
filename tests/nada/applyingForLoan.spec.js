import { test, expect, chromium } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    // This hook ensures a clean slate before each test
    await page.goto('about:blank'); // Optional: Navigate to a blank page
});




test('@regression Applying for Loan', async ({page}) => {
    
    await page.goto('https://hitch-hei.onrender.com/');
    await expect(page.locator('text=Access your Home Equity —')).toBeVisible();
    await expect(page.locator('text=Access your Home Equity —')).toHaveText('Access your Home Equity —  No Debt, No Monthly Payments');
    //await expect(page.getByRole('button', { name: 'Apply Now' })).toBeVisible();
    await expect(page.locator('[id=":r3:"]')).toBeVisible();
    await page.locator('[id=":r3:"]').click();
    await page.locator('[id=":r0:"]').click();
    //await page.locator('[id=":r0:"]').fill('testuser2024');
    await page.locator('[id=":r1:"]').click();
    await page.locator('[id=":r2:"]').click();
    await page.locator('[id=":r3:"]').click();
    await expect(page).toHaveURL('https://hitch-hei.onrender.com/apply/contact');
    await page.locator('[id="pos_email_next_button"]').click();
    await expect(page.getByRole('link', { name: '(833) 463-' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'processing@nada.co' })).toBeVisible();


    await page.goto('https://hitch-hei.onrender.com/apply/home-value');
    await expect(page).toHaveURL('https://hitch-hei.onrender.com/apply/login');
    //await page.getByRole('textbox', { name: 'Enter home value' }).click();

});

/* test('@regression Applying for loan', async ({ page }) => {
   await page.goto('https://hitch-hei.onrender.com/');
   await page.getByRole('button', { name: 'Apply Now' }).first().click();
   await page.getByRole('textbox', { name: 'Enter First Name' }).click();
   await page.getByRole('textbox', { name: 'Enter Last Name' }).click();
   await page.getByRole('textbox', { name: 'Enter email address' }).click();
   await page.getByRole('textbox', { name: 'Enter mobile number' }).click();
   await page.getByRole('button', { name: 'Next' }).click();
   await page.goto('https://hitch-hei.onrender.com/apply/home-value');
   await page.getByRole('textbox', { name: 'Enter home value' }).click();
   await page.getByRole('textbox', { name: 'Enter home value' }).fill('45,0000');
   await page.getByRole('textbox', { name: 'Enter home value' }).press('Tab');
   await page.getByRole('textbox', { name: 'Enter mortgage balance' }).fill('0');
   await page.getByRole('textbox', { name: 'Enter mortgage balance' }).press('Tab');
   await page.getByRole('combobox', { name: 'Select Property type' }).click();
   await page.getByRole('option', { name: 'Single Family' }).click();
   await page.getByRole('button', { name: 'Next' }).click();
   await page.getByRole('radio', { name: '+' }).check();
   await page.getByRole('radio', { name: 'No' }).check();
   await page.getByRole('button', { name: 'Next' }).click();
   await page.locator('div').filter({ hasText: /^Did you have any foreclosures in the last 4 years\?YesNo$/ }).getByLabel('No').check();
   await page.locator('div').filter({ hasText: /^Did you file for bankruptcy in the last 4 years\?YesNo$/ }).getByLabel('No').check();
   await page.locator('div').filter({ hasText: /^Did you make any modifications to the property in the last 4 years\?YesNo$/ }).getByLabel('No').check();
   await page.getByRole('button', { name: 'Next' }).click();
   await page.getByRole('textbox', { name: 'Property Address' }).click();
   await page.getByRole('textbox', { name: 'Property Address' }).fill('2246 Rush Bay Way, Orlando, FL 32824');
   await page.getByText('Rush Bay WayOrlando, FL 32824, USA').click();
   await page.getByRole('button', { name: 'Next' }).click();
   await page.getByRole('radio', { name: 'Primary Home' }).check();
   await page.goto('https://hitch-hei.onrender.com/apply/disclaimer');
   await page.getByRole('textbox', { name: 'MM/DD/YYYY' }).fill('11/12/1971');
   await page.getByRole('textbox').nth(1).click();
   await page.getByRole('checkbox', { name: 'By clicking the "I AGREE"' }).check();
   await page.getByRole('button', { name: 'I AGREE' }).click();
   await page.getByRole('checkbox', { name: 'No existing mortgage for this' }).check();
   await page.getByRole('button', { name: 'Next' }).click();
   await page.getByRole('button', { name: 'Next' }).click();
   await page.getByText('Select you primary source of').click();
   await page.getByRole('option', { name: 'Employed full-time' }).click();
   await page.getByRole('textbox', { name: 'Enter current employer' }).click();
   await page.getByRole('textbox', { name: 'Enter current employer' }).fill('acme  engineers');
   await page.getByRole('textbox', { name: 'MM/YYYY' }).click();
   await page.getByRole('textbox', { name: 'MM/YYYY' }).fill('10/2020');
   await page.getByPlaceholder('In years').click();
   await page.getByPlaceholder('In years').fill('12');
   await page.getByRole('button', { name: 'Next' }).click();
   await page.locator('div').filter({ hasText: /^Is this property held in a trust\?YesNo$/ }).getByLabel('No').check();
   await page.getByRole('radio', { name: 'Single' }).check();
   await page.locator('div').filter({ hasText: /^Is there anyone else on title\?YesNo$/ }).getByLabel('No').check();
   await page.getByRole('button', { name: 'Next' }).click();
   await page.goto('https://hitch-hei.onrender.com/offer/overview');
   await page.getByRole('button', { name: 'See All Tasks' }).click();
   await page.locator('.filepond--drop-label').first().click();
   await page.locator('#filepond--browser-pa2r6ejdh').setInputFiles('Chevrolet-Beat-Activ.jpg');
   await page.locator('#filepond--drop-label-olzn9fraz').getByText('Add documents').click();
   await page.locator('#filepond--browser-olzn9fraz').setInputFiles('Chevrolet-Beat-Activ.jpg');
   await page.locator('#filepond--drop-label-r5j49amzn').click();
   await page.locator('#filepond--browser-r5j49amzn').setInputFiles('Chevrolet-Beat-Activ.jpg');
   await page.locator('#filepond--drop-label-yguy4cqjb').getByText('Add documents').click();
   await page.locator('#filepond--browser-yguy4cqjb').setInputFiles('Chevrolet-Beat-Activ.jpg');
   await page.locator('#filepond--drop-label-c4vcgo7qj').getByText('Add documents').click();
   await page.locator('#filepond--browser-c4vcgo7qj').setInputFiles('Chevrolet-Beat-Activ.jpg');
   await page.getByRole('link', { name: 'Offer Details' }).click();

}); */