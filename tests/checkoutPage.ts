import { expect, type Locator, type Page} from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly secondProductCardPick: Locator;
    readonly secondProductPriceLocator: Locator;
    readonly secondProductPriceCents: Locator;
    readonly secondProductPackAmount: Locator;
    readonly thirdProductCardPick: Locator;
    readonly thirdPriceLocator: Locator;
    readonly thirdPriceCentsLocator: Locator;
    readonly totalPriceLocator: Locator;

    constructor(page: Page){
        this.page = page;
        this.secondProductCardPick = page.locator('div#productCard-2 ').getByRole('button');
        this.secondProductPriceLocator = page.locator('div#productCard-2 > div:nth-of-type(5) > div:nth-of-type(2) > div.productPacItem__priceBlock__price');
        this.secondProductPriceCents = page.locator('div#productCard-2 > div:nth-of-type(5) > div:nth-of-type(2) > div:nth-of-type(2) > div.productPacItem__priceBlock__cents');
        this.secondProductPackAmount = page.locator('#productCard-2 > div.productPacItem__firstBlock > div.productPacItem__label__container > span.productPacItem__label__amount');
        this.thirdPriceLocator = page.locator('div#productCard-3 ').getByRole('button');
        this.thirdProductCardPick = page.locator('div#productCard-3 > div.productPackages__button');
        this.thirdPriceCentsLocator = page.locator('div#productCard-3 > div:nth-of-type(5) > div:nth-of-type(2) > div:nth-of-type(2) > div.productPacItem__priceBlock__cents');
        this.totalPriceLocator = page.locator('div#react-app > main > section > div > div > div:nth-of-type(3) > div:nth-of-type(4) > div:nth-of-type(4) > div:nth-of-type(2)');
    }

    async goto() {
    await this.page.goto('https://staging-magnolight.shopperoc.com/checkout/emails-1-miniflashlight-us/');
    }
    

    async checkSecondCard() {
        await this.secondProductCardPick.click();
    }

    async getSecondCardPrice(): Promise<number>{ 
        const secondPriceText: string = await this.secondProductPriceLocator.innerText();
        const secondPriceCentText: string = await this.secondProductPriceCents.innerText();
        const secondFullPriceText = secondPriceText + secondPriceCentText;
        const secondPrice: number = parseFloat((secondFullPriceText).replace(/[^\d.-]/g, ''));
        console.log('This is second card Unit Price ',secondPrice);
        return secondPrice;
    }

    async getSecondCardAmount(): Promise<number>{
        const secondCardAmountText = await this.secondProductPackAmount.innerText();
        const secondCardAmount = parseInt((secondCardAmountText).split('x')[0]);
        console.log('This is second card product Amount ',secondCardAmount);
        return secondCardAmount;
    }

    async getTotalSum(): Promise<number> {
        const totalSumText = await this.totalPriceLocator.innerText();
        const totalSum = parseFloat((totalSumText).split('$')[1]);
        console.log('This is total: ', totalSum);
        return totalSum;
    

    // async checkThirdCard() {
    //     await this.thirdProductCardPick.click();
    // }
}
}
