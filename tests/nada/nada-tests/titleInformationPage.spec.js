import {test,expect} from '@playwright/test';
import {TitleInformation} from '../pages/titleInformationPage';
import { IncomePage } from '../pages/incomePage';
import { title } from 'process';

test('@regression @TC-NADA-81 Verify user can fill data in Title Information page and proceed to next page', async ({page})=>{
    test.setTimeout(70000);
    const titleInformation = new TitleInformation(page);
    const incomePage = new IncomePage(page);
    await titleInformation.navigateToTitleInformation();
    const currentURL =  await incomePage.clickNextButton();
    console.log('User in title information Page URL:', currentURL);
    expect(currentURL).toContain('title-information');
    await titleInformation.checkPropertyInTrustNoChkbox();
    await titleInformation.selectMartialStatusrdbox();
    await titleInformation.selectAnyoneOnTitleNo();
    const urlAfterClickingNext = await titleInformation.clickNextButton();
    console.log('current URL',urlAfterClickingNext);
    await expect(page).toHaveURL('https://hitch-hei.onrender.com/offer/overview');
});