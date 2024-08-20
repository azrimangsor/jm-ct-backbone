import { test, expect } from '@playwright/test';
import { BasePage } from '../../pages/basePage';
import { LCHPage } from '../../pages/lch_basePage';

test('Verify DCF LCH Products - Insert', {tag: '@smoke'}, async ({ page }, testInfo) => {
    const base = new BasePage(page);
    const lchPage = new LCHPage(page);

    await base.navigateToLCH(process.env.LCH_DCF_URL!);

    await lchPage.login_default();

    await page.getByText('Products').click();

    //JM generic H2 composition
    await page.getByLabel('Yes').first().check();
    
    //JM generic H2 conditions
    await page.getByLabel('Yes').nth(1).check();

    //JM generic CO2 composition
    await page.getByLabel('Yes').nth(2).check();
    
    //JM generic CO2 conditions
    await page.getByLabel('Yes').nth(3).check();
    
    //CO2 product composition
    await page.getByLabel('Yes').nth(4).check();

    await expect(page.locator(lchPage.saveStatus)).toContainText('Saved');
    
    await lchPage.notifyJM();
})