import { test, expect } from '@playwright/test';
import { FTPage } from '../../pages/ft_basePage';
import { BasePage} from '../../pages/basePage';

test('Verify DCF LCH FT Plot - Insert with no restriction', { tag : '@smoke' }, async ({ page }, testInfo) => {
    const ftPage = new FTPage(page);
    const base = new BasePage(page);

    await test.step('Login to FT DCF home page', async () => {
        await base.navigateToFT(process.env.FT_DCF_URL!);

        await ftPage.login_default();
    });

    await test.step('Open Plot page', async () => {
        await page.locator(ftPage.plot).click();
    });

    //Available area (length)
    await test.step('Insert plot length', async () => {
        await page.locator(ftPage.plotLength).fill('30');
        await page.locator(ftPage.plotLengthUnit).click();
        await base.selectValueFromDropDown('Metres (m)');
    });

    //Available area (width)
    await test.step('Insert Plot width', async () => {
        await page.locator(ftPage.plotWidth).fill('30');
        await page.locator(ftPage.plotWidthUnit).click();
        await base.selectValueFromDropDown('Metres (m)');
    });

    await test.step('Insert additional consideration for plot', async () => {
        await page.fill(ftPage.plotAdditionalConsideration, 'Plot details inserted here');;
    });

    //Plot Restrictions
    await test.step('Select restriction applicable to the spot', async () => {
        await ftPage.checkRestriction(ftPage.plotRestrictionAir, 'no');
        await ftPage.checkRestriction(ftPage.plotRestrictionShipping, 'no');
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

test('Verify DCF LCH FT Plot - Insert with Restriction', async ({ page }, testInfo) => {
    const ftPage = new FTPage(page);
    const base = new BasePage(page);

    await test.step('Login to FT DCF home page', async () => {
        await base.navigateToFT(process.env.FT_DCF_URL!);

        await ftPage.login_default();
    });

    await test.step('Open Plot page', async () => {
        await page.locator(ftPage.plot).click();
    });

    //Available area (length)
    await test.step('Insert plot length', async () => {
        await page.locator(ftPage.plotLength).fill('30');
        await page.locator(ftPage.plotLengthUnit).click();
        await base.selectValueFromDropDown('Metres (m)');
    });

    //Available area (width)
    await test.step('Insert Plot width', async () => {
        await page.locator(ftPage.plotWidth).fill('30');
        await page.locator(ftPage.plotWidthUnit).click();
        await base.selectValueFromDropDown('Metres (m)');
    });

    await test.step('Insert additional consideration for plot', async () => {
        await page.fill(ftPage.plotAdditionalConsideration, 'Plot details inserted here');;
    });

    //Plot Restrictions
    await test.step('Select restriction applicable to the spot', async () => {
        await ftPage.checkRestriction(ftPage.plotRestrictionAir, 'yes');
        await ftPage.checkRestriction(ftPage.plotRestrictionShipping, 'yes');
    });

    // await page.click('#panel-plot\\.otherComments-header > div.MuiAccordionSummary-expandIconWrapper.css-1fx8m19 > svg');
    // await page.fill('textarea#plot\\.otherComments', 'Products details');
})