import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goToAmazonSite() {
        await this.page.goto('/');
        await this.page.waitForTimeout(2000);
    }
}