import '../styles/globals.scss'
import '../styles/theme.scss'
import '../styles/banner.scss'
import '../styles/status.scss'
import Head from 'next/head'
import { Header } from '../modules/Header'

function Stats({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default Stats
