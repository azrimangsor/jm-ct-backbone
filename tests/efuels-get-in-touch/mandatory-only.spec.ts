import { test, expect } from '@playwright/test';
import { EFPage } from '../../pages/efuels_basePage';
import { BasePage} from '../../pages/basePage';
import { allure } from 'allure-playwright';

test('Verify EFuels Get In Touch Form - Fill in Mandatory Fields Only', { tag : '@smoke' }, async ({ page }, testInfo) => {
    const efpage = new EFPage(page);
    const base = new BasePage(page);

    allure.severity('critical');
    allure.description('Verify all mandatory input fields can be entered and for can be submit');

    // Step 1: Navigate to the EFuel URL and accept cookies
    await test.step('Step 1: Navigate to the EFuel URL and accept cookies', async () => {
        await base.navigateToURL(process.env.EFUEL_URL!);
        await page.locator(efpage.acceptAllCookies).click();
    });

    // Step 2: Open the "Get In Touch" form
    await test.step('Step 2: Open the "Get In Touch" form', async () => {
        await page.locator(efpage.btn_getInTouch).click();
    });

    // Step 3: Fill in mandatory fields
    await test.step('Step 3: Fill in mandatory fields', async () => {
        await efpage.enterTitle('Mr');
        await efpage.enterFirstName('John');
        await efpage.enterLastName('Locke');
        await efpage.enterWorkEmail('john.locke@dharma.com');
        await efpage.enterOrganisation('Dharma Initiative');
        await efpage.enterOfficeLocation('Hawaii, US');
    });

    // Step 4: Submit the form
    // await test.step('Step 4: Submit the form', async () => {
    //     await efpage.clickSendButton();
    // });

    // Step 5: Verify submission success
    // await test.step('Step 5: Verify submission success', async () => {
    //     await expect(page.frameLocator('#sbsq__iframe_').getByRole('heading', { name: 'Contact information submitted!' })).toBeVisible();
    //     await page.getByLabel('close').click();
    // });
})