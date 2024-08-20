import { expect, Locator, TestInfo, BrowserContext } from '@playwright/test';
import { BasePage } from './basePage';
import { config } from '../tests/config';

export class LoginPage extends BasePage {

  //login page
  txtUsername = 'input[id="signInName"]';
  txtPassword = 'input[id="password"]';

  btnContinue = 'button[id="continue"]';
  btnLogin = 'button[id="next"]';

  //Main page header
  logoJM = '#Johnson_Matthey_Logo_Blue_';

  async enterUsername(username: string): Promise<void> {
    await this.page.fill(this.txtUsername, username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.page.fill(this.txtPassword, password);
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.page.click(this.btnContinue);
    await this.enterPassword(password);
    await this.page.click(this.btnLogin);
    await expect(this.page.locator(this.logoJM)).toBeVisible({ timeout: 500000 });
  }

  async login_default(env: string): Promise<void> {
    await this.page.waitForSelector(this.txtUsername, { timeout: 60000 });
    await this.enterUsername(config.usernameFT);
    await this.page.click(this.btnContinue);
    await this.page.waitForSelector(this.txtPassword, { timeout: 60000 });
    await this.enterPassword(config.passwordFT);
    await this.page.click(this.btnLogin);

    await this.page.waitForURL("https://uat-dcf.ft.matthey.com/group/guest/project?**", { waitUntil: 'domcontentloaded', timeout: 80000 });

    await this.page.once('load', () => console.log('Test Page loaded!'));

    await this.page.waitForSelector(this.logoJM, { timeout: 80000 });
  }

}