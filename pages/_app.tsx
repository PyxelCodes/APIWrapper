import '../styles/globals.css'
import '../styles/Wrapper.css'
import '../styles/button.css'
import 'react-json-pretty/themes/monikai.css';

function APIWrapper({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default APIWrapper
