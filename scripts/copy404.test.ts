import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { copyIndexHtmlAs404 } from './copy404'

describe('copyIndexHtmlAs404', () => {
  let dir: string

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  it('copies index.html to 404.html so GitHub Pages serves the SPA for unknown routes', () => {
    dir = mkdtempSync(join(tmpdir(), 'copy-404-'))
    writeFileSync(join(dir, 'index.html'), '<html>app</html>')

    copyIndexHtmlAs404(dir)

    expect(readFileSync(join(dir, '404.html'), 'utf-8')).toBe('<html>app</html>')
  })

  it('does nothing if index.html does not exist', () => {
    dir = mkdtempSync(join(tmpdir(), 'copy-404-'))

    copyIndexHtmlAs404(dir)

    expect(existsSync(join(dir, '404.html'))).toBe(false)
  })
})
