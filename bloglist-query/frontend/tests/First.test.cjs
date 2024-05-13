const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173')
    })

    test('front page can be opened', async ({ page }) => {
        const locater = await page.getByText('Log in to Application')
        await expect(locater).toBeVisible()
    })

    test('login form', async ({ page }) => {
        await page.getByTestId('username').first().fill('root')
        await page.getByTestId('password').last().fill('salainen')
        await page.getByRole('button', { name: 'login' }).click()

        await expect(page.getByText('Superuser logged in')).toBeVisible()
    });
});
