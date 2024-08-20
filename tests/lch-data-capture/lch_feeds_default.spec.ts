import { test, expect } from '@playwright/test';
import { BasePage } from '../../pages/basePage';
import { LCHPage } from '../../pages/lch_basePage';

test('Verify DCF LCH Feeds - Insert', {tag: '@smoke'}, async ({ page }, testInfo) => {
    const base = new BasePage(page);
    const lchPage = new LCHPage(page);

    await base.navigateToLCH(process.env.LCH_DCF_URL!);

    await lchPage.login_default();

    await page.getByText('Feeds').click();

    //Feed Composition - JM generic feed composition
    //await page.getByLabel('Yes').first().check();
    await page.locator('input[name="fieldset-feeds.feedCompositionUseJMGenericValues"][value="yes"]').click();

    //Feed Conditions - JM generic feed conditions
    await page.getByLabel('Yes').nth(1).check();

    //Feed Impurities
    await page.getByLabel('Sulphur - average H2S').click();
    await page.getByLabel('Sulphur - average H2S').fill('10000');

    await page.getByLabel('Maximum organic sulphur').click();
    await page.getByLabel('Maximum organic sulphur').fill('5000');

    await page.getByLabel('Chlorides - max organic and').click();
    await page.getByLabel('Chlorides - max organic and').fill('1000');

    await page.getByLabel('Chlorides - average HCI').click();
    await page.getByLabel('Chlorides - average HCI').fill('1000');

    await page.getByLabel('Metals').click();
    await page.getByLabel('Metals').fill('2000');

    await page.getByLabel('Olefins').click();
    await page.getByLabel('Olefins').fill('0.555');

    await page.locator('div').filter({ hasText: /^Is there the possibility of process condensates\?RecommendedYesNo$/ }).getByLabel('Yes').check();
    
    await page.getByLabel('Other').click();
    await page.getByLabel('Other').fill('noney');
    
    await page.locator('div').filter({ hasText: /^Are there alternative Rating Cases that should be considered\?RecommendedYesNo$/ }).getByLabel('No').check();

    // await page.getByLabel('Any other comments').click();
    // await page.getByLabel('Any other comments').fill('test');

    await expect(page.locator('#js-portlet-_lchdatacapture_INSTANCE_r2pdleH9exJo_')).toContainText('Saved');

    await lchPage.notifyJM();
})