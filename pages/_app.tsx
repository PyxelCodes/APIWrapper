import '../styles/globals.css'
import '../styles/Wrapper.css'
import '../styles/button.css'
import 'react-json-pretty/themes/monikai.css';
import '../styles/new.css'
import Head from 'next/head'


function APIWrapper({ Component, pageProps }) {
  return (
    <>

      <Head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
      </Head>

      <Component {...pageProps} />

    </>
  )
}

export default APIWrapper
