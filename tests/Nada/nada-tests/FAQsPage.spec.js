import {test , expect} from '@playwright/test';
import { FAQsPage } from '../pages/FAQsPage.js';
 
test('@regression @TC-NADA-20 Verify FAQs page is displayed', async ({ page }) => {

    const faqsPage = new FAQsPage(page);
    await faqsPage.navigateToFAQs();
    const faqsHeaderText = await faqsPage.getFAQsHeader();
    expect(faqsHeaderText).toBeVisible();
});
test('@regression @TC-NADA-20-1 Verify FAQs section question 1 is displayed', async ({ page }) => {
    const faqsPage = new FAQsPage(page);
    await faqsPage.navigateToFAQs();
    const faqsSectionQuestion1Text = await faqsPage.verifyFAQsSectionQuestion1();
    expect(faqsSectionQuestion1Text).toBeVisible();
    const faqsSectionQuestion1attValue = await faqsPage.verifyUserExpandsFAQsSectionQuestion1();
    expect(faqsSectionQuestion1attValue).toHaveAttribute('aria-expanded', 'false');
}); 

test('@regression @TC-NADA-20-2 Verify user can expand the question using plus icon', async ({ page }) => {
    const faqsPage = new FAQsPage(page);
    await faqsPage.navigateToFAQs();
    const faqsSectionDataId = await faqsPage.verifyFAQsQuestionExpandable();
    expect(faqsSectionDataId).toHaveAttribute('aria-expanded', 'false');
});
