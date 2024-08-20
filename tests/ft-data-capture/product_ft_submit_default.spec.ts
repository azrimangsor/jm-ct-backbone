import { test, expect } from '@playwright/test';
import { FTPage } from '../../pages/ft_basePage';
import { BasePage} from '../../pages/basePage';

test('Verify DCF LCH FT Products - Accept Typical Value', { tag : '@smoke' }, async ({ page }, testInfo) => {
    const ftPage = new FTPage(page);
    const base = new BasePage(page);

    await test.step('Login to FT DCF home page', async () => {
        await base.navigateToFT(process.env.FT_DCF_URL!);

        await ftPage.login_default();
    });

    await test.step('Open Product page', async () => {
        await page.locator(ftPage.products).click();
    });

    await page.locator('input[name="fieldset-products.JMWaxTypicalValuesAcceptable"][value="yes"]').check();
    
    await page.locator('input[name="fieldset-products.JMLightHydrocarbonCondensateTypicalValuesAcceptable"][value="yes"]').check();

    await page.locator('input[name="fieldset-GLOBAL.basisForPlantCapacity"][value="Final Product"]').check();

    await page.locator('input#GLOBAL\\.basisForPlantCapacityCapacityRequired').fill('70');
    await page.locator('div#GLOBAL\\.basisForPlantCapacityCapacityRequired_select').click();
    await ftPage.selectCapacityMeasurements('bbl/d')

    await page.locator('input#GLOBAL\\.minimumTurndownPercentageCapacity').fill('50');
    
    await page.locator('input#GLOBAL\\.operatingHoursPerYear').fill('4368');

    await page.locator('input[name="fieldset-GLOBAL.requiresMultipleTrains"][value="no"]').check();

    await page.locator(ftPage.buttonNotifyJM).click();

    await Promise.all([
        page.waitForResponse((response) =>
            response.url().includes('/notify') && response.status() === 200
        ),

        page.locator(ftPage.buttonSendNotification).getByText('Send Notification').click()
    ]);

    await page.locator(ftPage.notificationMsgBox).getByText('Notification sent!').isVisible();
})