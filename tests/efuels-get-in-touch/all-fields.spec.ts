import { test, TestInfo } from '@playwright/test';
import { EFPage } from '../../pages/efuels_basePage';
import { BasePage } from '../../pages/basePage';
import { allure } from 'allure-playwright';

test('Verify EFuels Get In Touch Form - Fill in All Fields', { tag : '@e2e' }, async ({ page }, testInfo) => {
    const efpage = new EFPage(page);
    const base = new BasePage(page);

    allure.severity('normal');
    allure.description('Verify all input fields can be entered and for can be submit');

    // Step 1: Navigate to the EFuel URL and accept cookies
    await test.step('Step 1: Navigate to the EFuel URL and accept cookies', async () => {
        await base.navigateToURL(process.env.EFUEL_URL!);
        await page.locator(efpage.acceptAllCookies).click();
    });

    // Step 2: Open the "Get In Touch" form
    await test.step('Step 2: Open the "Get In Touch" form', async () => {
        await page.locator(efpage.btn_getInTouch).click();
    });

    // Step 3: Fill in personal information
    await test.step('Step 3: Fill in personal information', async () => {
        await efpage.enterTitle('Mr');
        await efpage.enterFirstName('John');
        await efpage.enterLastName('Locke');
        await efpage.enterWorkEmail('john.locke@dharma.com');
        await efpage.enterOrganisation('Dharma Initiative');
        await efpage.enterOfficeLocation('Hawaii, US');
    });

    // Step 4: Fill in project details
    await test.step('Step 4: Fill in project details', async () => {
        await efpage.selectOccupation('Consultant');
        await efpage.selectProjectStartDate();
        await efpage.selectProjectLocation('Mexico');
        await efpage.selectAmmoniaTypes('Electrolytic');
    });

    // Step 5: Enter specific project values
    await test.step('Step 5: Enter specific project values', async () => {
        await efpage.insertTargetHydrogen('90', 'Tonne/h');
        await efpage.selectHydrogenPurity('Cracked Gas');
        await efpage.selectHydrogenApplication('Power generation');
        await efpage.insertProcessEmissionTarget('200');
        await efpage.insertAmmoniaFeedstockPrice('125', '$/tonne');
        await efpage.insertPlotSpaceLimitation('100', 'ft²');
    });

    // Step 6: Add comments and consent
    await test.step('Step 6: Add comments and consent', async () => {
        await efpage.insertComment();
        await efpage.setMarketingConsent('yes');
    });

    // Step 7: Submit the form and close the confirmation
    //await test.step('Step 7: Submit the form and close the confirmation', async () => {
    //    await efpage.clickSendButton();
    //    await page.getByLabel('close').click();
    //});
})