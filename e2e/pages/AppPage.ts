import { type Page, test } from '@playwright/test'
import { CAT_API_KEY } from '../../playwright.config'

export class AppPage {
  constructor(readonly page: Page) {}

  async authenticate() {
    test.skip(!CAT_API_KEY, 'CAT_API_KEY env var required')
    await this.page.evaluate((k) => localStorage.setItem('cat_api_key', k), CAT_API_KEY)
  }
}
