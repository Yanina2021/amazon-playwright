import { test as base, expect } from '@playwright/test';
import { AmazonPage } from './pages/amazonPage';
import { LoginPage } from './pages/login';

interface TestFixtures {
    amazonPage: AmazonPage;
    loginPage: LoginPage;
}

export const test = base.extend<TestFixtures>({
    amazonPage: async ({ page }, use) => {
        await use(new AmazonPage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
});