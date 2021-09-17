import { Shard as ShardType } from './App'
import ReactTooltip from 'react-tooltip'

function displayGold(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function convertMs(s: number) {
  var ms = s % 1000
  s = (s - ms) / 1000
  var secs = s % 60
  s = (s - secs) / 60
  var mins = s % 60
  var hrs = (s - mins) / 60

  if (hrs > 0) {
    if (mins === 0) {
      return `${hrs}h`
    } else {
      return `${hrs}h ${mins}m`
    }
  } else if (mins > 0) {
    if (secs === 0) {
      return `${mins}m`
    } else {
      return `${mins}m ${secs}s`
    }
  } else {
    if (secs === 0) {
      return `${Math.round((ms / 1000) * 10) / 10}s`
    } else {
      return `${secs}sec`
    }
  }
}

export const Shard = ({ d }: { d: ShardType }) => {
  return (
    <div>
      <div
        data-tip="true"
        data-for={`reefraid-shard-${d.id}`}
        className="shard bg-success"
      >
        {d.id}
      </div>
      <ReactTooltip id={`reefraid-shard-${d.id}`}>
        <h3> Shard {d.id}</h3>
        <p>
          <strong> 0 guild(s) unavailable </strong>
        </p>
        <p>Uptime: {convertMs(d.uptime)}</p>
        <p>{displayGold(d.guilds)} guilds</p>
      </ReactTooltip>
    </div>
  )
}
