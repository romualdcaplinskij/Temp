import { test, expect, request } from '@playwright/test';
import { CheckoutPage } from './checkoutPage';
import { log } from 'console';
import { console } from 'inspector';

const shippingPrice: number = 6.90;

test('Does Package price match Total price', async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.goto();
  await checkoutPage.checkSecondCard();

  const secondCardPrice = await checkoutPage.getSecondCardPrice();
  console.log(secondCardPrice);

  const secondCardAmount = await checkoutPage.getSecondCardAmount();
  console.log(secondCardAmount);

  const totalSum = await checkoutPage.getTotalSum;
  console.log(totalSum)
;
  const secondCardSum = secondCardPrice * secondCardAmount;
  console.log(secondCardSum);
  
  console.log('This is second card Sum', secondCardSum);
  expect(secondCardPrice).not.toBeNaN;

  const packageSubTotalShipping = secondCardSum * secondCardAmount + shippingPrice;
  console.log('Total: ', packageSubTotalShipping);

  //expect(totalSum).toEqual(packageSubTotalShipping);

  // await page.locator('input[name="card_number"]').click();
  // await page.locator('input[name="card_number"]').fill('0000 0000 0000 00000');
  // await page.locator('input[name="expiration"]').click();
  // await page.locator('input[name="expiration"]').fill('10/25');
  // await page.locator('input[name="card_cvc"]').click();
  // await page.locator('input[name="card_cvc"]').fill('0000');
  // await page.getByLabel('First Name').click();
  // await page.getByLabel('First Name').fill('Romuald');
  // await page.locator('div').filter({ hasText: /^Last Name$/ }).nth(1).click();
  // await page.getByLabel('Last Name').fill('C');
  // await page.getByLabel('Email Address').click();
  // await page.getByLabel('Email Address').fill('romuald.c@commercecore.com');
  // await page.getByPlaceholder('34567').click();
  // await page.getByPlaceholder('34567').fill('604 06039');
  // await page.getByLabel('Address', { exact: true }).click();
  // await page.getByLabel('Address', { exact: true }).fill('Gedimino g. 20');
  // await page.getByLabel('City').click();
  // await page.getByLabel('City').fill('Vilnius');
  // await page.locator('select[name="rcrs-region"]').selectOption('VL');
  // await page.getByLabel('Zip/Postcode').click();
  // await page.getByLabel('Zip/Postcode').fill('10100');
  //await page.getByRole('button', { name: 'Complete Order' }).click();
  //await page.goto('https://staging-magnolight.shopperoc.com/thankyou/thankyou-en/?orderId=B219D066E3');
});