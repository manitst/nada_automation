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
    await page.getByRole('textbox', { name: 'Enter email' }).click();
    await page.getByRole('textbox', { name: 'Enter email' }).fill('manikandan.k@teknotrait.com');
    await page.getByRole('button', { name: 'Submit' }).click();
    
    //await expect(page.waitForSelector('A magic link has been sent to').toBeVisible());
await expect(page.locator('text=A magic link has been sent to')).toBeVisible();
    
    //await page.getByRole('textbox', { name: 'Enter home value' }).click();

});