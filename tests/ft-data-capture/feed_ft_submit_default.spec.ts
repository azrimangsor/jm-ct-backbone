import { test, expect } from '@playwright/test';
import { FTPage } from '../../pages/ft_basePage';
import { BasePage } from '../../pages/basePage';

test('Verify Feed page elements - Feed Composition Yes', { tag: ['@smoke'] }, async ({ page }, testInfo) => {
    const ftPage = new FTPage(page);
    const base = new BasePage(page);

    // Step 1: Login to FT DCF home page
    await test.step('Step 1: Login to FT DCF home page', async () => {
        await base.navigateToFT(process.env.FT_DCF_URL!);
        await ftPage.login_default();
    });

    // Step 2: Navigate to Feed page
    await test.step('Step 2: Navigate to Feed page', async () => {
        await page.click(ftPage.feed);
    });

    // Step 3: Select Feed Raw Feedstock options
    await test.step('Step 3: Select Feed Raw Feedstock options', async () => {
        await ftPage.selectFeedRawFeedstock('Biomass');
        await ftPage.selectFeedRawFeedstock('Biogas');
        await ftPage.selectFeedRawFeedstock('Carbon Dioxide + Hydrogen');
        await ftPage.selectFeedRawFeedstock('Municipal Solid Waste');
        await ftPage.selectFeedRawFeedstock('Natural Gas');
        await ftPage.selectFeedRawFeedstock('Other');
    });

    // Step 4: Select Feed Composition Yes
    await test.step('Step 4: Select Feed Composition Yes', async () => {
        await page.locator(ftPage.feedCompositionYes).click();
    });

    // Step 5: Send Notification
    await test.step('Step 5: Send Notification', async () => {
        await page.locator(ftPage.buttonNotifyJM).click();

        await Promise.all([
            page.waitForResponse((response) =>
                response.url().includes('/notify') && response.status() === 200
            ),
            page.locator(ftPage.buttonSendNotification).getByText('Send Notification').click()
        ]);

        await page.locator(ftPage.notificationMsgBox).getByText('Notification sent!').isVisible();
    });
});


test('Verify Feed page elements - Feed Composition No', { tag: ['@smoke'] }, async ({ page }, testInfo) => {
    const ftPage = new FTPage(page);
    const base = new BasePage(page);

    // Step 1: Login to FT DCF Home Page
    await test.step('Step 1: Login to FT DCF Home Page', async () => {
        await base.navigateToFT(process.env.FT_DCF_URL!);
        await ftPage.login_default();
    });

    // Step 2: Open Feed Page
    await test.step('Step 2: Open Feed Page', async () => {
        await page.click(ftPage.feed);
    });

    // Step 3: Select Custom Feed Composition
    await test.step('Step 3: Select Custom Feed Composition', async () => {
        await page.locator(ftPage.feedCompositionNo).click();
    });

    // Step 4: Verify Custom Feed Composition Elements
    await test.step('Step 4: Verify Custom Feed Composition Elements', async () => {
        await page.locator(ftPage.feedFeedCompositionCO2).isVisible();
    });

    // Step 5: Verify Feed Conditions Elements
    await test.step('Step 5: Verify Feed Conditions Elements', async () => {
        await page.locator(ftPage.feedsConditionTempreture).isVisible();
        await page.locator(ftPage.feedsConditionPressure).isVisible();
    });

    // Step 6: Send Notification
    await test.step('Step 6: Send Notification', async () => {
        await page.locator(ftPage.buttonNotifyJM).click();

        await Promise.all([
            page.waitForResponse((response) =>
                response.url().includes('/notify') && response.status() === 200
            ),
            page.locator(ftPage.buttonSendNotification).getByText('Send Notification').click()
        ]);

        await page.locator(ftPage.notificationMsgBox).getByText('Notification sent!').isVisible();
    });
});


test('Verify DCF LCH FT Feed Details - Biomass - FT + HyCoGen', { tag: ['@e2e'] }, async ({ page }, testInfo) => {
    const ftPage = new FTPage(page);
    const base = new BasePage(page);

    // Step 1: Login to FT DCF Home Page
    await test.step('Step 1: Login to FT DCF Home Page', async () => {
        await base.navigateToFT(process.env.FT_DCF_URL!);
        await ftPage.login_default();
    });

    // Step 2: Open Feed Page
    await test.step('Step 2: Open Feed Page', async () => {
        await page.click(ftPage.feed);
    });

    // Step 3: Select Raw Feedstock Options
    await test.step('Step 3: Select Raw Feedstock Options', async () => {
        await ftPage.selectFeedRawFeedstock('Biomass');
    });

    // Step 4: Select JM Scope
    await test.step('Step 4: Select JM Scope', async () => {
        await ftPage.selectJMScope('FT + HyCoGen');
    });

    // Step 5: Select Custom Feed Composition
    await test.step('Step 5: Select Custom Feed Composition', async () => {
        await page.locator(ftPage.feedCompositionYes).click();
    });

    // Step 6: Insert Feed Conditions Details
    await test.step('Step 6: Insert Feed Conditions Details', async () => {
        await page.locator(ftPage.feedsConditionTempreture).fill('30');
        await page.locator('#feeds\\.FTHyCoGenTemperature_select').click();
        await base.selectValueFromDropDown('C');

        await page.locator(ftPage.feedsConditionPressure).fill('30');
        await page.locator('#feeds\\.FTHyCoGenPressure_select').click();
        await base.selectValueFromDropDown('Bar (a)');
    });

    // Step 7: Send Notification
    await test.step('Step 7: Send Notification', async () => {
        await page.locator(ftPage.buttonNotifyJM).click();

        await Promise.all([
            page.waitForResponse((response) =>
                response.url().includes('/notify') && response.status() === 200
            ),
            page.locator(ftPage.buttonSendNotification).getByText('Send Notification').click()
        ]);

        await page.locator(ftPage.notificationMsgBox).getByText('Notification sent!').isVisible();
    });
});
