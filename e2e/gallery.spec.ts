import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  const key = process.env.CAT_API_KEY ?? ''
  test.skip(!key, 'CAT_API_KEY env var required')
  await page.evaluate((k) => localStorage.setItem('cat_api_key', k), key)
})

test('gallery shows 9 cat images on load', async ({ page }) => {
  await page.goto('/')
  const images = page.getByRole('img', { name: 'A cat' })
  await expect(images).toHaveCount(9)
})

test('load more adds 9 more images', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /load more/i }).click()
  await expect(page.getByRole('img', { name: 'A cat' })).toHaveCount(18)
})

test('filtering by breed updates gallery', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('Filter by breed').selectOption({ index: 1 })
  await expect(page.getByRole('img', { name: 'A cat' }).first()).toBeVisible()
})
