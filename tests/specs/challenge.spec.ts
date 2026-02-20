
import { test } from "../base";

test('End to End test', async ({ homePage, page }) => {
    test.setTimeout(100000);

    await homePage.goToAmazonSite();
    // await homePage.closeLocationModal();

    await homePage.searchProduct(process.env.PRODUCT_SEARCH!);
    await homePage.validateSearchResults(process.env.PRODUCT_SEARCH!);

    await homePage.filterBrand(process.env.BRAND_FILTER!);
    await page.waitForTimeout(1000);

    await homePage.sortBy(process.env.HIGT_PRICE_OPTION!);
    await homePage.printTopProducts(5, true, process.env.COMMENT_HIGT_PRICE!);

    await homePage.sortBy(process.env.NEW_RELEASES_OPTION!);
    await homePage.printTopProducts(5, false, process.env.COMMENT_NEW_RELEASES!);

    await homePage.sortBy(process.env.REVIEW_RANK_OPTION!);
    await homePage.printTopProducts(5, true, process.env.COMMENT_REVIEW_RANK!);
});