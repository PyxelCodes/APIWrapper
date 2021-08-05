import Routes from './config/RoutesConfig';
import { useState } from 'react'
import './styles/App.css'
import './styles/404.css'

const App = () => {
  (window as any).X_REQ_HEADERS = { Authorization: 'Kc_tvYEzwCgU8Asi5JFFSkAj' }
  window.current = {
    fetch: {
      hook: useState<any>({}),
      data: null,
      type: ''
    },

  }
  return (
    <Routes />
  );
}

export default App;
