import { expect, Locator, Page } from "@playwright/test";

export class AmazonPage {
    readonly page: Page;
    readonly searchBox: Locator;
    readonly searchBtn: Locator;
    readonly closeModalBtn: Locator;
    readonly skechersFilterOption: Locator;
    readonly productsContainer: Locator;
    readonly sortDropdown: Locator;
    readonly results: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchBox = page.locator('#twotabsearchtextbox');
        this.searchBtn = page.locator('#nav-search-submit-button');
        this.closeModalBtn = page.getByRole('button', { name: 'Submit' }).first();
        this.skechersFilterOption = page.getByRole('link', { name: 'Apply Skechers filter to' });
        this.sortDropdown = this.page.locator('#s-result-sort-select');
        this.productsContainer = this.page.locator('[data-component-type="s-search-result"]');
        this.results = page.locator('[data-component-type="s-search-result"]');
    }

    async searchProduct(product: string) {
        await this.searchBox.fill(product);
        await this.searchBtn.click();
    }

    async validateSearchResults(term: string) {
        await expect(this.page).toHaveURL(new RegExp(`k=${term}`));
        await expect(this.productsContainer.first()).toBeVisible();
    }

    async closeLocationModal() {
        await this.closeModalBtn.click();
    }

    async filterBrand(brand: string) {
        await this.skechersFilterOption.click();
    }

    async sortBy(option: string) {
        await this.sortDropdown.selectOption(option);
        await this.productsContainer.first().waitFor({ state: 'visible' });
        await this.page.waitForTimeout(1000);
    }

    async getTopProducts(limit: number = 5, withPrice: boolean = false) {
        await this.productsContainer.first().waitFor({ state: 'visible' });

        const count = await this.productsContainer.count();
        const results: { name: string; price?: string }[] = [];

        for (let i = 0; i < count && results.length < limit; i++) {
            if (this.page.isClosed()) break;

            const product = this.productsContainer.nth(i);

            const name = await product.locator('h2').innerText({ timeout: 5000 }).catch(() => null);
            if (!name) continue;

            //Solo nombre
            if (!withPrice) {
                results.push({ name: name.trim() });
                continue;
            }

            // Precio
            const whole = await product.locator('.a-price-whole').innerText().catch(() => null);

            // Salteo sino hay precio
            if (!whole) continue;

            const fraction = await product.locator('.a-price-fraction').innerText().catch(() => '');
            const price = `${whole}${fraction ? '.' + fraction : ''}`;

            results.push({ name: name.trim(), price });
        }

        return results;
    }

    async printTopProductNamesBySort(option: string, label: string) {
        await this.sortBy(option);

        const products = await this.getTopProducts(5, false);

        console.log(`\n=== ${label} ===`);
        products.forEach((p, i) => {
            console.log(`${i + 1}. ${p.name}`);
        });
    }

    async printTopProductsWithPriceBySort(option: string, label: string) {
        await this.sortBy(option);

        const products = await this.getTopProducts(5, true);

        console.log(`\n=== ${label} ===`);
        products.forEach((p, i) => {
            console.log(`${i + 1}. ${p.name} - $${p.price}`);
        });
    }
}