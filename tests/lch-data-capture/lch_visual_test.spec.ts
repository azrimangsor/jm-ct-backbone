import { test, expect } from '@playwright/test';
import { BasePage } from '../../pages/basePage';
import { LCHPage } from '../../pages/lch_basePage';

test('Visual Validation Test - Landing Page', async ({ page }) => {
    const base = new BasePage(page);
    const lchPage = new LCHPage(page);

    // Navigate to the page you want to test
    await base.navigateToLCH(process.env.LCH_DCF_URL!);

    await lchPage.login_default();

    // Take a screenshot of the full page
    const screenshot = await page.screenshot();

    // Compare the screenshot with the baseline image
    expect(screenshot).toMatchSnapshot({
        threshold: 1.00, // Set the threshold for allowable differences
    });
});

test('Visual Validation Test - Project Details Page', async ({ page }) => {
    const base = new BasePage(page);
    const lchPage = new LCHPage(page);

    // Navigate to the page you want to test
    await base.navigateToLCH(process.env.LCH_DCF_URL!);

    await lchPage.login_default();

    await page.getByText('Project Details').click();

    // Take a screenshot of the full page
    const screenshot = await page.screenshot();

    // Compare the screenshot with the baseline image
    expect(screenshot).toMatchSnapshot({
        threshold: 1.00, // Set the threshold for allowable differences
    });
});

test('Visual Validation Test - Capacity Page', async ({ page }) => {
    const base = new BasePage(page);
    const lchPage = new LCHPage(page);

    // Navigate to the page you want to test
    await base.navigateToLCH(process.env.LCH_DCF_URL!);

    await lchPage.login_default();

    await page.getByText('Capacity').click();

    // Take a screenshot of the full page
    const screenshot = await page.screenshot();

    // Compare the screenshot with the baseline image
    expect(screenshot).toMatchSnapshot({
        threshold: 1.00, // Set the threshold for allowable differences
    });
});

test('Visual Validation Test - Carbon Capture Page', async ({ page }) => {
    const base = new BasePage(page);
    const lchPage = new LCHPage(page);

    // Navigate to the page you want to test
    await base.navigateToLCH(process.env.LCH_DCF_URL!);

    await lchPage.login_default();

    await page.getByText('Carbon Capture').click();

    // Take a screenshot of the full page
    const screenshot = await page.screenshot();

    // Compare the screenshot with the baseline image
    expect(screenshot).toMatchSnapshot({
        threshold: 1.00, // Set the threshold for allowable differences
    });
});