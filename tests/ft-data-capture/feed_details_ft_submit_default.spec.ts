import { test, expect } from '@playwright/test';
import { FTPage } from '../../pages/ft_basePage';
import { BasePage } from '../../pages/basePage';

test('Verify DCF LCH FT Feed Details - FT + HyCoGen', { tag: ['@smoke'] }, async ({ page }) => {
    const ftPage = new FTPage(page);
    const base = new BasePage(page);

    // Step 1: Login to FT DCF home page
    await test.step('Step 1: Login to FT DCF home page', async () => {
        await base.navigateToFT(process.env.FT_DCF_URL!);
        await ftPage.login_default();
    });

    // Step 2: Navigate to Feed Details section
    await test.step('Step 2: Navigate to Feed Details section', async () => {
        await page.click(ftPage.feedDetails);
    });

    // Step 3: Select JM Scope as "FT + HyCoGen"
    await test.step('Step 3: Select JM Scope as "FT + HyCoGen"', async () => {
        await ftPage.selectJMScope('FT + HyCoGen');
    });

    // Step 4: Enter CO2 Details
    await test.step('Step 4: Enter CO2 Details', async () => {
        await ftPage.selectCO2TypicalValue('yes', { co2: '30', h2: '30', ch4: '30', inerts: '30' });
        await ftPage.selectCO2ContainmentTypicalValue('yes', {
            o2: '30', nh3: '30', s8: '30', hcn: '30', mx: '30',
            AsH3: '30', PH3: '30', HeavyMetals: '30', FECO5: '30', NICO4: '30', Tars: '30', Particulates: '30'
        });
    });

    // Step 5: Enter H2 Details
    await test.step('Step 5: Enter H2 Details', async () => {
        await ftPage.selectH2TypicalValue('yes', { h2: '30', o2: '30' });
        await ftPage.selectH2ContainmentTypicalValue('yes', {
            o2: '30', nh3: '30', s8: '30', hcn: '30', mx: '30',
            AsH3: '30', PH3: '30', HeavyMetals: '30', FECO5: '30', NICO4: '30', Tars: '30', Particulates: '30'
        });
    });

    // Step 6: Enter O2 Details
    await test.step('Step 6: Enter O2 Details', async () => {
        await ftPage.selectO2TypicalValue('yes', { co2: '30', h2: '30', ch4: '30' });
        await ftPage.selectO2ContainmentTypicalValue('yes', {
            nh3: '30', s8: '30', hcn: '30', mx: '30',
            AsH3: '30', PH3: '30', HeavyMetals: '30', FECO5: '30', NICO4: '30', Tars: '30', Particulates: '30'
        });
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


test('Verify DCF LCH FT Feed Details - FT + Syngas conditioning', async ({ page }, testInfo) => {
    const ftPage = new FTPage(page);
    const base = new BasePage(page);

    // Step 1: Login to FT DCF home page
    await test.step('Step 1: Login to FT DCF home page', async () => {
        await base.navigateToFT(process.env.FT_DCF_URL!);
        await ftPage.login_default();
    });

    // Step 2: Navigate to Feed Details section
    await test.step('Step 2: Navigate to Feed Details section', async () => {
        await page.click(ftPage.feedDetails);
    });

    // Step 3: Select JM Scope as "FT + Syngas conditioning"
    await test.step('Step 3: Select JM Scope as "FT + Syngas conditioning"', async () => {
        await ftPage.selectJMScope('FT + Syngas conditioning');
    });

    // Step 4: Enter CO2 Details
    await test.step('Step 4: Enter CO2 Details', async () => {
        await ftPage.selectCO2TypicalValue('no');
        await ftPage.selectCO2ContainmentTypicalValue('no');
    });

    // Step 5: Enter H2 Details
    await test.step('Step 5: Enter H2 Details', async () => {
        await ftPage.selectH2TypicalValue('no');
        await ftPage.selectH2ContainmentTypicalValue('no');
    });

    // Step 6: Enter O2 Details
    await test.step('Step 6: Enter O2 Details', async () => {
        await ftPage.selectO2TypicalValue('no');
        await ftPage.selectO2ContainmentTypicalValue('no');
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


test('Verify DCF LCH FT Feed Details - FT Loop', async ({ page }, testInfo) => {
    const ftPage = new FTPage(page);
    const base = new BasePage(page);

    // Step 1: Login to FT DCF home page
    await test.step('Step 1: Login to FT DCF home page', async () => {
        await base.navigateToFT(process.env.FT_DCF_URL!);
        await ftPage.login_default();
    });

    // Step 2: Navigate to Feed Details section
    await test.step('Step 2: Navigate to Feed Details section', async () => {
        await page.click(ftPage.feedDetails);
    });

    // Step 3: Select JM Scope as "FT Loop"
    await test.step('Step 3: Select JM Scope as "FT Loop"', async () => {
        await ftPage.selectJMScope('FT Loop');
    });

    // Step 4: Enter CO2 Details
    await test.step('Step 4: Enter CO2 Details', async () => {
        await ftPage.selectCO2TypicalValue('yes', { co2: '30', h2: '30', ch4: '30', inerts: '30' });
        await ftPage.selectCO2ContainmentTypicalValue('no');
    });

    // Step 5: Enter H2 Details
    await test.step('Step 5: Enter H2 Details', async () => {
        await ftPage.selectH2TypicalValue('yes', { h2: '30', o2: '30' });
        await ftPage.selectH2ContainmentTypicalValue('no');
    });

    // Step 6: Enter O2 Details
    await test.step('Step 6: Enter O2 Details', async () => {
        await ftPage.selectO2TypicalValue('yes', { co2: '30', h2: '30', ch4: '30' });
        await ftPage.selectO2ContainmentTypicalValue('no');
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


test('Verify DCF LCH FT Feed Details - GTL', async ({ page }, testInfo) => {
    const ftPage = new FTPage(page);
    const base = new BasePage(page);

    // Step 1: Login to FT DCF home page
    await test.step('Step 1: Login to FT DCF home page', async () => {
        await base.navigateToFT(process.env.FT_DCF_URL!);
        await ftPage.login_default();
    });

    // Step 2: Navigate to Feed Details section
    await test.step('Step 2: Navigate to Feed Details section', async () => {
        await page.click(ftPage.feedDetails);
    });

    // Step 3: Select JM Scope as "GTL"
    await test.step('Step 3: Select JM Scope as "GTL"', async () => {
        await ftPage.selectJMScope('GTL');
    });

    // Step 4: Enter CO2 Details
    await test.step('Step 4: Enter CO2 Details', async () => {
        await ftPage.selectCO2TypicalValue('no');
        await ftPage.selectCO2ContainmentTypicalValue('yes', {
            o2: '30', nh3: '30', s8: '30', hcn: '30', mx: '30',
            AsH3: '30', PH3: '30', HeavyMetals: '30', FECO5: '30', NICO4: '30', Tars: '30', Particulates: '30'
        });
    });

    // Step 5: Enter H2 Details
    await test.step('Step 5: Enter H2 Details', async () => {
        await ftPage.selectH2TypicalValue('no');
        await ftPage.selectH2ContainmentTypicalValue('yes', {
            o2: '30', nh3: '30', s8: '30', hcn: '30', mx: '30',
            AsH3: '30', PH3: '30', HeavyMetals: '30', FECO5: '30', NICO4: '30', Tars: '30', Particulates: '30'
        });
    });

    // Step 6: Enter O2 Details
    await test.step('Step 6: Enter O2 Details', async () => {
        await ftPage.selectO2TypicalValue('no');
        await ftPage.selectO2ContainmentTypicalValue('yes', {
            nh3: '30', s8: '30', hcn: '30', mx: '30',
            AsH3: '30', PH3: '30', HeavyMetals: '30', FECO5: '30', NICO4: '30', Tars: '30', Particulates: '30'
        });
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
