
import { test } from "../base";
import { testConfig } from '../../playwright.config';

test('End to End test', async ({ homePage, page }) => {
    test.setTimeout(100000);

    await homePage.goToAmazonSite();

    await homePage.validateContinueShoppingBtn()
    await homePage.searchProduct(testConfig.PRODUCT_SEARCH);
    await homePage.validateSearchResults();

    await homePage.filterBrand(testConfig.BRAND_FILTER);
    await page.waitForTimeout(1000);

    await homePage.sortBy(testConfig.HIGH_PRICE_OPTION);
    await homePage.printTopProducts(5, true, testConfig.HIGH_PRICE_COMMENT);

    await homePage.sortBy(testConfig.NEW_RELEASES_OPTION);
    await homePage.printTopProducts(5, false, testConfig.NEW_RELEASES_COMMENT);

    await homePage.sortBy(testConfig.REVIEW_RANK_OPTION);
    await homePage.printTopProducts(5, true, testConfig.REVIEW_RANK_COMMENT);
});