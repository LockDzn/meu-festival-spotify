import { useContext, useEffect, useState } from 'react'
import cookie from 'js-cookie'
import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import styles from '../styles/Home.module.scss'

import { Login } from '../components/Login'
import { Generate } from '../components/Generate'
import { AuthContext } from '../contexts/auth'

const Home: NextPage = () => {
  const { logged } = useContext(AuthContext)

  return (
    <div className={styles.container}>
      <Head>
        <title>Seu Festival 2022</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Balsamiq+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {logged ? <Generate /> : <Login />}

      <footer className={styles.footer}>
        <p>
          Criado por <a href="https://lockdzn.vercel.app/">Ryan Souza</a> (
          <a href="https://twitter.com/nuLoki_" className={styles.twitter}>
            @nuLoki_
          </a>
          )
        </p>
      </footer>
    </div>
  )
}

export default Home
