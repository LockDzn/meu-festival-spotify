import { useContext, useEffect, useState } from 'react'
import { FaSpotify } from 'react-icons/fa'
import axios from 'axios'
import html2canvas from 'html2canvas'

import { AuthContext } from '../../contexts/auth'

import styles from './styles.module.scss'

interface ArtistProps {
  id: string
  name: string
  popularity: number
}

export function Generate() {
  const [artists, setArtists] = useState<ArtistProps[]>([])

  const { user, logOut } = useContext(AuthContext)

  useEffect(() => {
    axios
      .get(
        'https://api.spotify.com/v1/me/top/artists?limit=30&time_range=long_term',
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((response) => {
        setArtists(response.data.items)
      })
  }, [])

  function download() {
    const element = document.querySelector('#festival') as HTMLElement
    html2canvas(element).then((canvas) => {
      var dataURL = canvas.toDataURL('image/png')
      var link = document.createElement('a')
      console.log(dataURL)
      link.href = dataURL
      link.download = 'seu-festival.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span>Olá, {user?.name}</span>
        <button className={styles.logoutButton} onClick={logOut}>
          Deslogar
        </button>
      </header>

      <main className={styles.main}>
        <div className={styles.festival} id="festival">
          <h1>
            <FaSpotify />
            Meu Festival 2022 <FaSpotify />
          </h1>

          <div className={`${styles.day} ${styles.dayOne}`}>
            <h2>Dia 1</h2>
            <div className={styles.list}>
              {artists.slice(0, 10).map((artist) => (
                <span key={artist.id}>{artist.name}</span>
              ))}
            </div>
          </div>
          <div className={`${styles.day} ${styles.dayTwo}`}>
            <h2>Dia 2</h2>
            <div className={styles.list}>
              {artists.slice(10, 20).map((artist) => (
                <span key={artist.id}>{artist.name}</span>
              ))}
            </div>
          </div>
          <div className={`${styles.day} ${styles.dayThree}`}>
            <h2>Dia 3</h2>
            <div className={styles.list}>
              {artists.slice(20, 30).map((artist) => (
                <span key={artist.id}>{artist.name}</span>
              ))}
            </div>
          </div>
        </div>
        <button className={styles.downloadButton} onClick={download}>
          Download
        </button>
      </main>
    </div>
  )
}
