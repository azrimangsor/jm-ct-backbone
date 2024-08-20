import { test, expect } from '@playwright/test';
import { BasePage } from '../../pages/basePage';
import { FTPage } from '../../pages/ft_basePage';

test('Visual Validation Test - Landing Page', { tag: '@visual'}, async ({ page }) => {
    const ftPage = new FTPage(page);
    const base = new BasePage(page);

    // Navigate to the page you want to test
    await base.navigateToFT('https://uat-dcf.ft.matthey.com/group/guest/project?projectId=c650e5e9-476e-ee11-9ae7-000d3a2d671b');

    await ftPage.login_default();

    // Take a screenshot of the full page
    const screenshot = await page.screenshot();

    // Compare the screenshot with the baseline image
    expect(screenshot).toMatchSnapshot({
        threshold: 1.00, // Set the threshold for allowable differences
    });
});
