import { test } from "../base";

test('Challenge test', async ({ amazonPage, page, loginPage }) => {
    test.setTimeout(90000);

    await loginPage.goToAmazonSite();
    await amazonPage.closeLocationModal();

    await amazonPage.searchProduct(process.env.PRODUCT_SEARCH!);
    await amazonPage.validateSearchResults(process.env.PRODUCT_SEARCH!);

    await amazonPage.filterBrand(process.env.BRAND_FILTER!);
    await page.waitForTimeout(2000);

    await amazonPage.printTopProductsWithPriceBySort(
        process.env.HIGT_PRICE_OPTION!,
        process.env.COMMENT_HIGT_PRICE!
    );

    await amazonPage.printTopProductNamesBySort(
        process.env.NEW_RELEASES_OPTION!,
        process.env.COMMENT_NEW_RELEASES!
    );

    await amazonPage.printTopProductNamesBySort(
        process.env.REVIEW_RANK_OPTION!,
        process.env.COMMENT_REVIEW_RANK!
    );
});