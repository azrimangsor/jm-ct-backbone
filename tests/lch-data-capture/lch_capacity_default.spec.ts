import { test, expect } from '@playwright/test';
import { BasePage } from '../../pages/basePage';
import { LCHPage } from '../../pages/lch_basePage';
import { config } from '../config';

test('Verify DCF LCH Capacity - Insert', {tag: '@smoke'}, async ({ page }, testInfo) => {
    const base = new BasePage(page);
    const lchPage = new LCHPage(page);

    await base.navigateToLCH(process.env.LCH_DCF_URL!);

    await lchPage.login_default();
    
    await lchPage.selectSectionMenu('Capacity');

    await base.insertValueIntoTextbox(lchPage.capacityRequiredLocator, '1000');
    await lchPage.selectCapacityUnit('m3/hr');
    
    await base.insertValueIntoTextbox(lchPage.minimumTurndownCapacityLocator, '70');

    await base.insertValueIntoTextbox(lchPage.numberOfTrainsLocator, '3')
    
    // await page.getByLabel('Any other comments').click();
    // await page.getByLabel('Any other comments').fill('HHVtest');

    await expect(page.locator(lchPage.saveStatus)).toContainText('Saved');

    await lchPage.notifyJM();

})