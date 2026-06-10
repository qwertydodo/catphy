import { CAT_API_KEY } from '../playwright.config'
import { expect, test } from './fixtures'
import { AppPage } from './pages/AppPage'

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
  test.skip(!CAT_API_KEY, 'CAT_API_KEY env var required')
  await page.goto('/auth')
  await page.getByLabel('API Key').fill(CAT_API_KEY)
  await page.getByRole('button', { name: /save/i }).click()
  await expect(page).toHaveURL('/')
})

test('log out button clears key and redirects to /auth', async ({ page }) => {
  await new AppPage(page).authenticate()
  await page.goto('/')
  await page.getByRole('button', { name: /log out/i }).click()
  await expect(page).toHaveURL('/auth')
  const storedKey = await page.evaluate(() => localStorage.getItem('cat_api_key'))
  expect(storedKey).toBeNull()
})

test('after logout, protected pages redirect to /auth', async ({ page }) => {
  await new AppPage(page).authenticate()
  await page.goto('/')
  await page.getByRole('button', { name: /log out/i }).click()
  await page.goto('/favorites')
  await expect(page).toHaveURL('/auth')
})
