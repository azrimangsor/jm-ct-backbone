import { Locator, Page, TestInfo, expect } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  otherComments = '#panel-catalystLife\\.otherComments-header > div > svg[data-testid="ExpandMoreIcon"]';

  async navigateToURL(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'networkidle', timeout: 80000 });
  }

  async navigateToFT(url: string): Promise<void> {

    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async navigateToLCH(url: string): Promise<void> {

    await this.page.goto(url);
  }

  async navigateToLocalFT(): Promise<void> {

    await this.page.goto('http://localhost:3000/?projectId=144');

  }

  async clickDropDownItem(value: string) {
    const liSelector = `li[data-value="${value}"]`;
    await this.page.click(liSelector);
  }

  async captureError() {
    this.page.on('console', async (message) => {
      if (message.type() === 'error') {
        console.log(`Console error: ${message.text()}`);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        await this.page.screenshot({ path: `screenshots/error/error-${timestamp}.png` });
        console.log('Screenshot saved');
      }
    });
  }

  async consoleSaved() {
    this.page.on('console', async (message) => {
      if (message.type() === 'Saved') {
        console.log('Value successfully saved');
      }
    });
  }

  async addScreenshot(testInfo: TestInfo, attachmentName: string) {
    await this.page.screenshot({ path: `./screenshots/${attachmentName}`, fullPage: true });

    await testInfo.attach(attachmentName, {
      body: await this.page.screenshot(),
      contentType: "image/png",
    });
  }

  async insertValueIntoTextbox(locator: string, value: string): Promise<void> {
    try {
      // Insert the value into the textbox after ensuring it is visible
      await this.page.fill(locator, value);
  
      console.log(`Value "${value}" has been inserted into the textbox with locator "${locator}".`);
    } catch (error) {
      console.error(`Error inserting value into textbox with locator "${locator}": ${error}`);
    }
  }
  

  async selectValueFromDropDown(value: string): Promise<void> {
    try {
      //await this.page.locator(`${locator}`).click();
      await this.page.locator(`li[data-value="${value}"]`).click();
    } catch (error) {
      console.error(`Error selecting value from dropdown: ${error}`);
    }
  }

  async validateTextBox(textBoxLocator: string): Promise<void> {
    // Clear the text box
    await this.page.locator(textBoxLocator).fill('');
    
    // Verify the text box is empty
    await expect(this.page.locator(textBoxLocator)).toHaveValue('');
  }
  

  async generateRandomString(length: number): Promise<string> {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async selectRadioButton(locator: string, condition: 'yes' | 'no') {
    if (condition.toLowerCase() === 'yes') {
        await this.page.locator(`${locator}[value="yes"]`).check();
    } else if (condition.toLowerCase() === 'no') {
        await this.page.locator(`${locator}[value="no"]`).check();
    } else {
        throw new Error(`Invalid condition: ${condition}. Please use "yes" or "no".`);
    }
}
}