import { expect, TestInfo } from '@playwright/test';
import { BasePage } from './basePage';
import { config } from '../tests/config';
import { error } from 'console';

export class LCHGITPage extends BasePage {

    //LCH Estimator
    estimatorProjectLocation = 'input[name="location"]';
    estimatorTargetHydrogen = 'input[name="hydrogen"]';
    estimatorCO2Tax = 'input[name="tax"]';

    //Discuss LCH Pop-ups Frame
    discussLCHFrame = '#senna_surface1 > div.MuiModal-root.MuiDialog-root.css-16lx97d > div.MuiDialog-container.MuiDialog-scrollPaper.css-ekeie0 > div > div';
    frameTitle = 'input[name="title"]';
    frameFirstName = 'input[name="firstname"]';
    frameLastName = 'input[name="lastname"]';
    frameOrganisation = 'input[name="company"]';
    frameEmail = 'input[name="email"]';
    frameOfficeLocation = 'input[name="officeLocation"]';
    frameDriverDecarbon = 'input[name="projectdrive"][value="decarbonisation"]';
    frameDriverProduct = 'input[name="projectdrive"][value="product"]';
    frameDriverOther = 'input[name="projectdrive"][value="other"]';
    frameProjectLocation = 'input[name="projectlocation"]';
    frameOperationDate = 'input[name="date"]';
    frameTargetHydrogen = 'input[name="targethydrogen"]';
    frameFeedstockSource = 'input[name="feedstock"]';
    frameComments = 'input[name="comments"]';
    frameMarketingConsent = 'input[name="marketingConsent"]';
    frameSubmitForm = 'button#estimator-form';

    async selectProjectLocation(location: string): Promise<void> {
        try {
            await this.page.locator(this.estimatorProjectLocation).fill(location);
            await this.page.getByRole('option', { name: `${location}` }).click();
        } catch (error) {
            console.error('Error Select Project Location:', error);
            throw error;
        }
    }

    async insertEstimatorTargetHydrogen(target: string): Promise<void>{
        try{
            await this.page.locator(this.estimatorTargetHydrogen).fill(target);
        } catch (error) {
            console.error('Error Estimator Target Hydrogen:', error);
            throw error;
        }
    }

    async insertRecoveredCO2(recovered: string): Promise<void>{
        try{
            await this.page.locator('div.MuiInputBase-root > input[name="recovery"]').fill(recovered);
        } catch(error){
            console.error('Error Overall CO2 Capture:', error);
            throw error;
        }
    }

    async insertCO2Tax(tax: string, measurement: '£/tonne' | '$/tonne'): Promise<void> {
        try {
            await this.page.locator(this.estimatorCO2Tax).fill(tax);
    
            await this.page.locator('#mui-component-select-tax-unit').click();
            await this.page.locator(`li[data-value="${measurement}"]`).click();
        } catch (error) {
            console.error('Error CO2 Tax:', error);
            throw error;
        }
    }

    async verifyLCOH(expected: string): Promise<void> {
        try {
            const lcoh = await this.page.locator('output[name="lcoh"]').evaluate(element => element.textContent?.trim());

            expect(lcoh).toBe(expected);
            console.log(`Levelised cost of hydrogen: ${lcoh} £/MWth (LHV)`)
        } catch (error) {
            console.error('Error verifying Levelised cost of hydrogen:', error);
            //await this.page.screenshot({ path: 'verifyLCOH-error-screenshot.png' });
            throw error;
        }
    }

    async verifyEfficiency(expected: string): Promise<void> {
        try {
            const efficiency = await this.page.locator('output[name="efficiency"]').evaluate(element => element.textContent?.trim());

            expect(efficiency).toBe(expected);
            console.log(`Energy efficiency: ${efficiency} %`)
        } catch (error) {
            console.error('Error verifying Energy Efficiency:', error);
            //await this.page.screenshot({ path: 'verifyLCOH-error-screenshot.png' });
            throw error;
        }
    }

    async verifyCO2Captured(expected: string): Promise<void> {
        try {
            const recovery = await this.page.locator('output[name="recovery"]').evaluate(element => element.textContent?.trim());

            expect(recovery).toBe(expected);
            console.log(`CO2 captured: ${recovery} TPY`)
        } catch (error) {
            console.error('Error verifying CO2 captured:', error);
            //await this.page.screenshot({ path: 'verifyLCOH-error-screenshot.png' });
            throw error;
        }
    }

    async verifyCO2Intensity(expected: string): Promise<void> {
        try {
            const intensity = await this.page.locator('output[name="intensity"]').evaluate(element => element.textContent?.trim());

            expect(intensity).toBe(expected);
            console.log(`CO2 Intensity: ${intensity} Kg CO2 / Kg H2`)
        } catch (error) {
            console.error('Error verifying CO2 captured:', error);
            //await this.page.screenshot({ path: 'verifyLCOH-error-screenshot.png' });
            throw error;
        }
    }

    async verifyCO2TaxSaving(expected: string): Promise<void> {
        try {
            const taxSaving = await this.page.locator('output[name="tax"]').nth(0).evaluate(element => element.textContent?.trim());

            expect(taxSaving).toBe(expected);
            console.log(`CO2 Tax Saving: ${taxSaving} £/Year`)
        } catch (error) {
            console.error('Error verifying CO2 Tax Saving:', error);
            //await this.page.screenshot({ path: 'verifyLCOH-error-screenshot.png' });
            throw error;
        }
    }

    async verifyCO2TaxBurden(expected: string): Promise<void> {
        try {
            const taxBurden = await this.page.locator('output[name="tax"]').nth(1).evaluate(element => element.textContent?.trim());

            expect(taxBurden).toBe(expected);
            console.log(`CO2 Intensity: ${taxBurden} £/Year`)
        } catch (error) {
            console.error('Error verifying CO2 Tax Burden:', error);
            //await this.page.screenshot({ path: 'verifyLCOH-error-screenshot.png' });
            throw error;
        }
    }

    async verifyPlotSize(expected: string): Promise<void> {
        try {
            const plot = await this.page.locator('output[name="plot"]').evaluate(element => element.textContent?.trim());

            expect(plot).toBe(expected);
            console.log(`CO2 Intensity: ${plot} m2`)
        } catch (error) {
            console.error('Error verifying Plot Size:', error);
            //await this.page.screenshot({ path: 'verifyLCOH-error-screenshot.png' });
            throw error;
        }
    }

    async getGasElectricityCost(): Promise<void> {
        await this.page.locator('h5').isVisible();


        try {
            const level = await this.page.locator('div.MuiBox-root.css-wzcjuz').evaluate(element => element.textContent?.trim());

            if (level) {
                const gasCostRegex = /(low|medium|high) gas cost/;
                const electricityCostRegex = /(low|medium|high) electricity cost/;

                // Extract the gas and electricity cost descriptions
                const gasCostMatch = level.match(gasCostRegex);
                const electricityCostMatch = level.match(electricityCostRegex);

                const gasCost = gasCostMatch ? gasCostMatch[1] : 'unknown';
                const electricityCost = electricityCostMatch ? electricityCostMatch[1] : 'unknown';

                console.log(`Gas Cost: ${gasCost}`);
                console.log(`Electricity Cost: ${electricityCost}`);
            } else {
                console.log('Element not found or no text content');
            }
        } catch (error) {
            console.error('Error getting gas and electricity costs:', error);
        }
    }

    async inserTitle(title: string): Promise<void> {
        try {
            await this.page.locator(this.frameTitle).fill(title);
        } catch (error) {
            console.error(error.message);
        }
    }

    async insertFirstName(firstName: string): Promise<void> {
        try {
            await this.page.locator(this.frameFirstName).fill(firstName);
        } catch (error) {
            console.error(error.message);
        }
    }

    async insertLastName(lastName: string): Promise<void> {
        try {
            await this.page.locator(this.frameLastName).fill(lastName);
        } catch (error) {
            console.error('Error inserting last name:', error);
        }
    }

    async insertOrganisation(organisation: string): Promise<void> {
        try {
            await this.page.locator(this.frameOrganisation).fill(organisation);
        } catch (error) {
            console.error('Error inserting organisation:', error);
        }
    }

    async insertEmail(email: string): Promise<void> {
        try {
            await this.page.locator(this.frameEmail).fill(email);
        } catch (error) {
            console.error('Error inserting email:', error);
        }
    }

    async insertOfficeLocation(officeLocation: string): Promise<void> {
        try {
            await this.page.locator(this.frameOfficeLocation).fill(officeLocation);
        } catch (error) {
            console.error('Error inserting office location:', error);
        }
    }

    async insertProjectDriver(driverType: 'decarbon' | 'product' | 'other'): Promise<void> {
        let frameLocator: string;

        switch (driverType) {
            case 'decarbon':
                frameLocator = this.frameDriverDecarbon;
                break;
            case 'product':
                frameLocator = this.frameDriverProduct;
                break;
            case 'other':
                frameLocator = this.frameDriverOther;
                break;
            default:
                console.error('Invalid driver type:', driverType);
                return;
        }

        try {
            await this.page.locator(frameLocator).check();
        } catch (error) {
            console.error(`Error selecting ${driverType} driver:`, error);
        }
    }

    async insertProjectLocation(projectLocation: string): Promise<void> {
        try {
            await this.page.locator(this.frameProjectLocation).fill(projectLocation);
        } catch (error) {
            console.error('Error inserting project location:', error);
        }
    }

    async insertOperationDate(operationDate: string): Promise<void> {
        try {
            await this.page.locator(this.frameOperationDate).fill(operationDate);
        } catch (error) {
            console.error('Error inserting operation date:', error);
        }
    }

    async insertTargetHydrogen(targetHydrogen: string): Promise<void> {
        try {
            await this.page.locator(this.frameTargetHydrogen).fill(targetHydrogen);
        } catch (error) {
            console.error('Error inserting target hydrogen:', error);
        }
    }

    async insertFeedstockSource(feedstockSource: string): Promise<void> {
        try {
            await this.page.locator(this.frameFeedstockSource).fill(feedstockSource);
        } catch (error) {
            console.error('Error inserting feedstock source:', error);
        }
    }

    async insertComments(comments: string): Promise<void> {
        try {
            await this.page.locator(this.frameComments).fill(comments);
        } catch (error) {
            console.error('Error inserting comments:', error);
        }
    }

    async selectJMFeature(feature: 'Lowest amount of CO₂ produced per unit hydrogen' | 'Minimises natural gas feedstock consumption' | 'Low capital expenditure' | 'Ability to import renewables' | 'High reliability' | 'Intensified plot plan' | 'Technology proven at scale'): Promise<void> {
        const featureLocators: { [key: string]: string } = {
            'Lowest amount of CO₂ produced per unit hydrogen': 'input[value="Lowest amount of CO₂ produced per unit hydrogen"]',
            'Minimises natural gas feedstock consumption': 'input[value="Minimises natural gas feedstock consumption"]',
            'Low capital expenditure': 'input[value="Low capital expenditure"]',
            'Ability to import renewables': 'input[value="Ability to import renewables"]',
            'High reliability': 'input[value="High reliability"]',
            'Intensified plot plan': 'input[value="Intensified plot plan"]',
            'Technology proven at scale': 'input[value="Technology proven at scale"]',
        };

        const featureLocator = featureLocators[feature];

        if (!featureLocator) {
            console.error('Invalid feature:', feature);
            return;
        }

        try {
            await this.page.locator(featureLocator).check();
        } catch (error) {
            console.error(`Error selecting feature "${feature}":`, error);
        }
    }

    async selectMarketingConsent(selection: boolean): Promise<void> {
        if (!selection) {
            this.page.locator(this.frameMarketingConsent).uncheck();
        } else {
            this.page.locator(this.frameMarketingConsent).check()
        }
    }
}