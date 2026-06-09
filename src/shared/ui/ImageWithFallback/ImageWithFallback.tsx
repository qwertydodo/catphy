import { clsx } from 'clsx'
import { useEffect, useState } from 'react'
import { CatLogo } from '../CatLogo'
import styles from './ImageWithFallback.module.css'

type ImageStatus = 'loading' | 'loaded' | 'error'

type ImageWithFallbackProps = {
  src: string
  alt: string
  errorMessage?: string
  className?: string
}

export const ImageWithFallback = ({
  src,
  alt,
  errorMessage = 'Sorry, cat not loaded',
  className,
}: ImageWithFallbackProps) => {
  const [status, setStatus] = useState<ImageStatus>('loading')

  // biome-ignore lint/correctness/useExhaustiveDependencies: setStatus is a stable state setter
  useEffect(() => {
    setStatus('loading')
  }, [src])

  return (
    <div className={clsx(styles.root, className)}>
      <img
        src={src}
        alt={alt}
        className={styles.image}
        style={{ display: status === 'loaded' ? 'block' : 'none' }}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
      />
      {status === 'loading' && (
        <div className={styles.placeholder} role="status" aria-label="Loading image">
          <div className={styles.loadingLogo}>
            <CatLogo size="sm" />
          </div>
        </div>
      )}
      {status === 'error' && (
        <div className={styles.placeholder} role="alert">
          <CatLogo size="sm" />
          <span className={styles.errorText}>{errorMessage}</span>
        </div>
      )}
    </div>
  )
}
