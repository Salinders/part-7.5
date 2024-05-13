const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')
describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: "Micheal",
        username: 'root',
        password: 'salainen'
      }
    })
    await page.goto('http://localhost:5173')
  })


  test('user can login with the correct credentials', async ({ page }) => {
    await loginWith(page, 'root', 'salainen')

    await expect(page.getByText('Micheal logged in')).toBeVisible()
  });

  test(' login fails with wrong credentials', async ({ page }) => {
    await loginWith(page, 'root', 'wrong')

    const errorDiv = await page.locator('.error')
    await expect(errorDiv).toContainText('Wrong credentials')

    await expect(page.getByText('Micheal logged in')).not.toBeVisible()
  });


  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'root', 'salainen')
    })
    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, '1984', 'Orson Welles', 'yahoo.com', true)
      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText(" a new blog titled 1984 by Orson Welles was added")

    })

  })
  describe('blog likes', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'root', 'salainen')
      await createBlog(page, 'AnimalFarm', 'Ernest', 'ebay.com', true)
    })

    test('the number of likes in a blog can be updated', async ({ page }) => {
      //await createBlog(page, '1984', 'Orson Welles', 'yahoo.com', true)
      await page.getByRole('button', { name: 'likes' }).click()
      await expect(getByText('1')).toBeVisible()

    })

  })


})

