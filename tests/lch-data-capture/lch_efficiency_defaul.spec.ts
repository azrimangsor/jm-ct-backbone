import { test, expect } from '@playwright/test';
import { BasePage } from '../../pages/basePage';
import { LCHPage } from '../../pages/lch_basePage';
import { config } from '../config';

test('Verify DCF LCH Efficiency - Insert', {tag: '@smoke'}, async ({ page }, testInfo) => {
    const base = new BasePage(page);
    const lchPage = new LCHPage(page);

    await base.navigateToLCH(process.env.LCH_DCF_URL!);

    await lchPage.login_default();

    await lchPage.selectSectionMenu('Efficiency');

    await page.getByLabel('Yes', { exact: true }).check();

    await expect(page.locator(lchPage.saveStatus)).toContainText('Saved');

    await lchPage.notifyJM();
})