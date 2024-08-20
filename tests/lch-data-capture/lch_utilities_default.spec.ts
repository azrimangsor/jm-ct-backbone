import { test, expect } from '@playwright/test';
import { BasePage } from '../../pages/basePage';
import { LCHPage } from '../../pages/lch_basePage';

test('Verify DCF LCH Utilities - Insert', async ({ page }, testInfo) => {
    const base = new BasePage(page);
    const lchPage = new LCHPage(page);

    await base.navigateToLCH(process.env.LCH_DCF_URL!);

    await lchPage.login_default();

    await page.getByText('Utilities').click();

    await page.locator('#utilities\\.temperature').fill('200');
    await page.locator('#utilities\\.temperature_select').click();
    await lchPage.selectTempretureUnit('Celsius');
    
    await page.locator('#utilities\\.pressure').fill('80');
    await page.locator('#utilities\\.pressure_select').click();
    await lchPage.selectPressureUnit('Bar (a)');

    //await page.locator('main div').filter({ hasText: 'Do you have a use for export steam?YesNoSteam export acceptable' }).getByLabel('No').check();
    await page.locator('input[name="fieldset-utilities.haveExportSteamUse"][value="no"]').check();
    
    //await page.locator('main div').filter({ hasText: 'Is import steam available if required by JM?YesNoCarbon intensity of imported' }).getByLabel('No').check();
    await page.locator('input[name="fieldset-utilities.isImportSteamAvailable"][value="no"]').check();

    await page.getByLabel('No preference').check();
    await page.locator('input[name="fieldset-utilities\\.coolingWaterTemperatureAndPressureJMValue"]').first().check();
    await page.locator('input[name="fieldset-utilities\\.coolingAirStreamTemperatureJMValue"]').first().check();

    await page.getByLabel('If you know how you will').click();
    await page.getByLabel('If you know how you will').fill('No');
    await page.locator('div').filter({ hasText: /^Power generation using hydrogen fuel\?RecommendedYesNo$/ }).getByLabel('Yes').check();
    await page.locator('div').filter({ hasText: /^Power generation using non-hydrogen fuel\?Recommendedshow contentYesNo$/ }).getByLabel('Yes').check();
    await page.locator('div').filter({ hasText: /^Power from import\?RecommendedYesNo$/ }).getByLabel('Yes').check();

    await page.getByLabel('Carbon intensity of imported').click();
    await page.getByLabel('Carbon intensity of imported').fill('100');

    await page.locator('div').filter({ hasText: /^Imported renewable power available\?RecommendedYesNo$/ }).getByLabel('Yes').check();
    
    await page.getByLabel('Nitrogen conditions and').click();
    await page.getByLabel('Nitrogen conditions and').fill('no');
    await page.locator('input[name="fieldset-utilities\\.hydrogenAvailableForCatalystsReduction"]').nth(1).check();

    await expect(page.locator(lchPage.saveStatus)).toContainText('Saved');

    await page.locator(lchPage.buttonNotifyJM).click();

    await page.locator(lchPage.buttonSendNotification).getByText('Send Notification').click();
    
    await page.locator(lchPage.notificationMsgBox).getByText('Notification sent!').isVisible();

    await page.locator(lchPage.buttonCloseNotification).click();
})