import { test, expect } from '@playwright/test';
import { FTPage } from '../../pages/ft_basePage';
import { BasePage } from '../../pages/basePage';

test('Verify DCF LCH FT Project Finance Details - Project is internally financed', { tag: '@Smoke' }, async ({ page }, testInfo) => {
    const ftPage = new FTPage(page);
    const base = new BasePage(page);

    await test.step('Login to FT DCF home page', async () => {
        await base.navigateToFT(process.env.FT_DCF_URL!);

        await ftPage.login_default();
    });

    await test.step('Open Finance page', async () => {
        await page.locator(ftPage.projectFinance).click();
    });

    await test.step('Fill up Finance Details', async () => {
        await page.locator('textarea#projectFinance\\.projectFinanceProposal').fill('Crowdsoucing Fundraising Bond');

        await base.selectRadioButton(ftPage.financeInternalFinanced, 'yes');
        await base.selectRadioButton(ftPage.financeSources, 'no');
        await base.selectRadioButton(ftPage.financeGovernmentGrantAssist, 'no');
        await base.selectRadioButton(ftPage.financePurposeVehicle, 'no')
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

test('Verify DCF LCH FT Project Finance Details - Project financed by Debt And Equity', async ({ page }, testInfo) => {
    const ftPage = new FTPage(page);
    const base = new BasePage(page);

    await test.step('Login to FT DCF home page', async () => {
        await base.navigateToFT(process.env.FT_DCF_URL!);

        await ftPage.login_default();
    });

    await test.step('Open Finance page', async () => {
        await page.locator(ftPage.projectFinance).click();
    });

    await page.locator('textarea#projectFinance\\.projectFinanceProposal').fill('Crowdsoucing Fundraising Bond');

    await base.selectRadioButton(ftPage.financeInternalFinanced, 'no');
    await base.selectRadioButton(ftPage.financeSources, 'yes');
    await base.selectRadioButton(ftPage.financeGovernmentGrantAssist, 'no');
    await base.selectRadioButton(ftPage.financePurposeVehicle, 'no')
})

test('Verify DCF LCH FT Project Finance Details - Project financed by government grant and assistance', async ({ page }, testInfo) => {
    const ftPage = new FTPage(page);
    const base = new BasePage(page);

    await test.step('Login to FT DCF home page', async () => {
        await base.navigateToFT(process.env.FT_DCF_URL!);

        await ftPage.login_default();
    });

    await test.step('Open Finance page', async () => {
        await page.locator(ftPage.projectFinance).click();
    });

    await page.locator('textarea#projectFinance\\.projectFinanceProposal').fill('Crowdsoucing Fundraising Bond');

    await base.selectRadioButton(ftPage.financeInternalFinanced, 'no');
    await base.selectRadioButton(ftPage.financeSources, 'no');
    await base.selectRadioButton(ftPage.financeGovernmentGrantAssist, 'yes');
    await base.selectRadioButton(ftPage.financePurposeVehicle, 'no')
})

test('Verify DCF LCH FT Project Finance Details - Project financed through special purpose vehicle', async ({ page }, testInfo) => {
    const ftPage = new FTPage(page);
    const base = new BasePage(page);

    await test.step('Login to FT DCF home page', async () => {
        await base.navigateToFT(process.env.FT_DCF_URL!);

        await ftPage.login_default();
    });

    await test.step('Open Finance page', async () => {
        await page.locator(ftPage.projectFinance).click();
    });

    await page.locator('textarea#projectFinance\\.projectFinanceProposal').fill('Crowdsoucing Fundraising Bond');

    await base.selectRadioButton(ftPage.financeInternalFinanced, 'no');
    await base.selectRadioButton(ftPage.financeSources, 'no');
    await base.selectRadioButton(ftPage.financeGovernmentGrantAssist, 'no');
    await base.selectRadioButton(ftPage.financePurposeVehicle, 'yes')
})