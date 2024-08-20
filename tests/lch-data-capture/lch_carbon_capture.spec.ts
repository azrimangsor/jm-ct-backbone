import { test, expect } from '@playwright/test';
import { BasePage } from '../../pages/basePage';
import { LCHPage } from '../../pages/lch_basePage';
import { config } from '../config';

test('Verify DCF LCH Carbon Capture - Insert', {tag: '@smoke'}, async ({ page }, testInfo) => {
    const base = new BasePage(page);
    const lchPage = new LCHPage(page);

    await base.navigateToLCH(process.env.LCH_DCF_URL!);

    await lchPage.login_default();

    await lchPage.selectSectionMenu('Carbon Capture');

    await lchPage.carbonCaptureState('carbonCaptureRate');

    await base.insertValueIntoTextbox(lchPage.carbonCaptureRateCo2, '95');
    
    await page.locator('input.PrivateSwitchBase-input[value="process"]').check();
    
    // await page.getByLabel('Any other comments').fill('Test');

    await expect(page.locator(lchPage.saveStatus)).toContainText('Saved');

    await lchPage.notifyJM();
})