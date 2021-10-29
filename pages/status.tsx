export default function Status() {
  return (
    <main>
      <div className="status-header">
        <h1> Status </h1>
        <p className="refresh-info">
          This page auto refreshes every 15 seconds
        </p>
        <h1> Availability per service </h1>
        <div className="legend-wrapper">
          <div className="legend status-success">
            <span className="legend-marker"></span>Operational
          </div>
          <div className="legend status-warning">
            <span className="legend-marker"></span>Partial Outage
          </div>
          <div className="legend status-error">
            <span className="legend-marker"></span>Major Outage
          </div>
        </div>
      </div>
    </main>
  )
}
