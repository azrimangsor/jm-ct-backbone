import { test, expect } from '@playwright/test';
import { BasePage } from '../../pages/basePage';
import { LCHPage } from '../../pages/lch_basePage';
import { config } from '../config';

test('Verify DCF LCH Cost Data - Insert', {tag: '@smoke'}, async ({ page }, testInfo) => {
    // Initialize page objects
    const base = new BasePage(page);
    const lchPage = new LCHPage(page);

    try {
        // Navigate to LCH page
        await base.navigateToLCH(process.env.LCH_DCF_URL!);

        // Perform login
        await lchPage.login_default();

        // Select 'Cost Data' section
        await lchPage.selectSectionMenu('Cost Data');

        // Check currency
        await lchPage.checkCurrency('GBP');

        // Insert values and select dropdown options
        await base.insertValueIntoTextbox(lchPage.productValueH2, '1500');
        await page.locator(lchPage.unitProductValueH2).click();
        await base.selectValueFromDropDown('/tonne');

        await base.insertValueIntoTextbox(lchPage.priceNaturalGas, '1000');
        await page.locator(lchPage.unitNaturalGas).click();
        await base.selectValueFromDropDown('/tonne');

        await base.insertValueIntoTextbox(lchPage.electricityImportPrice, '1000');
        await base.insertValueIntoTextbox(lchPage.HPSExportValue, '300');
        await base.insertValueIntoTextbox(lchPage.MPSExportValue, '250');
        await base.insertValueIntoTextbox(lchPage.coolingWaterCost, '0.30');
        await base.insertValueIntoTextbox(lchPage.demineralisedWaterCost, '0.20');
        await base.insertValueIntoTextbox(lchPage.CO2CreditsPurchaseCost, '100');
        await base.insertValueIntoTextbox(lchPage.CO2CreditsSalesValue, '100');
        await base.insertValueIntoTextbox(lchPage.CO2StorageCost, '100');
        await base.insertValueIntoTextbox(lchPage.CO2EmissionCost, '150');
        await base.insertValueIntoTextbox(lchPage.expectCostChangeOverTime, 'Test');

        // Assert save status
        await expect(page.locator(lchPage.saveStatus)).toContainText('Saved');

        await lchPage.notifyJM();
    } catch (error) {
        // Log any error that occurs during the test
        console.error(`[Cost Data] Failed: ${error}`);
        throw error; // Rethrow the error to ensure the test fails
    }
});
