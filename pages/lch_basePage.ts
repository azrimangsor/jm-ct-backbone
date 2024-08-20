import { expect, TestInfo } from '@playwright/test';
import { BasePage } from './basePage';
import { config } from '../tests/config';

export class LCHPage extends BasePage {

  //NotifyJM
  buttonNotifyJM = 'div.Header_actionBar__Dd3Hv > div > button';

  //Notification
  buttonSendNotification = '#modal-description > div > button';
  notificationMsgBox = '#modal-description';
  buttonCloseNotification = '#modal-description > button > svg[data-testid="CloseIcon"]';

  //Common Elements
  saveStatus = '#js-portlet-_lchdatacapture_INSTANCE_r2pdleH9exJo_';

  //Project Details Element
  companyName = '#projectDetails\\.companyName';
  companyAddress = '#projectDetails\\.companyAddress';

  //Capacity Elements
  capacityRequiredLocator = 'input#capacity\\.capacityRequired';
  minimumTurndownCapacityLocator = 'input#capacity\\.minimumTurndownCapacity';
  numberOfTrainsLocator = 'input#capacity\\.numberOfTrains';
  otherCommentsLocator = 'input#capacity\\.otherComments';

  //Carbon Capture
  carbonCaptureRateCo2 = 'input#carbonCapture\\.CO2CaptureRate';

  //Catalyst Life
  plantTurnArounds = 'input#catalystLife\\.yearsBetweenPlantTurnarounds'

  //Cost Data
  productValueH2 = 'input#costData\\.H2ProductValue';
  unitProductValueH2 = '#costData\\.H2ProductValue_select';
  priceNaturalGas = 'input#costData\\.naturalGasPrice';
  unitNaturalGas = '#costData\\.naturalGasPrice_select';

  electricityImportPrice = 'input#costData\\.electricityImportPrice';
  HPSExportValue = 'input#costData\\.HPSExportValue';
  MPSExportValue = 'input#costData\\.MPSExportValue';
  coolingWaterCost = 'input#costData\\.coolingWaterCost';
  demineralisedWaterCost = 'input#costData\\.demineralisedWaterCost';
  CO2CreditsPurchaseCost = 'input#costData\\.CO2CreditsPurchaseCost';
  CO2CreditsSalesValue = 'input#costData\\.CO2CreditsSalesValue';
  CO2StorageCost = 'input#costData\\.CO2StorageCost';
  CO2EmissionCost = 'input#costData\\.CO2EmissionCost';
  expectCostChangeOverTime = 'textarea#costData\\.expectCostChangeOverTime';

  //Efficiency
  expectedRFIIssueDateInput = 'input#proposal\\.expectedRFIIssueDate';
  requiredDocumentsAndInformationTextarea = 'textarea#proposal\\.requiredDocumentsAndInformation';
  deadlineDateInput = 'input#proposal\\.deadlineDate';
  deadlineTimeInput = 'input#proposal\\.deadlineTime';
  otherCommentsAccordion = 'label[for="proposal.otherComments"]';

  async enterUsername(username: string): Promise<void> {
    await this.page.fill('input[id="signInName"]', username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.page.fill('input[id="password"]', password);
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.waitForSelector('input#signInName.textInput', { timeout: 60000 });
    this.page.once('load', () => console.log('Username Page loaded!'));
    await this.enterUsername(username);
    await this.page.click('button[id="continue"]');
    await this.page.waitForSelector('input#password', { timeout: 60000 });
    this.page.once('load', () => console.log('Password Page loaded!'));
    await this.enterPassword(password);
    await this.page.click('button[id="next"]');

    await this.page.waitForURL("https://uat-dcf.matthey.com/group/guest/project?**", { waitUntil: 'networkidle' });
  }

  async login_default(): Promise<void> {
    await this.page.waitForSelector('input#signInName.textInput', { timeout: 60000 });
    //this.page.once('load', () => console.log('Username Page loaded!'));
    await this.enterUsername(config.username);
    await this.page.click('button[id="continue"]');
    await this.page.waitForSelector('input#password', { timeout: 60000 });
    //this.page.once('load', () => console.log('Password Page loaded!'));
    await this.enterPassword(config.password);
    await this.page.click('button[id="next"]');

    //await this.page.waitForURL("https://uat-dcf.matthey.com/group/guest/project?**", { waitUntil: 'networkidle', timeout: 60000 });

    await this.page.waitForSelector('#Johnson_Matthey_Logo_Blue_', { timeout: 60000 });

    await this.page.once('load', () => console.log('Test Page loaded!'));
    //this.page.waitForURL("https://uat-dcf.matthey.com/group/guest/project?**", { timeout: 60000 });
  }

  async checkCurrency(currency: 'GBP' | 'USD' | 'EUR'): Promise<void> {
    const validCurrencies = ['GBP', 'USD', 'EUR'];

    if (!validCurrencies.includes(currency)) {
      throw new Error(`Invalid currency: ${currency}. Valid currencies are ${validCurrencies.join(', ')}`);
    }

    try {
      await this.page.locator(`input[name="fieldset-costData.currency"][value="${currency}"]`).check();
    } catch (error) {
      console.error(error.message);
    }
  }

  async carbonCaptureState(options: 'carbonCaptureRate' | 'carbonIntensity'): Promise<void> {

    const expectedValues = ['carbonCaptureRate', 'carbonIntensity'];

    if (!expectedValues.includes(options)) {
      throw new Error(`Invalid value: ${options}. Valid values are ${expectedValues.join(', ')}`);
    }

    await this.page.locator(`input.PrivateSwitchBase-input[value="${options}"]`).check();

  }

  async selectTempretureUnit(temperature: 'Celsius' | 'Fahrenheit'): Promise<void> {
    if (temperature = 'Celsius') {
      await this.page.locator('li[data-value="C"]').click();
    } else {
      await this.page.locator('li[data-value="F"]').click();
    }
  }

  async selectPressureUnit(pressure: 'Bar (a)' | 'psi (a)'): Promise<void> {
    if (pressure = 'Bar (a)') {
      await this.page.locator('li[data-value="Bar (a)"]').click();
    } else {
      await this.page.locator('li[data-value="psi (a)"]').click();
    }
  }

  async selectSectionMenu(section: 'Capacity' | 'Carbon Capture' | 'Catalyst Life' | 'Cost Data' | 'Efficiency'): Promise<void> {
    await this.page.getByRole('listitem').filter({ hasText: section }).click();
  }

  async insertRequiredCapacity(capacity: string): Promise<void> {
    try {
      await this.page.locator(this.capacityRequiredLocator).fill(capacity);
    } catch (error) {
      console.error('Error inserting required capacity:', error);
    }

  }

  async selectCapacityUnit(capacityUnit: 'MW thermal' | 'MTPD' | 'm3/hr' | 'scf/hr'): Promise<void> {
    try {
      await this.page.locator('#capacity\\.capacityRequired_select').click();
      await this.page.locator(`li[data-value="${capacityUnit}"]`).click();
    } catch (error) {
      console.error('Error selecting capacity unit:', error);
      throw error;
    }
  }

  async notifyJM(): Promise<void> {
    await this.page.locator(this.buttonNotifyJM).click();

    await Promise.all([
      this.page.waitForResponse((response) =>
            response.url().includes('/notify') && response.status() === 200
        ),

        this.page.locator(this.buttonSendNotification).getByText('Send Notification').click()
    ]);

    await this.page.locator(this.notificationMsgBox).getByText('Notification sent!').isVisible();
  }
}