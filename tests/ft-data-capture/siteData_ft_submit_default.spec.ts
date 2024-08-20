import { test, expect } from '@playwright/test';
import { FTPage } from '../../pages/ft_basePage';
import { BasePage} from '../../pages/basePage';

test('Verify DCF LCH FT Site Data - Insert', { tag : '@smoke' }, async ({ page }, testInfo) => {
    const ftPage = new FTPage(page);
    const base = new BasePage(page);

    await test.step('Login to FT DCF home page', async () => {
        await base.navigateToFT(process.env.FT_DCF_URL!);

        await ftPage.login_default();
    });

    await test.step('Open Site Data page', async () => {
        await page.locator(ftPage.siteData).click();
    });

    await test.step('Fill in site details', async () => {

        await page.locator(ftPage.siteLocation).fill('Location insert here');
        
        await page.locator(ftPage.siteSeaLevel).fill('100');
        await page.locator(ftPage.siteSeaLevelUnit).click();
        await base.selectValueFromDropDown('Metres (m)');

        await page.locator(ftPage.siteSeaLevelRelative).fill('100');
        await page.locator(ftPage.siteSeaLevelRelativeUnit).click();
        await base.selectValueFromDropDown('Metres (m)');

        await page.locator(ftPage.siteCostalEnvironment).fill('Coastal location insert here');

        await page.locator(ftPage.siteAirQuality).fill('Air quality data insert here');

        await page.locator(ftPage.siteLimitStructureHeight).fill('50');
        await page.locator(ftPage.siteLimitStructureHeightUnit).click();
        await base.selectValueFromDropDown('Metres (m)');

        await page.locator(ftPage.siteYearlyTempreture).fill('50');
        await page.locator(ftPage.siteYearlyTempretureUnit).click();
        await base.selectValueFromDropDown('C');

        await page.locator(ftPage.siteAverageYearlyTempreture).fill('50');
        await page.locator(ftPage.siteAverageYearlyTempretureUnit).click();
        await base.selectValueFromDropDown('C');

        await page.locator(ftPage.siteDesignBarometricPressure).fill('7');
        await page.locator(ftPage.siteDesignBarometricPressureUnit).click();
        await base.selectValueFromDropDown('Bar (a)');

        await page.locator(ftPage.siteAmbientTemperatureForTankVenting).fill('50');
        await page.locator(ftPage.siteAmbientTemperatureForTankVentingUnit).click();
        await base.selectValueFromDropDown('C');      

        await page.locator(ftPage.siteMaximumTemperatureForDryBulb).fill('50');
        await page.locator(ftPage.siteMaximumTemperatureForDryBulbUnit).click();
        await base.selectValueFromDropDown('C');   

        await page.locator(ftPage.siteMinimumDesignTemperatureForEquipment).fill('50');
        await page.locator(ftPage.siteMinimumDesignTemperatureForEquipmentUnit).click();
        await base.selectValueFromDropDown('C');   

        await page.fill('input#siteData\\.averageRelativeHumidity', '7');
    });

    await test.step('Notify JM', async () => {
        await page.locator(ftPage.buttonNotifyJM).click();

        await Promise.all([
            page.waitForResponse((response) =>
                response.url().includes('/notify') && response.status() === 200
            ),

            page.locator(ftPage.buttonSendNotification).getByText('Send Notification').click()
        ]);

        await page.locator(ftPage.notificationMsgBox).getByText('Notification sent!').isVisible();
    });
})