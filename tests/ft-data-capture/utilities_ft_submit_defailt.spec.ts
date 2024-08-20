import { test, expect } from '@playwright/test';
import { FTPage } from '../../pages/ft_basePage';
import { BasePage} from '../../pages/basePage';

test('Verify DCF LCH FT Utilities - Insert', { tag : '@smoke' }, async ({ page }, testInfo) => {
    const ftPage = new FTPage(page);
    const base = new BasePage(page);

    await base.navigateToFT(process.env.FT_DCF_URL!);

    //Keyed in Username & Password and login
    await ftPage.login_default();

    await page.locator(ftPage.utilities).click();

    //Cooling Water Battery Limit Conditions Tempreture
    await page.locator('input#utilities\\.coolingWaterBatteryLimitTemperature\\.supply').fill('50');
    await page.locator('input#utilities\\.coolingWaterBatteryLimitTemperature\\.return').fill('70');
    await page.locator('input#utilities\\.coolingWaterBatteryLimitTemperature\\.design').fill('90');
    await page.locator('div#utilities\\.coolingWaterBatteryLimitTemperature_select').click();
    await page.locator('li[data-value="C"]').click();

    //Cooling Water Battery Limit Conditions Pressure
    await page.locator('input#utilities\\.coolingWaterBatteryLimitPressure\\.supply').fill('3');
    await page.locator('input#utilities\\.coolingWaterBatteryLimitPressure\\.return').fill('4');
    await page.locator('input#utilities\\.coolingWaterBatteryLimitPressure\\.design').fill('5');
    await page.locator('div#utilities\\.coolingWaterBatteryLimitPressure_select').click();
    await page.locator('li[data-value="Bar (a)"]').click();

    await page.fill('input#utilities\\.boilerFeedWaterBatteryLimitTemperature\\.normal', '70');
    await page.fill('input#utilities\\.boilerFeedWaterBatteryLimitTemperature\\.design', '100');
    await page.click('div#utilities\\.boilerFeedWaterBatteryLimitTemperature_select');
    await page.click('li[data-value="C"]');

    await page.fill('input#utilities\\.boilerFeedWaterBatteryLimitPressure\\.normal', '3');
    await page.fill('input#utilities\\.boilerFeedWaterBatteryLimitPressure\\.design', '4');
    await page.click('div#utilities\\.boilerFeedWaterBatteryLimitPressure_select');
    await page.click('li[data-value="Bar (a)"]');

    await page.check('input[name="fieldset-utilities.MPAndFTSteamImportAcceptable"][value="yes"]');

    //LP Steam Import Tempreture
    await page.fill('input#utilities\\.LPSteamImportTemperature\\.normal', '70');
    await page.fill('input#utilities\\.LPSteamImportTemperature\\.design', '100');
    await page.click('div#utilities\\.LPSteamImportTemperature_select');
    await page.click('li[data-value="C"]');

    //LP Steam Import Pressure
    await page.fill('input#utilities\\.LPSteamImportPressure\\.normal', '5');
    await page.fill('input#utilities\\.LPSteamImportPressure\\.design', '6');
    await page.click('div#utilities\\.LPSteamImportPressure_select');
    await page.click('li[data-value="Bar (a)"]');

    //LP Nitrogen Tempreture
    await page.fill('input#utilities\\.LPNitrogenTemperature\\.normal', '70');
    await page.fill('input#utilities\\.LPNitrogenTemperature\\.design', '90');
    await page.click('div#utilities\\.LPNitrogenTemperature_select');
    await page.click('li[data-value="C"]');

    //LP Nitrogen Pressure
    await page.fill('input#utilities\\.LPNitrogenPressure\\.normal', '5');
    await page.fill('input#utilities\\.LPNitrogenPressure\\.design', '6');
    await page.click('div#utilities\\.LPNitrogenPressure_select');
    await page.click('li[data-value="Bar (a)"]');

    //Instrument Air Tempreture
    await page.fill('input#utilities\\.InstrumentAirTemperature\\.normal', '50');
    await page.fill('input#utilities\\.InstrumentAirTemperature\\.design', '60');
    await page.click('div#utilities\\.InstrumentAirTemperature_select');
    await page.click('li[data-value="C"]');

    //Instrument Air Pressure
    await page.fill('input#utilities\\.InstrumentAirPressure\\.normal', '6');
    await page.fill('input#utilities\\.InstrumentAirPressure\\.design', '7');
    await page.click('div#utilities\\.InstrumentAirPressure_select');
    await page.click('li[data-value="Bar (a)"]');

    //Plant Air Tempreture
    await page.fill('input#utilities\\.PlantAirTemperature\\.normal', '65');
    await page.fill('input#utilities\\.PlantAirTemperature\\.design', '75');
    await page.click('div#utilities\\.PlantAirTemperature_select');
    await page.click('li[data-value="C"]');

    //Plant Air Pressure
    await page.fill('input#utilities\\.PlantAirPressure\\.normal', '3');
    await page.fill('input#utilities\\.PlantAirPressure\\.design', '5');
    await page.click('div#utilities\\.PlantAirPressure_select');
    await page.click('li[data-value="Bar (a)"]');

    await page.locator(ftPage.buttonNotifyJM).click();

    await Promise.all([
        page.waitForResponse((response) =>
            response.url().includes('/notify') && response.status() === 200
        ),

        page.locator(ftPage.buttonSendNotification).getByText('Send Notification').click()
    ]);

    await page.locator(ftPage.notificationMsgBox).getByText('Notification sent!').isVisible();
})