import { test, expect } from '@playwright/test';
import { FTPage } from '../../pages/ft_basePage';
import { BasePage } from '../../pages/basePage';

test('Verify DCF LCH FT Site Data - Insert', { tag: '@smoke' }, async ({ page }, testInfo) => {
    const ftPage = new FTPage(page);
    const base = new BasePage(page);

    // Step 1: Login to FT DCF home page
    await test.step('Step 1: Login to FT DCF home page', async () => {
        await base.navigateToFT(process.env.FT_DCF_URL!);
        await ftPage.login_default();
    });

    // Step 2: Navigate to Cost Data section
    await test.step('Step 2: Navigate to Cost Data section', async () => {
        await page.locator(ftPage.costData).click();
    });

    // Step 3: Set Currency to GBP
    await test.step('Step 3: Set Currency to GBP', async () => {
        await page.check('input[name="fieldset-costData.currency"][value="GBP"]');
    });

    // Step 4: Fill in Cost Data fields
    await test.step('Step 4: Fill in Cost Data fields', async () => {
        // Final Product Value
        await base.insertValueIntoTextbox(ftPage.costDataFinalProductValueTxt, '1500');
        await page.locator(ftPage.costDataFinalProductValueUnit).click();
        await base.selectValueFromDropDown('/tonne');

        // Biomass feedstock price
        await base.insertValueIntoTextbox(ftPage.costDataOtherFeedstockPriceTxt, '2000');
        await page.locator(ftPage.costDataOtherFeedstockPriceUnit).click();
        await base.selectValueFromDropDown('/tonne');

        // Electricity Import Price
        await base.insertValueIntoTextbox(ftPage.costDataElectricityImportPriceTxt, '275');

        // Cost Cooling Water (Per Unit Circulation)
        await base.insertValueIntoTextbox(ftPage.costDataCostCoolingWaterTxt, '1250');

        // Demineralised Water Cost
        await base.insertValueIntoTextbox(ftPage.costDataDemineralisedWaterCostTxt, '750');
    });

    // Step 5: Send Notification
    await test.step('Step 5: Send Notification', async () => {
        await page.locator(ftPage.buttonNotifyJM).click();

        await Promise.all([
            page.waitForResponse((response) =>
                response.url().includes('/notify') && response.status() === 200
            ),
            page.locator(ftPage.buttonSendNotification).getByText('Send Notification').click(),
        ]);

        await page.locator(ftPage.notificationMsgBox).getByText('Notification sent!').isVisible();
    });
});
