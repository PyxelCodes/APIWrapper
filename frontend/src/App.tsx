import axios from 'axios'
import { useEffect, useState } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'
import { ShardMap } from './ShardMap'
import { ErrorDisplay } from './ErrorDisplay'
export interface Shard {
  env: 'prod'
  ping: number
  uptime: number
  guilds: number
  status: number
  started: number
  id: number
}
export interface Status {
  shards?: Shard[]
  shardCount?: number
  name?: 'prod'
  displayName?: 'ReefRaid'
}
const App = () => {
  let [status, setStatus] = useState<Status>({})
  let [loading, setLoading] = useState<boolean>(true)
  let [error, setError] = useState<any>({})
  useEffect(() => {
    axios
      .get('https://api.reefraid.com/v2/status')
      .then(({ data }) => {
        setStatus(data)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        setError(err)
      })

    let interval = setInterval(() => {
      // 25seconds update interval
      let update = document.getElementById('update')

      if (update) {
        update.innerText = 'updating...'
      }

      axios
        .get('https://api.reefraid.com/v2/status')
        .then(({ data }) => {
          setStatus(data)
          setLoading(false)
          if (update)
            update.innerHTML = 'This page auto refreshes every 25 seconds'
        })
        .catch((err) => {
          setLoading(false)
          setError(err)
        })
    }, 25000)

    return () => clearInterval(interval)
  }, [])

  return (
    <footer id="app">
      <Header />
      <main>
        <div id="status-header">
          <h1> Status </h1>
          <p id="update"> This page auto refreshes every 25 seconds </p>
          <h1> Availability per service </h1>
          <div className="legend-wrapper">
            <div className="legend bg-success">
              <span className="legend-marker"></span>Operational
            </div>
            <div className="legend bg-warning">
              <span className="legend-marker"></span>Partial Outage
            </div>
            <div className="legend bg-error">
              <span className="legend-marker"></span>Major Outage
            </div>
          </div>
        </div>
        {!loading &&
          (error.message ? <ErrorDisplay e={error} /> : <ShardMap status={status} />)}
      </main>
      <Footer />
    </footer>
  )
}

export default App
