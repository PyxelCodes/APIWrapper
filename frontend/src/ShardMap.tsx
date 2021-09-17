import { Status } from './App'
import { Shard } from './Shard'

export const ShardMap = ({ status }: { status: Status }) => {
  let onlineshards = 0
  status.shards?.forEach((x) => {
    if (x.status === 0) onlineshards++
  })
  return (
    <div id="shardmap">
      <h1> Service: ReefRaid </h1>
      <h2 className="bg-success">
        {onlineshards} / {status.shardCount} shards
      </h2>
      <div className="shard-grid">
          {
              status.shards?.map(shard => {
                  return <Shard d={shard}/>
              })
          }
      </div>
    </div>
  )
}
