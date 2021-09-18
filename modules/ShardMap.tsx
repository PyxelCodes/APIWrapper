import { Status } from './App'
import { Shard } from './Shard'

export const ShardMap = ({ status }: { status: Status }) => {
  let onlineshards = 0
  let warnShards = 0
  status.shards.forEach((x) => {
    if (x.status === 0) onlineshards++
    if (x.status === 1) warnShards++
  })

  let workingPerc = ((onlineshards + warnShards) / status.shards.length) * 100

  if(status.totalShards == null) return (
    <div id="shardmap">
    <h2> Service: { status.service } </h2>
    <h3
      className={`bg-${
        workingPerc < 25 ? 'error' : workingPerc < 50 ? 'warning' : 'success'
      }`}
    >
      0 / 0 shards
    </h3>
    <h4 className="has-text-gray">
      This Service has never booted on the StatusHost
    </h4>
  </div>
  )

  return (
    <div id="shardmap">
      <h2> Service: { status.service } </h2>
      <h3
        className={`bg-${
          workingPerc < 25 ? 'error' : workingPerc < 50 ? 'warning' : 'success'
        }`}
      >
        {onlineshards} / {status.totalShards} shards
      </h3>
      <h4 className="has-text-gray">
        {status.totalShards - onlineshards} Shards are experiencing issues right
        now
      </h4>
      <div className="shard-grid">
        {status.shards?.map((shard) => {
          return <Shard d={shard} />
        })}
      </div>
    </div>
  )
}
