import { test, expect } from '@playwright/test';
import { FTPage } from '../../pages/ft_basePage';
import { BasePage } from '../../pages/basePage';

test('Verify DCF LCH FT Schedule - Insert', { tag: '@Smoke' }, async ({ page }) => {
    const ftPage = new FTPage(page);
    const base = new BasePage(page);

    await test.step('Login to FT DCF home page', async () => {
        await base.navigateToFT(process.env.FT_DCF_URL!);
        await ftPage.login_default();
    });

    await test.step('Open Schedule page', async () => {
        await page.click(ftPage.schedule);
    });

    await test.step('Fill in schedule dates', async () => {
        await page.locator(ftPage.schedulePreFeedStartDate).fill('20/06/2025');
        await page.locator(ftPage.scheduleFeedStartDate).fill('June 2025');
        await page.locator(ftPage.scheduleFinalInvestmentDecisionDate).fill('October 2025');
        await page.locator(ftPage.scheduleConstructionDate).fill('November 2025');
        await page.locator(ftPage.scheduleStartUpDate).fill('January 2025');
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
});
