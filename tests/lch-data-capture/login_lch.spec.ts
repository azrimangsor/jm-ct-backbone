import { test, expect } from '@playwright/test';

test('Verify DCF LCH Login Page', async ({ page }, testInfo) => {
  await page.goto('https://uat-dcf.matthey.com/group/guest/project?projectId=939013bb-035d-ee11-be6f-000d3a2d6e62');
  await page.waitForURL('**/login');

  await page.getByText('User Details').isVisible();

  await page.screenshot({ path: "screenshots/home.png" })

  await page.fill('input[id="signInName"]', 'lch.dcf.test.21@gmail.com');

  await page.click('button[id="continue"]');

  await page.click('button[id="next"]');

  await expect(page.locator('div.error.itemLevel > p[role="alert"]')).toHaveText('Please enter your password');

  await page.fill('input[id="password"]', 'LCHTester#21');

  await page.click('button[id="next"]');

  await page.screenshot({ path: "screenshots/password.png" })

  await testInfo.attach("password", {
    body: await page.screenshot(),
    contentType: "image/png",
  })

})