import { clsx } from 'clsx'
import type { HTMLAttributes } from 'react'
import styles from './Card.module.css'

type CardProps = HTMLAttributes<HTMLDivElement>

export const Card = ({ className, children, ...props }: CardProps) => (
  <div className={clsx(styles.card, className)} {...props}>
    {children}
  </div>
)
