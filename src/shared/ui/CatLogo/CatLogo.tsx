import catLogoUrl from './cat-logo.svg'

const sizes = { sm: 24, md: 40, lg: 64 } as const

type LogoSize = keyof typeof sizes

type CatLogoProps = {
  size?: LogoSize
}

export const CatLogo = ({ size = 'md' }: CatLogoProps) => {
  const height = sizes[size]
  const width = Math.round(height * (95.64443 / 57.33347))
  return (
    <img
      src={catLogoUrl}
      width={width}
      height={height}
      alt=""
      style={{ imageRendering: 'pixelated' }}
    />
  )
}
