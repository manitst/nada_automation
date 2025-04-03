import { test, expect, chromium } from "@playwright/test";
import { HomePage } from "../../Nada/Pages/homePage.js";


test('@smoke Home page', async ({ page }) => {

   const homepage = new HomePage(page);

   await homepage.navigateToHomePage()
   await homepage.verifyHomePage()
   await homepage.verifyHomePageLogo()
   generateReport(page, 'Home Page')
   
   //await page.goto('https://hitch-hei.onrender.com/');
   //await expect(page.locator('text=Access your Home Equity —')).toBeVisible();
   //await expect(page.locator('text=Access your Home Equity —')).toHaveText('Access your Home Equity —  No Debt, No Monthly Payments');
});

//  test('@smoke Home page', async ({ page }) => {
//     await page.goto('https://hitch-hei.onrender.com/');
//     //await expect(page.locator('text=Access your Home Equity —')).toBeVisible();
//     await expect(page.locator('text=Access your Home Equity —')).toHaveText('Access your Home Equity —  No Debt, No Monthly Payments');
//  });