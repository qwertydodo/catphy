import { expect, test } from './fixtures'
import { AppPage } from './pages/AppPage'

test.beforeEach(async ({ page }) => {
  await new AppPage(page).authenticate()
})

test('shows a 404 page for unmatched routes and links back to gallery', async ({ page }) => {
  await page.goto('/this-page-does-not-exist')

  await expect(page.getByRole('heading', { name: /cat run somewhere/i })).toBeVisible()

  await page.getByRole('button', { name: /back to gallery/i }).click()
  await expect(page).toHaveURL('/')
})
