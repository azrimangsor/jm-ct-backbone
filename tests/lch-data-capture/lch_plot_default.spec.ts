import { test, expect } from '@playwright/test';
import { BasePage } from '../../pages/basePage';
import { LCHPage } from '../../pages/lch_basePage';

test('Verify DCF LCH Plot - Insert', {tag: '@smoke'}, async ({ page }, testInfo) => {
    const base = new BasePage(page);
    const lchPage = new LCHPage(page);

    await base.navigateToLCH(process.env.LCH_DCF_URL!);

    await lchPage.login_default();

    await page.getByText('Plot').click();

    await page.locator('input#plot\\.availableAreaLength').fill('1036');

    await page.locator('input#plot\\.availableAreaWidth').fill('70');

    await page.locator('textarea#plot\\.additionalConsiderations').fill('This is an automated test');

    // await page.getByLabel('Any other comments').click();
    // await page.getByLabel('Any other comments').fill('test');

    await expect(page.locator(lchPage.saveStatus)).toContainText('Saved');

    await lchPage.notifyJM();
})