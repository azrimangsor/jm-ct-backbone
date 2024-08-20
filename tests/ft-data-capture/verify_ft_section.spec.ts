import { test, expect } from '@playwright/test';
import { FTPage } from '../../pages/ft_basePage';
import { BasePage} from '../../pages/basePage';

test('Verify section for DCF FT', { tag : '@smoke' }, async ({ page, context }, testInfo) => {
    let ftPage: FTPage;
    let base: BasePage;

    ftPage = new FTPage(page);
    base = new BasePage(page);

    await base.navigateToFT(process.env.FT_DCF_URL!);

    //Keyed in Username & Password and login
    await ftPage.login_default();

    //Verify successfully logged in
    await expect(page.getByText('Project Data Form')).toBeVisible({ timeout: 500000 });

    const selector = 'div.MuiBox-root > span:nth-child(2)';

    const elements = await page.$$(selector);

    const texts = await Promise.all(elements.map(async (element) => {
        return await element.textContent();
      }));
    
      const expectedTexts = [
        'Cover Page',
        'Project Details',
        'Final Product and Capacity',
        'Feed',
        'Project Drivers',
        'Project Finance',
        'Feed Details',
        'Products',
        'Utilities',
        'Plot',
        'Site Data',
        'Cost Data',
        'Schedule',
        'Other Technology'
      ];

      if (texts.length !== expectedTexts.length) {
        throw new Error('The number of elements does not match the expected count.');
      }

      texts.forEach((text, index) => {
        if (text !== expectedTexts[index]) {
          throw new Error(`Text mismatch at index ${index}: expected "${expectedTexts[index]}", got "${text}"`);
        }
      });
    
      console.log('All elements have the expected texts.');
})