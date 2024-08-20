import { test, expect } from '@playwright/test';
import { BasePage } from '../../pages/basePage';
import { LCHPage } from '../../pages/lch_basePage';

test('Verify DCF LCH Effluant - Insert', {tag: '@smoke'}, async ({ page }, testInfo) => {
    const base = new BasePage(page);
    const lchPage = new LCHPage(page);

    await base.navigateToLCH(process.env.LCH_DCF_URL!);

    await lchPage.login_default();

    await page.getByText('Effluent').click();
    
    await page.locator('input#effluent\\.temperature').fill('300');
    await page.locator('#effluent\\.temperature_select').click();
    await lchPage.selectTempretureUnit('Celsius');

    await page.locator('input#effluent\\.pressure').fill('50');
    await page.locator('#effluent\\.pressure_select').click();
    await lchPage.selectPressureUnit('Bar (a)');

    await page.locator('#effluent\\.organicCompoundsCompositionLimits').fill('Test');

    await page.locator('#effluent\\.vapourEffluentLimits').fill('Test');

    await page.locator('#effluent\\.NOxConcentrationInVapour').fill('10000');

    // await page.getByLabel('Any other comments').click();
    // await page.getByLabel('Any other comments').fill('test');

    await expect(page.locator(lchPage.saveStatus)).toContainText('Saved');

    await lchPage.notifyJM();
})