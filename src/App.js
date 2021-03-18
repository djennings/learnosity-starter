import './App.css';
import Loader from 'react-loader-spinner';
import { useEffect, useState } from 'react';
import Learnosity from 'learnosity-sdk-nodejs';

function App() {
  const learnositySdk = new Learnosity();
  const [request, setRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [security, setSecurity] = useState();

  useEffect(() => {
    console.clear()
    setIsLoading(true);

    const myHeaders = new Headers();
    myHeaders.append('x-session-token', 'r:85f8bbd0494c6669055ac7e604ad0ade');

    fetch('http://localhost:3000/dev/learnosity/getAuth', {headers: myHeaders})
      .then(response => response.json())
      .then(data => {
        setTimeout(() => {
          setSecurity(data.auth.security);
          setIsLoading(false);
        }, 2000);
      })
      .catch((err) => {
        setIsLoading(false);
      })
  }, [])

  useEffect(() => {
    if (security) {
      setRequest(learnositySdk.init(
        // service type
        "questions",

        // security details
        security,

        // secret
        "74c5fd430cf1242a527f6223aebd42d30464be22",

        // request details
        {
          "type":       "local_practice",
          "state":      "initial",
          "questions":  [
            {
              "response_id":         "60005",
              "type":                "association",
              "stimulus":            "Match the cities to the parent nation.",
              "stimulus_list":       ["London", "Dublin", "Paris", "Sydney"],
              "possible_responses":  ["Australia", "France", "Ireland", "England"],
              "validation": {
              "score": 1,
                  "value": ["England", "Ireland", "France", "Australia"]
              }
            }
          ]
        }
      ));
    }
  // TODO probably no reason so really fix this as this is disposable code
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [security]);

  // const content = request ? learnositySdk.init(JSON.stringify(request)) : null;
  const loading = (<Loader type="Oval" height="100" width="100" color="#2BAD60"/>)
  console.log({request})
  return (
    <div className="App">
      {/* {content} */}
      {isLoading && loading}
    </div>
  );
}

export default App;
