import { test, expect } from '@playwright/test';

test('Verify DCF FT Login Page', async ({ page, context }, testInfo) => {

  await test.step('Navigate to DCF FT Login Page', async()=> {
    await page.goto('https://uat-dcf.ft.matthey.com/group/guest/project?projectId=c650e5e9-476e-ee11-9ae7-000d3a2d671b');
    await page.waitForURL('**/login');
    
    page.waitForLoadState('domcontentloaded');
    
    await page.getByText('User Details').isVisible();

    await testInfo.attach("ftLogin", {
      body: await page.screenshot(),
      contentType: "image/png",
    })

    await page.screenshot({ path: "screenshots/ftLogin.png" })
  })

  await test.step('Verify empty username exception', async()=> {
    await page.click('button[id="continue"]');

    await expect(page.locator('div.error#requiredFieldMissing')).toHaveText('A required field is missing. Please fill out all required fields and try again.');
  })

  await test.step('Insert username', async()=> {
    await page.fill('input[id="signInName"]', 'ft.dcf.test.22@gmail.com');

    await page.click('button[id="continue"]');
  })

  await test.step('Verify password exception', async()=> {
    await page.click('button[id="next"]');

    await expect(page.locator('div.error.itemLevel > p[role="alert"]')).toHaveText('Please enter your password');
  })

  await test.step('Insert Password', async()=> {
    await page.fill('input[id="password"]', 'FTDCFTester#22');

    await page.click('button[id="next"]');
  })

  await test.step('Verify user successfully login and landed to home screen', async()=> {

    await expect(page.getByText('Project Data Form')).toBeVisible({ timeout: 200000 });
    
    //await expect(page).toHaveURL('**dev-dcf.ft.matthey.com**');
    await expect(page).toHaveTitle("Data Capture Form Project View | Johnson Matthey");

    await testInfo.attach("home", {
      body: await page.screenshot(),
      contentType: "image/png",
    })

    await page.screenshot({ path: "screenshots/home.png" })
  })

})