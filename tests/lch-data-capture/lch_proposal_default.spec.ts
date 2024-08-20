import { test, expect } from '@playwright/test';
import { BasePage } from '../../pages/basePage';
import { LCHPage } from '../../pages/lch_basePage';

test('Verify DCF LCH Proposal - GBP', {tag: '@smoke'}, async ({ page }, testInfo) => {
    const base = new BasePage(page);
    const lchPage = new LCHPage(page);

    await base.navigateToLCH(process.env.LCH_DCF_URL!);

    await lchPage.login_default();

    await page.getByText('Proposal').click();

    await page.locator('input#proposal\\.expectedRFIIssueDate').fill('06/06/2025');
    await page.locator('textarea#proposal\\.requiredDocumentsAndInformation').fill('This is an automated test');

    await page.locator('input#proposal\\.deadlineDate').fill('06/05/2025');

    await page.locator('input#proposal\\.deadlineTime').fill('00:00 UK');

    await base.addScreenshot(testInfo, 'proposal_full.png');

    await expect(page.locator(lchPage.saveStatus)).toContainText('Saved');

    await lchPage.notifyJM();
})

test('Verify DCF LCH Proposal - USD', async ({ page }, testInfo) => {
    const base = new BasePage(page);
    const lchPage = new LCHPage(page);

    await base.navigateToLCH(process.env.LCH_DCF_URL!);

    await lchPage.login_default();

    await page.getByText('Proposal').click();

    await page.locator('input#proposal\\.expectedRFIIssueDate').fill('06/06/2025');
    await page.locator('textarea#proposal\\.requiredDocumentsAndInformation').fill('This is an automated test');

    await page.locator('input#proposal\\.deadlineDate').fill('06/05/2025');

    await page.locator('input#proposal\\.deadlineTime').fill('00:00 US');

    await base.addScreenshot(testInfo, 'proposal_full.png');

    await expect(page.locator(lchPage.saveStatus)).toContainText('Saved');
})

test('Verify DCF LCH Proposal - EUR', async ({ page }, testInfo) => {
    let base: BasePage;
    let lchPage: LCHPage;

    base = new BasePage(page);
    lchPage = new LCHPage(page);

    await base.navigateToLCH('https://uat-dcf.matthey.com/group/guest/project?projectId=939013bb-035d-ee11-be6f-000d3a2d6e62');

    await lchPage.login_default();

    await page.getByText('Proposal').click();

    await page.locator('input#proposal\\.expectedRFIIssueDate').fill('06/06/2025');
    await page.locator('textarea#proposal\\.requiredDocumentsAndInformation').fill('This is an automated test');

    await page.locator('input#proposal\\.deadlineDate').fill('06/05/2025');

    await page.locator('input#proposal\\.deadlineTime').fill('00:00 GER');

    await base.addScreenshot(testInfo, 'proposal_full.png');

    await expect(page.locator(lchPage.saveStatus)).toContainText('Saved');
})