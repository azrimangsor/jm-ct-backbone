import { test, expect } from '@playwright/test';
import { BasePage } from '../../pages/basePage';
import { LCHGITPage } from '../../pages/lch_git_basePage';

test('Visual Validation Test - Home Page', async ({ page }) => {
    let base: BasePage;

    base = new BasePage(page);

    // Navigate to the page you want to test
    await base.navigateToURL(process.env.LCH_GIT_URL!);

    // Take a screenshot of the full page
    const screenshot = await page.screenshot();

    // Compare the screenshot with the baseline image
    expect(screenshot).toMatchSnapshot({
        threshold: 1.00, // Set the threshold for allowable differences
    });
});

test('Visual Validation Test - Discuss With Us Form', async ({ page }) => {
    let base: BasePage;

    base = new BasePage(page);

    // Navigate to the page you want to test
    await base.navigateToURL(process.env.LCH_GIT_URL!);

    await page.getByRole('button', { name: 'Accept All Cookies' }).click();

    await page.locator('a.jm-get-in-touch > span.panel__btntext').click();

    // Take a screenshot of the full page
    const screenshot = await page.screenshot();

    // Compare the screenshot with the baseline image
    expect(screenshot).toMatchSnapshot({
        threshold: 1.00, // Set the threshold for allowable differences
    });
});