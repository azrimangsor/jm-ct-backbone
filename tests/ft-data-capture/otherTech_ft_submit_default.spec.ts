import { test, expect } from '@playwright/test';
import { FTPage } from '../../pages/ft_basePage';
import { BasePage } from '../../pages/basePage';

test('Verify DCF LCH FT Other Technology - Visible', { tag: '@Smoke' }, async ({ page }, testInfo) => {
    const ftPage = new FTPage(page);
    const base = new BasePage(page);

    await test.step('Login to FT DCF home page', async () => {
        await base.navigateToFT(process.env.FT_DCF_URL!);

        await ftPage.login_default();
    });

    await test.step('Open Other Technology page', async () => {
        await page.locator(ftPage.otherTechnology).click();
    });

    await test.step('Verify the costs associated with the other technologies in the plant element', async () => {
        await page.locator(ftPage.otherTechnologyOtherCosts).isVisible();
        //await page.locator(ftPage.otherTechnologyOtherCosts).isEditable();
    });

    await test.step('Verify other parties that involved element', async () => {
        await page.locator(ftPage.otherTechnologyOtherCosts).isVisible();
        //await page.locator(ftPage.otherTechnologyOtherCosts).isEditable();
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

test('Verify DCF LCH FT Other Technology - Insert', { tag: ['@e2e'] }, async ({ page }, testInfo) => {
    const ftPage = new FTPage(page);
    const base = new BasePage(page);

    await test.step('Login to FT DCF home page', async () => {
        await base.navigateToFT(process.env.FT_DCF_URL!);

        await ftPage.login_default();
    });

    await test.step('Open Other Technology page', async () => {
        await page.locator(ftPage.otherTechnology).click();
    });

    await test.step('Insert the costs associated with the other technologies in the plant', async () => {
        await page.locator(ftPage.otherTechnologyOtherCosts).fill('Insert Other Technology Cost');
    });

    await test.step('Insert other parties that involved', async () => {
        await page.locator(ftPage.otherTechnologyOtherParties).fill('Insert Other Technology Parties');
    });
})