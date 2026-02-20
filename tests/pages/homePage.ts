
import { expect, Locator, Page } from "@playwright/test";
import { testConfig } from "../../playwright.config";

export class HomePage {
    readonly page: Page;
    readonly searchBox: Locator;
    readonly searchBtn: Locator;
    readonly closeModalBtn: Locator;
    readonly skechersFilterOption: Locator;
    readonly productsContainer: Locator;
    readonly sortDropdown: Locator;
    readonly results: Locator;
    readonly continueShoppingBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchBox = page.locator('#twotabsearchtextbox');
        this.searchBtn = page.locator('#nav-search-submit-button');
        this.closeModalBtn = page.getByRole('button', { name: 'Dismiss' });
        this.skechersFilterOption = page.getByRole('link', { name: 'Apply Skechers filter to' });
        this.sortDropdown = this.page.locator('#s-result-sort-select');
        this.productsContainer = this.page.locator('div.s-main-slot div[data-component-type="s-search-result"]');
        this.results = page.locator('[data-component-type="s-search-result"]');
        this.continueShoppingBtn = page.locator('button:has-text("Continue shopping")')
    }

    async goToAmazonSite() {
        await this.page.goto(testConfig.BASE_URL, {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        });
    }

    async validateContinueShoppingBtn() {
        if (await this.continueShoppingBtn.isVisible()) {
            console.log('Button is visible ✅');
            await this.continueShoppingBtn.click();
            console.log('Clicked the button ✅');
        } else {
            console.log('Button not found ❌');
        }
    }

    async searchProduct(product: string) {
        await this.searchBox.fill(product);
        await this.searchBtn.click();
    }

    async validateSearchResults() {
        await expect(this.productsContainer.first()).toBeVisible();
    }

    async closeLocationModal() {
        if (await this.closeModalBtn.isVisible()) {
            console.log('Button is visible ✅');
            await this.closeModalBtn.click();
            console.log('Clicked the button ✅');
        } else {
            console.log('Button not found ❌');
        }
    }

    async filterBrand(brand: string) {
        await this.skechersFilterOption.click();
        await this.page.waitForTimeout(1000);
    }

    async sortBy(option: string) {
        await this.sortDropdown.selectOption(option);
        await this.page.waitForTimeout(1000);
    }

    async getTopProducts(
        limit: number = 5,
        withPrice: boolean = false
    ): Promise<{ name: string; price?: string }[]> {

        await this.productsContainer.first().waitFor({ state: 'visible' });

        const items = await this.productsContainer.all();

        // 🔹 SIN precio
        if (!withPrice) {
            return Promise.all(
                items.slice(0, limit).map(async (item) => ({
                    name: (await item.textContent()) ?? ''
                }))
            );
        }

        // 🔹 CON precio
        const visibleWithPrice = await Promise.all(
            items.map(async (item) =>
                (await item.locator('.a-price-whole').isVisible()) ? item : null
            )
        );

        const top = visibleWithPrice.filter(Boolean).slice(0, limit) as Locator[];

        return Promise.all(
            top.map(async (item) => {
                const name = (await item.textContent()) ?? '';

                const whole = await item.locator('.a-price-whole').innerText().catch(() => '');
                const fraction = await item.locator('.a-price-fraction').innerText().catch(() => '');

                return {
                    name,
                    price: whole ? `${whole}${fraction ? '.' + fraction : ''}` : undefined
                };
            })
        );
    }

    async printTopProducts(limit: number = 5, withPrice: boolean = false, label: string) {
        const products = await this.getTopProducts(limit, withPrice);
        console.log('products', products)
        console.log(`\n=== ${label} ===`);
        products.forEach((p, i) => {
            if (withPrice && p.price) {
                console.log(`${i + 1}. ${p.name} - $${p.price}`);
            } else {
                console.log(`${i + 1}. ${p.name}`);
            }
        });
    }
}