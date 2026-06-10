import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

export const copyIndexHtmlAs404 = (outDir: string): void => {
  const indexPath = resolve(outDir, 'index.html')
  if (!existsSync(indexPath)) return
  copyFileSync(indexPath, resolve(outDir, '404.html'))
}
