import { useEffect, useState } from 'react';
import { getEndpoint } from '../get'
import JSONPretty from 'react-json-pretty';

var didApplyListeners = false;

export default function Wrapper() {



  let [data, setData] = useState(<> </>)
  let [didReq, setDidReq] = useState<boolean>(false)
  let [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  })





  function ReqToDOM(type, data?) {
    if (type === 'noslash') return setData(
      <p> the endpoint needs to be prefixed with a slash! </p>
    )

    if (data) setData(
      <>
        <span className="res-status" style={{ color: data.status.toString().startsWith(2) ? '#BFFF00' : data.status.toString().startsWith(3) ? '#FFA500' : 'FF0000' }} > {data.status} </span>
        <span className="res-statusText" > {data.statusText} </span>

        <div className="res-body">
          <JSONPretty
            data={data.data}
            id="res-body-json"
          />
        </div>

      </>
    )
  }

  if (loading) return <p> loading </p>

  if (!loading) {
    setTimeout(() => {
      let input: HTMLInputElement = document.getElementById('endpoint') as any;
      let auth: HTMLInputElement = document.getElementById('auth') as any
      let button = document.getElementById('go-button');
      if (!didApplyListeners) {
        console.log('applying listeners')
        didApplyListeners = true;
        button.addEventListener('click', () => {
          getEndpoint(input.value, auth.value, ReqToDOM, didReq, setDidReq)
        })
      }
    }, 200)
  }

  if (!loading) {



    return (
      <div id="apiwrapper">



        <div id="main">
          <div className="center mainwrapper">
            <h2> API Wrapper </h2>
            <p> Enter an endpoint or select one from the list </p>

            <p className="tip"> The Input is already prefixed with "https://api.reefraid.com/v1" </p>

            <p> Example: <span className="highlight"> /users/477095216327950347 </span> </p>

            <input
              id="auth"
              placeholder="Authentication Token"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
            />

            <input
              id="endpoint"
              placeholder="Endpoint"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"

            />


            <button id="go-button" onClick={() => { document.getElementById('go-button').classList.add('active') }}>
              <span className="text">Run Query</span>
            </button>
          </div>


          <div id="output">
            {
              data
            }
          </div>


        </div>
      </div>
    )

  }


}
