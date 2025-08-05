import * as dotenv from 'dotenv';
import { validUsername, validPassword } from '../utils/testData';
import { expect, test } from './base';

dotenv.config();

test.describe('Sidebar Search Functionality', () => {
    test.beforeEach(async ({ loginPage, searchPage }) => {
        await loginPage.goto();
        await loginPage.login(validUsername, validPassword);
        await searchPage.isDashboardReady();
    });

    test('Search exact match: Admin', async ({ searchPage }) => {
        await searchPage.search('Admin');
        await searchPage.isMenuContainsTextAtIndex('Admin', 0);
        await searchPage.isNumberOfItemsCorrect(1);
    });

    test('Search with lowercase: leave', async ({ searchPage }) => {
        await searchPage.search('leave');
        await searchPage.isMenuContainsTextAtIndex('Leave', 0);
        await searchPage.isNumberOfItemsCorrect(1);
    });

    test('Partial search: Rec', async ({ searchPage }) => {
        await searchPage.search('Rec');
        await searchPage.isMenuContainsTextAtIndex('Recruitment', 0);
        await searchPage.isMenuContainsTextAtIndex('Directory', 1);
        await searchPage.isNumberOfItemsCorrect(2);

    });

    test('Search with spaces: "  Buzz "', async ({ searchPage }) => {
        await searchPage.search('  Buzz ');
        await searchPage.isMenuContainsText('Buzz');
        await searchPage.isNumberOfItemsCorrect(1);
    });

    test('Search invalid item: Payroll', async ({ searchPage }) => {
        await searchPage.search('Payroll');
        await searchPage.isNumberOfItemsCorrect(0);
    });

    test('Search with symbols: "@@@"', async ({ searchPage }) => {
        await searchPage.search('@@@');
        await searchPage.isNumberOfItemsCorrect(0);
    });

    test('Search with numbers only', async ({ searchPage }) => {
        await searchPage.search('1234');
        await searchPage.isNumberOfItemsCorrect(0);
    });

    test('Empty search input', async ({ searchPage }) => {
        await searchPage.search('');
        await searchPage.isNumberOfItemsCorrect(12);
    });

    test('Mixed case search: DaShBoArD', async ({ searchPage }) => {
        await searchPage.search('DaShBoArD');
        // await searchPage.isMenuContainsText('Dashboard');
        await searchPage.isMenuContainsTextAtIndex('Dashboard', 0);
        await searchPage.isNumberOfItemsCorrect(1);
    });

    test('Long string input', async ({ searchPage }) => {
        await searchPage.search('thisisaverylongsearchinputtotestmaxlimit');
        await searchPage.isNumberOfItemsCorrect(0);
    });
});
