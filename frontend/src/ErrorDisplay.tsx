export const ErrorDisplay = ({ e }: { e: Error }) => {
  return (
    <div id="e-display">
      <h1 className="bg-error"> Oops! an Error has occured </h1>
      <h3> {e.message}</h3>

      {e.message === 'Request failed with status code 429' ? (
        <p className="has-text-gray">
          A 429 Error means that you exceeded the Ratelimit
          <br />
          <br />
          you spammed too much.
        </p>
      ) : null}
    </div>
  )
}
