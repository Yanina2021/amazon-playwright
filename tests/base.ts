import { test as base, expect } from '@playwright/test';
import { HomePage } from './pages/homePage';
import { LoginPage } from './pages/login';

interface TestFixtures {
    homePage: HomePage;
    loginPage: LoginPage;
}

export const test = base.extend<TestFixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
});