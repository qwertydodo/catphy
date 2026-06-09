import { expect, test } from '@playwright/test'
import { AppPage } from './pages/AppPage'

test.beforeEach(async ({ page }) => {
  await new AppPage(page).authenticate()
})

test('favoriting a cat shows it on favorites page', async ({ page }) => {
  await page.goto('/')
  const firstCard = page.locator('[class*="card"]').first()
  await firstCard.hover()
  await firstCard.getByRole('button', { name: /^favorite$/i }).click()
  await page.goto('/favorites')
  await expect(page.getByRole('img').first()).toBeVisible()
})
