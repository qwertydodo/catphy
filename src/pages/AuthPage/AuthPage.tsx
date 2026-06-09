import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { httpClient } from '../../shared/api/httpClient'
import { setApiKey } from '../../shared/lib/storage'
import { Button } from '../../shared/ui/Button'
import { Input } from '../../shared/ui/Input'
import { Text } from '../../shared/ui/Typography'
import styles from './AuthPage.module.css'

export const AuthPage = () => {
  const [key, setKey] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!key.trim()) {
      setError('API key is required')
      return
    }
    setError('')
    setLoading(true)
    setApiKey(key.trim())
    try {
      await httpClient.get('/images/search', { params: { limit: 1 } })
      navigate('/')
    } catch {
      setApiKey('')
      setError('Invalid API key. Get yours at thecatapi.com')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <Text variant="h2" className={styles.title}>
          🐱 Welcome to Catphy
        </Text>
        <Text variant="body" muted className={styles.subtitle}>
          Enter your Cat API key to continue
        </Text>
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <Input
            id="api-key"
            label="API Key"
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="live_xxxxxxxxxxxxxxxxxxxx"
            error={error}
            autoComplete="off"
          />
          <Button type="submit" loading={loading}>
            Save & Continue
          </Button>
        </form>
        <Text variant="sm" muted className={styles.hint}>
          Get a free key at{' '}
          <a href="https://thecatapi.com" target="_blank" rel="noreferrer" className={styles.link}>
            thecatapi.com
          </a>
        </Text>
      </div>
    </div>
  )
}
