import { test, expect } from '@playwright/test';
import { BasePage } from '../../pages/basePage';
import { LCHGITPage } from '../../pages/lch_git_basePage';
import * as testData from './testData_LCH_GIT.json';

test('LCH Estimator Form - LCH Estimator Form - United Kingdom', async ({ page }) => {
    const base = new BasePage(page);
    const lch = new LCHGITPage(page);

    // Navigate to the page you want to test
    await base.navigateToURL(process.env.LCH_GIT_URL!);

    await page.getByRole('button', { name: 'Accept All Cookies' }).click();

    //Fill up estimator form
    await lch.selectProjectLocation('United Kingdom');
    await lch.getGasElectricityCost();
    await lch.insertEstimatorTargetHydrogen('3500.2');
    await lch.insertRecoveredCO2('75');
    await lch.insertCO2Tax('50','£/tonne');

    //Verify the estimate calculation
    await lch.verifyLCOH('39 - 47');
    await lch.verifyEfficiency('>85');
    await lch.verifyCO2Captured('6M');
    await lch.verifyCO2Intensity('2.09');
    await lch.verifyCO2TaxSaving('279M');
    await lch.verifyCO2TaxBurden('92.9M');
    await lch.verifyPlotSize('56.25k');

});

test('LCH Estimator Form - LCH Estimator Form - Afghanistan', async ({ page }) => {
    let base: BasePage;
    let lch: LCHGITPage;

    base = new BasePage(page);
    lch = new LCHGITPage(page);

    // Navigate to the page you want to test
    await base.navigateToURL(process.env.LCH_GIT_URL!);

    await page.getByRole('button', { name: 'Accept All Cookies' }).click();

    //Fill up estimator form
    await lch.selectProjectLocation('Afghanistan');
    await lch.getGasElectricityCost();
    await lch.insertEstimatorTargetHydrogen('3500.2');
    await lch.insertRecoveredCO2('75');
    await lch.insertCO2Tax('50','£/tonne');

    //Verify the estimate calculation
    await lch.verifyLCOH('12 - 15');
    await lch.verifyEfficiency('>85');
    await lch.verifyCO2Captured('6M');
    await lch.verifyCO2Intensity('2.09');
    await lch.verifyCO2TaxSaving('279M');
    await lch.verifyCO2TaxBurden('92.9M');
    await lch.verifyPlotSize('56.25k');

});

test('LCH Estimator Form - LCH Estimator Form - Japan', async ({ page }) => {
    let base: BasePage;
    let lch: LCHGITPage;

    base = new BasePage(page);
    lch = new LCHGITPage(page);

    // Navigate to the page you want to test
    await base.navigateToURL(process.env.LCH_GIT_URL!);

    await page.getByRole('button', { name: 'Accept All Cookies' }).click();

    //Fill up estimator form
    await lch.selectProjectLocation('Japan');
    await lch.getGasElectricityCost();
    await lch.insertEstimatorTargetHydrogen('3500.2');
    await lch.insertRecoveredCO2('75');
    await lch.insertCO2Tax('50','£/tonne');

    //Verify the estimate calculation
    await lch.verifyLCOH('55 - 68');
    await lch.verifyEfficiency('>85');
    await lch.verifyCO2Captured('6M');
    await lch.verifyCO2Intensity('2.09');
    await lch.verifyCO2TaxSaving('279M');
    await lch.verifyCO2TaxBurden('92.9M');
    await lch.verifyPlotSize('56.25k');

});

test('E2E - Submit Get In Touch form from LCH Estimator page', async ({ page}) => {
    const base = new BasePage(page);
    const lch = new LCHGITPage(page);

    // Navigate to the page you want to test
    await base.navigateToURL(process.env.LCH_GIT_URL!);

    await page.getByRole('button', { name: 'Accept All Cookies' }).click();

    await page.getByRole('button', { name: 'get in touch' }).click();

    await expect(page.locator(lch.discussLCHFrame)).toBeVisible();

    await lch.inserTitle(testData.title);
    await lch.insertFirstName(testData.firstName);
    await lch.insertLastName(testData.lastName);
    await lch.insertOrganisation(testData.organisation);
    await lch.insertEmail(testData.email);
    await lch.insertOfficeLocation(testData.officeLocation);
    await lch.insertProjectDriver('decarbon');
    await lch.insertProjectLocation(testData.projectLocation);
    await lch.insertTargetHydrogen(testData.targetHydrogen);
    await lch.insertFeedstockSource(testData.feedstockSource);
    await lch.selectJMFeature('High reliability');
    await lch.insertComments(testData.comments);
    await lch.selectMarketingConsent(true);

    await page.locator(lch.frameSubmitForm).click();
})

test('E2E - Submit Get In Touch form from LCH Estimator page with Estimator details', async ({ page}) => {
    const base = new BasePage(page);
    const lch = new LCHGITPage(page);

    // Navigate to the page you want to test
    await base.navigateToURL(process.env.LCH_GIT_URL!);

    await page.getByRole('button', { name: 'Accept All Cookies' }).click();

    //Fill up estimator form
    await lch.selectProjectLocation('United Kingdom');
    await lch.getGasElectricityCost();
    await lch.insertEstimatorTargetHydrogen('3500.2');
    await lch.insertRecoveredCO2('75');
    await lch.insertCO2Tax('50','£/tonne');

    await page.getByRole('button', { name: 'get in touch' }).click();

    await expect(page.locator(lch.discussLCHFrame)).toBeVisible();

    await lch.inserTitle(testData.title);
    await lch.insertFirstName(testData.firstName);
    await lch.insertLastName(testData.lastName);
    await lch.insertOrganisation(testData.organisation);
    await lch.insertEmail(testData.email);
    await lch.insertOfficeLocation(testData.officeLocation);
    await lch.insertProjectDriver('decarbon');
    await lch.insertProjectLocation(testData.projectLocation);
    await lch.insertTargetHydrogen(testData.targetHydrogen);
    await lch.insertFeedstockSource(testData.feedstockSource);
    await lch.selectJMFeature('High reliability');
    await lch.insertComments(testData.comments);
    await lch.selectMarketingConsent(false);

    await page.locator(lch.frameSubmitForm).click();
})