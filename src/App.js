import './App.css';
import Loader from 'react-loader-spinner';
import { useEffect, useState } from 'react';
import Learnosity from 'learnosity-sdk-nodejs';

function App() {
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
        setSecurity(data.auth.security);
        setIsLoading(false);

      })
      .catch((err) => {
        setIsLoading(false);
      })
  }, [])

  useEffect(() => {
    if (security) {
      const learnositySdk = new Learnosity();
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
  }, [security]);

  window.LearnosityItems.init(JSON.stringify(request));
  const loading = (<Loader type="Oval" height="100" width="100" color="#2BAD60"/>)
  return (
    <div className="App">
      <div id="learnosity_assess"></div>
      {isLoading && loading}
    </div>
  );
}

export default App;
