import Head from 'next/head'
import { Header } from '../modules/Header'
import { HomeFrontLogo } from '../modules/HomeFrontLogo'

export default function Home() {
  return (
    <div>
      <HomeFrontLogo />
      <div
        style={{
          marginTop: '300px',
          display: 'grid',
          justifyContent: 'center',
          color: '#dedede',
          textAlign: 'center'
        }}
      >
        <h1> I DONT KNOW WHAT TO PUT HERE</h1>
        <p> take this </p>
      </div>
    </div>
  )
}
