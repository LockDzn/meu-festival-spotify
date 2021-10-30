import React, { useEffect, useState } from 'react'
import { FaSpotify } from 'react-icons/fa'
import axios from 'axios'
import Link from 'next/link'

import styles from './styles.module.scss'

export function Login() {
  const [spotifyOAuth, setSpotifyOAuth] = useState('')

  useEffect(() => {
    axios.get('/api/oauth').then((response) => {
      setSpotifyOAuth(response.data.link)
    })
  }, [])

  return (
    <main className={styles.main}>
      <h1>Seu festival</h1>
      <p>
        Crie a lista do seu festival com os seus artistas preferidos do{' '}
        <span className={styles.spotifyText}>Spotify</span>.
      </p>

      <Link href={spotifyOAuth}>
        <button className={styles.spotifyButton}>
          Login com o Spotify <FaSpotify />
        </button>
      </Link>
    </main>
  )
}
