import { expect, TestInfo } from '@playwright/test';
import { BasePage } from './basePage';

type AmmoniaType = 'Electrolytic' | 'CCS Enabled';
type HydrogenUnit = 'Tonne/h' | 'kNm3/h';
type ConsentValue = 'yes' | 'no';

export class EFPage extends BasePage {

    //Cookies Banner
    acceptAllCookies = '//*[@id="onetrust-accept-btn-handler"]';
    rejectAllCookies = '//*[@id="onetrust-reject-all-handler"]';
    cookiesSetting = '//*[@id="onetrust-pc-btn-handler"]';

    btn_getInTouch = 'div > div:nth-child(1) > a[id^="panel_blue_button_"]';

    async enterTitle(title: string): Promise<void> {
        await this.page.frameLocator('#sbsq__iframe_').getByPlaceholder('Please input your title').click();
        await this.page.frameLocator('#sbsq__iframe_').getByPlaceholder('Please input your title').fill(title);
    }

    async enterFirstName(firstName: string): Promise<void> {
        await this.page.frameLocator('#sbsq__iframe_').getByPlaceholder('Please input your first name').click();
        await this.page.frameLocator('#sbsq__iframe_').getByPlaceholder('Please input your first name').fill(firstName);
    }

    async enterLastName(lastName: string): Promise<void> {
        await this.page.frameLocator('#sbsq__iframe_').getByPlaceholder('Please input your last name').click();
        await this.page.frameLocator('#sbsq__iframe_').getByPlaceholder('Please input your last name').fill(lastName);
    }

    async enterWorkEmail(email: string): Promise<void> {
        await this.page.frameLocator('#sbsq__iframe_').getByPlaceholder('Please input your work email address').click();
        await this.page.frameLocator('#sbsq__iframe_').getByPlaceholder('Please input your work email address').fill(email);
    }

    async enterOrganisation(company: string): Promise<void> {
        await this.page.frameLocator('#sbsq__iframe_').getByPlaceholder('Please input your organisation').click();
        await this.page.frameLocator('#sbsq__iframe_').getByPlaceholder('Please input your organisation').fill(company);
    }

    async enterOfficeLocation(location: string): Promise<void> {
        await this.page.frameLocator('#sbsq__iframe_').getByPlaceholder('Please input your office location').click();
        await this.page.frameLocator('#sbsq__iframe_').getByPlaceholder('Please input your office location').fill(location);
    }

    async clickSendButton(): Promise<void>{
        await this.page.frameLocator('#sbsq__iframe_').getByRole('button', { name: 'Send' }).click();
    }

    async selectOccupation(jobs: string): Promise<void>{

        jobs = jobs ?? 'Consultant';

        await this.page.frameLocator('#sbsq__iframe_').locator('div').filter({ hasText: /^Please confirm your role$/ }).nth(1).click();
        await this.page.frameLocator('#sbsq__iframe_').getByText(jobs).click();
    }

    async selectProjectStartDate(): Promise<void>{
        await this.page.frameLocator('#sbsq__iframe_').locator('div').filter({ hasText: /^Please confirm your start date of operation$/ }).nth(2).click();
        await this.page.frameLocator('#sbsq__iframe_').getByLabel('Next Year').click();
        await this.page.frameLocator('#sbsq__iframe_').getByLabel('Choose December').click();
    }

    async selectProjectLocation(location: string): Promise<void>{

        location = location ?? 'Malaysia';

        await this.page.frameLocator('#sbsq__iframe_').locator('div').filter({ hasText: /^Please select your project location$/ }).nth(1).click();
        await this.page.frameLocator('#sbsq__iframe_').getByText(location).click();
    }

    async selectAmmoniaTypes(ammoniaType: AmmoniaType): Promise<void> {

        ammoniaType = ammoniaType ?? 'Electrolytic';

        await this.page.frameLocator('#sbsq__iframe_').locator('div').filter({ hasText: /^Please select your ammonia type$/ }).nth(1).click();
        await this.page.frameLocator('#sbsq__iframe_').getByText(ammoniaType, { exact: true }).click();
    }

    async insertTargetHydrogen(targetHydrogen: string, unit: HydrogenUnit): Promise<void>{
        await this.page.frameLocator('#sbsq__iframe_').getByPlaceholder('Confirm your target hydrogen').click();
        await this.page.frameLocator('#sbsq__iframe_').getByPlaceholder('Confirm your target hydrogen').fill(targetHydrogen);

        await this.page.frameLocator('#sbsq__iframe_').locator('div:nth-child(2) > .css-b62m3t-container > .css-cd0wah-control').first().click();
        this.page.frameLocator('#sbsq__iframe_').getByText(unit, { exact: true }).click();
    }

    async selectHydrogenPurity(hydrogenPurity: string): Promise<void>{
        await this.page.frameLocator('#sbsq__iframe_').locator('div').filter({ hasText: /^Please confirm your hydrogen purity requirements$/ }).nth(1).click();
        this.page.frameLocator('#sbsq__iframe_').getByText(hydrogenPurity, { exact: true }).click();
    }

    async selectHydrogenApplication(hydrogenApplication: string): Promise<void>{
        await this.page.frameLocator('#sbsq__iframe_').locator('div').filter({ hasText: /^Please confirm your hydrogen application$/ }).nth(1).click();
        this.page.frameLocator('#sbsq__iframe_').getByText(hydrogenApplication, { exact: true }).click();
    }

    async insertProcessEmissionTarget(emissionTarget: string): Promise<void>{
        await this.page.frameLocator('#sbsq__iframe_').getByLabel('Process emissions target').click();
        await this.page.frameLocator('#sbsq__iframe_').getByLabel('Process emissions target').fill(emissionTarget);
    }
    
    async insertAmmoniaFeedstockPrice(ammoniaPrice: string, unit: string): Promise<void>{
        await this.page.frameLocator('#sbsq__iframe_').getByLabel('Ammonia feedstock price', { exact: true }).click();
        await this.page.frameLocator('#sbsq__iframe_').getByLabel('Ammonia feedstock price', { exact: true }).fill(ammoniaPrice);

        await this.page.frameLocator('#sbsq__iframe_').locator('div:nth-child(19) > .ContactForm_flexContainer__7dxaN > div:nth-child(2) > .css-b62m3t-container > .css-cd0wah-control').click();
        this.page.frameLocator('#sbsq__iframe_').getByText(unit, { exact: true });
    }

    async insertPlotSpaceLimitation(plotSpace: string, plotUnit: string): Promise<void>{
        await this.page.frameLocator('#sbsq__iframe_').getByLabel('Plot space limitations', { exact: true }).click();
        await this.page.frameLocator('#sbsq__iframe_').getByLabel('Plot space limitations', { exact: true }).fill(plotSpace);
        await this.page.frameLocator('#sbsq__iframe_').locator('div:nth-child(20) > .ContactForm_flexContainer__7dxaN > div:nth-child(2) > .css-b62m3t-container > .css-cd0wah-control').click();
        this.page.frameLocator('#sbsq__iframe_').getByText(plotUnit, { exact: true });
    }

    async insertComment(): Promise<void>{
        await this.page.frameLocator('#sbsq__iframe_').getByPlaceholder('Please input your comment here').click();
        await this.page.frameLocator('#sbsq__iframe_').getByPlaceholder('Please input your comment here').fill('This is test generated message from a automated test.');
    }

    async setMarketingConsent(value: ConsentValue = 'no'): Promise<void> {
        const checkbox = this.page.frameLocator('#sbsq__iframe_').locator('#marketingConsent');
        const isChecked = await checkbox.isChecked();
        
        if (value === 'yes' && !isChecked) {
            await checkbox.click();
        } else if (value === 'no' && isChecked) {
            await checkbox.click();
        }
    }

}