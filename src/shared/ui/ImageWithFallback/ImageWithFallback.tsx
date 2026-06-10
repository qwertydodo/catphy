import { clsx } from 'clsx'
import { useEffect, useRef, useState } from 'react'
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
  const imgRef = useRef<HTMLImageElement>(null)

  // biome-ignore lint/correctness/useExhaustiveDependencies: resets on src change; setStatus is a stable state setter
  useEffect(() => {
    // If the browser already has the image cached, `onLoad` may fire synchronously
    // before this effect runs, and then this effect would overwrite 'loaded' → 'loading'.
    // Check `complete` to detect that case and keep the already-resolved state.
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setStatus('loaded')
    } else if (imgRef.current?.complete && imgRef.current.naturalWidth === 0) {
      setStatus('error')
    } else {
      setStatus('loading')
    }
  }, [src])

  return (
    <div className={clsx(styles.root, className)}>
      <img
        ref={imgRef}
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
