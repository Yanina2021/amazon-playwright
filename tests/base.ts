import { test as base, expect } from '@playwright/test';
import { HomePage } from './pages/homePage';

interface TestFixtures {
    homePage: HomePage;
}

export const test = base.extend<TestFixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
});