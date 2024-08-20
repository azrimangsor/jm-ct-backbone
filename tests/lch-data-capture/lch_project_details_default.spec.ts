import { test, expect } from '@playwright/test';
import { BasePage } from '../../pages/basePage';
import { LCHPage } from '../../pages/lch_basePage';
import { config } from '../config';

test('Verify DCF LCH Project Details - Third parties involved', {tag: '@smoke'}, async ({ page }, testInfo) => {
    const base = new BasePage(page);
    const lchPage = new LCHPage(page);

    await base.navigateToLCH(process.env.LCH_DCF_URL!);

    await lchPage.login_default();

    await page.getByText('Project Details').click();

    await page.locator('input#projectDetails\\.companyName').fill('Test Company LCH');

    await page.locator('textarea#projectDetails\\.companyAddress').fill('Pinner asda');

    await page.locator('input#projectDetails\\.keyContactName').fill('A N Other asdsad');

    await page.locator('input#projectDetails\\.keyContactEmail').fill('first@hotmail.com');

    await page.locator('input#projectDetails\\.additionalContactName').fill('Additional Contact Name');

    await page.locator('input#projectDetails\\.additionalContactEmail').fill('second@hotmail.com');

    await page.locator('#projectDetails\\.projectName').fill('LCH Test Project   asdasd');

    await page.locator('input#projectDetails\\.projectLocation').fill('London, UK');

    await page.locator('input[name="fieldset-projectDetails.thirdPartiesInvolved"][value="yes"]').click()

    await page.locator('textarea#projectDetails\\.thirdPartyInformation').fill('UK Government');

    await lchPage.notifyJM();

})

test('Verify DCF LCH Project Details - No third parties involved', async ({ page }, testInfo) => {
    let base: BasePage;
    let lchPage: LCHPage;

    base = new BasePage(page);
    lchPage = new LCHPage(page);

    await base.navigateToLCH(process.env.LCH_DCF_URL!);

    await lchPage.login_default();

    //await page.once('load', () => console.log('Test Page loaded!'));
    //const currentURL = page.url();
  
    //console.log(`Proect Details Current URL: ${currentURL}`);

    //await base.addScreenshot(testInfo, 'lch_projectDetailsLoggedIn.png');

    await page.getByText('Project Details').click();

    await page.locator('input#projectDetails\\.companyName').fill('Test Company LCH');

    await page.locator('textarea#projectDetails\\.companyAddress').fill('Pinner asda');

    await page.locator('input#projectDetails\\.keyContactName').fill('A N Other asdsad');

    await page.locator('input#projectDetails\\.keyContactEmail').fill('first@hotmail.com');

    await page.locator('input#projectDetails\\.additionalContactName').fill('Additional Contact Name');

    await page.locator('input#projectDetails\\.additionalContactEmail').fill('second@hotmail.com');

    await page.locator('#projectDetails\\.projectName').fill('LCH Test Project   asdasd');

    await page.locator('input#projectDetails\\.projectLocation').fill('London, UK');

    //await page.getByLabel('Yes').check();
    await page.locator('input[name="fieldset-projectDetails.thirdPartiesInvolved"][value="no"]').click()

    //await page.locator('input#projectDetails.thirdPartyInformation').fill('UK Government');

    //await base.addScreenshot(testInfo, 'lch_projectDetailsFilled.png');
    const elementLocator = page.locator('input#projectDetails\\.thirdPartyInformation');

    // Verify the element does not exist
    const elementCount = await elementLocator.count();
    expect(elementCount).toBe(0);

})