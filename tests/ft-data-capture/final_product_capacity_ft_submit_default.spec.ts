import { test, expect } from '@playwright/test';
import { FTPage } from '../../pages/ft_basePage';
import { BasePage } from '../../pages/basePage';

test('Verify DCF LCH FT Final Product and Capacity Details - FT Crude', { tag: '@Smoke' }, async ({ page }, testInfo) => {
    const ftPage = new FTPage(page);
    const base = new BasePage(page);

    // Step 1: Login to FT DCF Home Page
    await test.step('Step 1: Login to FT DCF Home Page', async () => {
        await base.navigateToFT(process.env.FT_DCF_URL!);
        await ftPage.login_default();
    });

    // Step 2: Select Type of Final Product
    await test.step('Step 2: Select Type of Final Product', async () => {
        await page.locator(ftPage.finalProducAndCapacity).click();
    });

    // Step 3: Open Final Product and Capacity Page
    await test.step('Step 3: Open Final Product and Capacity Page', async () => {
        await ftPage.selectFinalProduct('FT Crude');
    });

    // Step 4: Select Basis for Plant Capacity
    await test.step('Step 4: Select Basis for Plant Capacity', async () => {
        await ftPage.checkBasisForPlantCapacity('FT Crude');
    });

    // Step 5: Insert Capacity Amount
    await test.step('Step 5: Insert Capacity Amount', async () => {
        await page.locator('input#GLOBAL\\.basisForPlantCapacityCapacityRequired').fill('70');
        await page.click('div#GLOBAL\\.basisForPlantCapacityCapacityRequired_select');
        await ftPage.selectCapacityMeasurements('bbl/d');
    });

    // Step 6: Insert Required Minimum Turndown Percentage Capacity
    await test.step('Step 6: Insert Required Minimum Turndown Percentage Capacity', async () => {
        await page.fill('input#GLOBAL\\.minimumTurndownPercentageCapacity', '50');
    });

    // Step 7: Insert Plant Operation Hours Per Year
    await test.step('Step 7: Insert Plant Operation Hours Per Year', async () => {
        await page.fill('input#GLOBAL\\.operatingHoursPerYear', '4368');
    });

    // Step 8: Insert Train Configuration
    await test.step('Step 8: Insert Train Configuration', async () => {
        await page.check('input[name="fieldset-GLOBAL\\.requiresMultipleTrains"][value="no"]');
    });

    // Step 9: Notify JM
    await test.step('Step 9: Notify JM', async () => {
        await page.locator(ftPage.buttonNotifyJM).click();

        const [response] = await Promise.all([
            page.waitForResponse((response) =>
                response.url().includes('/notify') && response.status() === 200
            ),
            page.locator(ftPage.buttonSendNotification).getByText('Send Notification').click()
        ]);

        await page.locator(ftPage.notificationMsgBox).getByText('Notification sent!').isVisible();
    });

    // Optional Step: Add Comments (if needed)
    // await page.click('#panel-productAndCapacity\\.otherComments-header > div.MuiAccordionSummary-expandIconWrapper.css-1fx8m19 > svg');
    // await page.fill('textarea#productAndCapacity\\.otherComments', 'Final Products & Capacity');
});


test('Verify DCF LCH FT Final Product and Capacity Details - Sustainable Aviation Fuel (SAF)', { tag: '@trivial' }, async ({ page }, testInfo) => {
    const ftPage = new FTPage(page);
    const base = new BasePage(page);

    // Step 1: Login to FT DCF Home Page
    await test.step('Step 1: Login to FT DCF Home Page', async () => {
        await base.navigateToFT(process.env.FT_DCF_URL!);
        await ftPage.login_default();
    });

    // Step 2: Select Final Product and Capacity Details
    await test.step('Step 2: Select Final Product and Capacity Details', async () => {
        await page.locator(ftPage.finalProducAndCapacity).click();
        await ftPage.selectFinalProduct('Sustainable Aviation Fuel (SAF)');
    });

    // Step 3: Set Basis for Plant Capacity
    await test.step('Step 3: Set Basis for Plant Capacity', async () => {
        await page.locator('input[name="fieldset-GLOBAL.basisForPlantCapacity"][value="Feedstock Limited"]').check();
        await page.locator('input#GLOBAL\\.basisForPlantCapacityFeedstockAvailable').fill('70');
        await page.locator('div#GLOBAL\\.basisForPlantCapacityFeedstockAvailable_select').click();
        await ftPage.selectCapacityMeasurements('bbl/d');
    });

    // Step 4: Set Limiting Feedstock
    await test.step('Step 4: Set Limiting Feedstock', async () => {
        await page.locator('input[name="fieldset-GLOBAL.basisForPlantCapacityLimitingFeedstock"][value="co2"]').check();
    });

    // Step 5: Insert Minimum Turndown Percentage Capacity
    await test.step('Step 5: Insert Minimum Turndown Percentage Capacity', async () => {
        await page.locator('input#GLOBAL\\.minimumTurndownPercentageCapacity').fill('50');
    });

    // Step 6: Insert Plant Operation Hours Per Year
    await test.step('Step 6: Insert Plant Operation Hours Per Year', async () => {
        await page.locator('input#GLOBAL\\.operatingHoursPerYear').fill('4368');
    });

    // Step 7: Set Train Configuration
    await test.step('Step 7: Set Train Configuration', async () => {
        await page.locator('input[name="fieldset-GLOBAL\\.requiresMultipleTrains"][value="no"]').check();
    });

    // Optional Step: Add Comments (if needed)
    // await test.step('Optional Step: Add Comments', async () => {
    //     await page.click('#panel-productAndCapacity\\.otherComments-header > div.MuiAccordionSummary-expandIconWrapper.css-1fx8m19 > svg');
    //     await page.fill('textarea#productAndCapacity\\.otherComments', 'Final Products & Capacity');
    // });

    // Step 8: Notify JM
    await test.step('Step 8: Notify JM', async () => {
        await page.locator(ftPage.buttonNotifyJM).click();

        const [response] = await Promise.all([
            page.waitForResponse((response) =>
                response.url().includes('/notify') && response.status() === 200
            ),
            page.locator(ftPage.buttonSendNotification).getByText('Send Notification').click()
        ]);

        await page.locator(ftPage.notificationMsgBox).getByText('Notification sent!').isVisible();
    });
});


test('Verify DCF LCH FT Final Product and Capacity Details - SAF, Diesel and Naphtha', async ({ page }, testInfo) => {
    const ftPage = new FTPage(page);
    const base = new BasePage(page);

    // Step 1: Login to FT DCF Home Page
    await test.step('Step 1: Login to FT DCF Home Page', async () => {
        await base.navigateToFT(process.env.FT_DCF_URL!);
        await ftPage.login_default();
    });

    // Step 2: Select Final Product and Capacity Details
    await test.step('Step 2: Select Final Product and Capacity Details', async () => {
        await page.locator(ftPage.finalProducAndCapacity).click();
        await ftPage.selectFinalProduct('SAF, Diesel and Naphtha');
    });

    // Step 3: Set Basis for Plant Capacity
    await test.step('Step 3: Set Basis for Plant Capacity', async () => {
        await page.locator('input[name="fieldset-GLOBAL.basisForPlantCapacity"][value="Final Product"]').check();
        await page.locator('input#GLOBAL\\.basisForPlantCapacityCapacityRequired').fill('70');
        await page.locator('div#GLOBAL\\.basisForPlantCapacityCapacityRequired_select').click();
        await ftPage.selectCapacityMeasurements('bbl/d');
    });

    // Step 4: Insert Minimum Turndown Percentage Capacity
    await test.step('Step 4: Insert Minimum Turndown Percentage Capacity', async () => {
        await page.locator('input#GLOBAL\\.minimumTurndownPercentageCapacity').fill('50');
    });

    // Step 5: Insert Plant Operation Hours Per Year
    await test.step('Step 5: Insert Plant Operation Hours Per Year', async () => {
        await page.locator('input#GLOBAL\\.operatingHoursPerYear').fill('4368');
    });

    // Step 6: Set Train Configuration
    await test.step('Step 6: Set Train Configuration', async () => {
        await page.locator('input[name="fieldset-GLOBAL\\.requiresMultipleTrains"][value="yes"]').check();
        await page.locator('textarea#GLOBAL\\.requiresMultipleTrainsDetails').fill('Multiple trains required for transportation.');
    });

    // Optional Step: Add Comments (if needed)
    // await test.step('Optional Step: Add Comments', async () => {
    //     await page.click('#panel-productAndCapacity\\.otherComments-header > div.MuiAccordionSummary-expandIconWrapper.css-1fx8m19 > svg');
    //     await page.fill('textarea#productAndCapacity\\.otherComments', 'Final Products & Capacity');
    // });

    // Step 7: Notify JM
    await test.step('Step 7: Notify JM', async () => {
        await page.locator(ftPage.buttonNotifyJM).click();

        const [response] = await Promise.all([
            page.waitForResponse((response) =>
                response.url().includes('/notify') && response.status() === 200
            ),
            page.locator(ftPage.buttonSendNotification).getByText('Send Notification').click()
        ]);

        await page.locator(ftPage.notificationMsgBox).getByText('Notification sent!').isVisible();
    });
});


test('Verify DCF LCH FT Final Product and Capacity Details - SAF and Naphtha', async ({ page }, testInfo) => {
    const ftPage = new FTPage(page);
    const base = new BasePage(page);

    await base.navigateToFT('https://uat-dcf.ft.matthey.com/group/guest/project?projectId=c650e5e9-476e-ee11-9ae7-000d3a2d671b');

    //Keyed in Username & Password and login
    await ftPage.login_default();

    await page.locator(ftPage.finalProducAndCapacity).click();

    await ftPage.selectFinalProduct('SAF and Naphtha');

    await page.locator('input[name="fieldset-GLOBAL.basisForPlantCapacity"][value="Final Product"]').check();
    await page.locator('input#GLOBAL\\.basisForPlantCapacityCapacityRequired').fill('70');

    await page.locator('div#GLOBAL\\.basisForPlantCapacityCapacityRequired_select').click();
    await ftPage.selectCapacityMeasurements('bbl/d');

    await page.locator('input#GLOBAL\\.minimumTurndownPercentageCapacity').fill('50');

    await page.locator('input#GLOBAL\\.operatingHoursPerYear').fill('4368');

    await page.locator('input[name="fieldset-GLOBAL\\.requiresMultipleTrains"][value="no"]').check();

    // await page.click('#panel-productAndCapacity\\.otherComments-header > div.MuiAccordionSummary-expandIconWrapper.css-1fx8m19 > svg');
    // await page.fill('textarea#productAndCapacity\\.otherComments', 'Final Products & Capacity');
})

test('Verify DCF LCH FT Final Product and Capacity Details - Base Oil', async ({ page }, testInfo) => {
    const ftPage = new FTPage(page);
    const base = new BasePage(page);

    await base.navigateToFT('https://uat-dcf.ft.matthey.com/group/guest/project?projectId=c650e5e9-476e-ee11-9ae7-000d3a2d671b');

    //Keyed in Username & Password and login
    await ftPage.login_default();

    await page.locator(ftPage.finalProducAndCapacity).click();

    await ftPage.selectFinalProduct('Base Oil');

    await page.locator('input[name="fieldset-GLOBAL.basisForPlantCapacity"][value="Final Product"]').check();
    await page.locator('input#GLOBAL\\.basisForPlantCapacityCapacityRequired').fill('70');

    await page.locator('div#GLOBAL\\.basisForPlantCapacityCapacityRequired_select').click();
    await ftPage.selectCapacityMeasurements('bbl/d');

    await page.locator('input#GLOBAL\\.minimumTurndownPercentageCapacity').fill('50');

    await page.locator('input#GLOBAL\\.operatingHoursPerYear').fill('4368');

    await page.locator('input[name="fieldset-GLOBAL\\.requiresMultipleTrains"][value="yes"]').check();

    await page.locator('textarea#GLOBAL\\.requiresMultipleTrainsDetails').fill('Multiple trains require for transportation base oil product.')

    // await page.click('#panel-productAndCapacity\\.otherComments-header > div.MuiAccordionSummary-expandIconWrapper.css-1fx8m19 > svg');
    // await page.fill('textarea#productAndCapacity\\.otherComments', 'Final Products & Capacity');
})

test('Verify DCF LCH FT Final Product and Capacity Details - Diesel', async ({ page }, testInfo) => {
    const ftPage = new FTPage(page);
    const base = new BasePage(page);

    await base.navigateToFT('https://uat-dcf.ft.matthey.com/group/guest/project?projectId=c650e5e9-476e-ee11-9ae7-000d3a2d671b');

    //Keyed in Username & Password and login
    await ftPage.login_default();

    await page.locator(ftPage.finalProducAndCapacity).click();

    await ftPage.selectFinalProduct('Diesel');

    await page.locator('input[name="fieldset-GLOBAL.basisForPlantCapacity"][value="Final Product"]').check();
    await page.locator('input#GLOBAL\\.basisForPlantCapacityCapacityRequired').fill('70');

    await page.locator('div#GLOBAL\\.basisForPlantCapacityCapacityRequired_select').click();
    await ftPage.selectCapacityMeasurements('bbl/d');

    await page.locator('input#GLOBAL\\.minimumTurndownPercentageCapacity').fill('50');

    await page.locator('input#GLOBAL\\.operatingHoursPerYear').fill('4368');

    await page.locator('input[name="fieldset-GLOBAL\\.requiresMultipleTrains"][value="no"]').check();
    

    //await page.locator('textarea#GLOBAL\\.requiresMultipleTrainsDetails').fill('Multiple trains require for transportation base oil product.')

    // await page.click('#panel-productAndCapacity\\.otherComments-header > div.MuiAccordionSummary-expandIconWrapper.css-1fx8m19 > svg');
    // await page.fill('textarea#productAndCapacity\\.otherComments', 'Final Products & Capacity');
})

test('Verify DCF LCH FT Final Product and Capacity Details - Diesel and Naphtha', async ({ page }, testInfo) => {
    const ftPage = new FTPage(page);
    const base = new BasePage(page);

    await base.navigateToFT('https://uat-dcf.ft.matthey.com/group/guest/project?projectId=c650e5e9-476e-ee11-9ae7-000d3a2d671b');

    //Keyed in Username & Password and login
    await ftPage.login_default();

    await page.locator(ftPage.finalProducAndCapacity).click();

    await ftPage.selectFinalProduct('Diesel and Naphtha');

    await page.locator('input[name="fieldset-GLOBAL.basisForPlantCapacity"][value="Final Product"]').check();
    await page.locator('input#GLOBAL\\.basisForPlantCapacityCapacityRequired').fill('70');

    await page.locator('div#GLOBAL\\.basisForPlantCapacityCapacityRequired_select').click();
    await ftPage.selectCapacityMeasurements('bbl/d');

    await page.locator('input#GLOBAL\\.minimumTurndownPercentageCapacity').fill('50');

    await page.locator('input#GLOBAL\\.operatingHoursPerYear').fill('4368');

    await page.locator('input[name="fieldset-GLOBAL\\.requiresMultipleTrains"][value="yes"]').check();

    await page.locator('textarea#GLOBAL\\.requiresMultipleTrainsDetails').fill('Multiple trains require for transportation base oil product.')

    await page.locator(ftPage.buttonNotifyJM).click();

    const [response] = await Promise.all([
        page.waitForResponse((response) =>
          response.url().includes('/notify') && response.status() === 200
        ),
        // Trigger the POST request, for example by clicking a submit button
        page.locator(ftPage.buttonSendNotification).getByText('Send Notification').click()
      ]);

    await page.locator(ftPage.notificationMsgBox).getByText('Notification sent!').isVisible();
})