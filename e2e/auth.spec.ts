import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.evaluate(() => localStorage.clear())
})

test('redirects to /auth when no API key', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL('/auth')
  await expect(page.getByText('Welcome to Catphy')).toBeVisible()
})

test('shows error on invalid API key', async ({ page }) => {
  await page.goto('/auth')
  await page.getByLabel('API Key').fill('invalid-key')
  await page.getByRole('button', { name: /save/i }).click()
  await expect(page.getByText(/invalid api key/i)).toBeVisible()
})

test('redirects to gallery after valid API key', async ({ page }) => {
  const key = process.env.CAT_API_KEY ?? ''
  test.skip(!key, 'CAT_API_KEY env var required')
  await page.goto('/auth')
  await page.getByLabel('API Key').fill(key)
  await page.getByRole('button', { name: /save/i }).click()
  await expect(page).toHaveURL('/')
})
