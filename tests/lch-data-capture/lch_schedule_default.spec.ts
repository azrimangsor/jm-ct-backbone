import { test, expect } from '@playwright/test';
import { BasePage } from '../../pages/basePage';
import { LCHPage } from '../../pages/lch_basePage';

test('Verify DCF LCH Schedule - Insert', {tag: '@smoke'}, async ({ page }, testInfo) => {
    const base = new BasePage(page);
    const lchPage = new LCHPage(page);

    await base.navigateToLCH(process.env.LCH_DCF_URL!);

    await lchPage.login_default();

    await page.getByText('Schedule').click();

    await page.locator('input#schedule\\.technologySelectionDate').fill('31/12/2024');
    await page.locator('input#schedule\\.preFEEDDate').fill('31/12/2024');
    await page.locator('input#schedule\\.finalInvestmentDecisionDate').fill('31/12/2024');
    await page.locator('input#schedule\\.startConstructionDate').fill('31/12/2024');
    await page.locator('input#schedule\\.startUpDate').fill('31/01/2025');

    await base.addScreenshot(testInfo, 'lch_projectScheduleDebug.png');

    // await page.getByLabel('Any other comments').click();
    // await page.getByLabel('Any other comments').fill('test');

    await expect(page.locator(lchPage.saveStatus)).toContainText('Saved');

    await lchPage.notifyJM();
})