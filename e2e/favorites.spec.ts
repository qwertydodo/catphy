import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  const key = process.env.CAT_API_KEY ?? ''
  test.skip(!key, 'CAT_API_KEY env var required')
  await page.evaluate((k) => localStorage.setItem('cat_api_key', k), key)
})

test('favoriting a cat shows it on favorites page', async ({ page }) => {
  await page.goto('/')
  const firstCard = page.locator('[class*="card"]').first()
  await firstCard.hover()
  await firstCard.getByRole('button', { name: /^favorite$/i }).click()
  await page.goto('/favorites')
  await expect(page.getByRole('img').first()).toBeVisible()
})
