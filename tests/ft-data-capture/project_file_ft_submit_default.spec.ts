import { test, expect } from '@playwright/test';
import { FTPage } from '../../pages/ft_basePage';
import { BasePage} from '../../pages/basePage';

test('Verify DCF LCH FT Project Details - Small Scale User', { tag: '@Smoke'}, async ({ page }, testInfo) => {
    const ftPage = new FTPage(page);
    const base = new BasePage(page);

    await test.step('Login to FT DCF home page', async () => {
        await base.navigateToFT(process.env.FT_DCF_URL!);

        await ftPage.login_default();
    });

    await test.step('Open Project Detail page', async () => {
        await page.locator(ftPage.projectDetails).click();
    });

    await test.step('Insert Project Details', async () => {
        await page.locator(ftPage.companyName).fill('Test Company FT DCF');
        await page.locator(ftPage.companyLegalName).fill('Test Company FT DCF LLC');
        await page.locator(ftPage.companyRegisteredAddress).fill('79-A Lincoln Green Lane, Churchill WR7 2ZR UK');
        await page.locator(ftPage.companyRegisteredNumber).fill('071 3598 0824');
        await page.locator(ftPage.projectName).fill('FT DCF Test Project');
        await page.locator(ftPage.projectLocation).fill('United Kingdom');

        await page.locator(ftPage.hasFeedstockSupplierNo).click();
        await page.locator(ftPage.hasProductOfftakerNo).click();
        await page.locator(ftPage.hasSiteNo).click();
    });

    await test.step('Notify JM',  async () => {
        await page.locator(ftPage.buttonNotifyJM).click();

        await Promise.all([
            page.waitForResponse((response) =>
              response.url().includes('/notify') && response.status() === 200
            ),
            // Trigger the POST request, for example by clicking a submit button
            page.locator(ftPage.buttonSendNotification).getByText('Send Notification').click()
          ]);
    
        await page.locator(ftPage.notificationMsgBox).getByText('Notification sent!').isVisible();
    });
})