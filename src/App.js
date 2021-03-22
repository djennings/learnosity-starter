import Loader from 'react-loader-spinner';
import { useEffect, useState } from 'react';

import './App.css';


function App() {
  const [isLoading, setIsLoading] = useState(true);

  const initLearnosity = (security) => {
    window.LearnosityItems.init(security);
  }

  useEffect(() => {
    const headers = new Headers();
    headers.append('x-session-token', 'r:85f8bbd0494c6669055ac7e604ad0ade');

    fetch('http://localhost:3000/dev/learnosity/getAuth', {headers: headers})
      .then(response => response.json())
      .then(data => {
        console.log('security', data)
        setIsLoading(false);
        initLearnosity(data.auth)
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      })
  }, [])

  const renderLoading = () => {
    console.log('renderLoading')
    return (<Loader type="ThreeDots" className="loader" height="100" width="100" color="gray"/>)
  }

  if (isLoading) return renderLoading();
  return (
    <div className="App">
      <h1>Sample assessment</h1>
      <div id="learnosity_assess"></div>
    </div>
  );
}

export default App;
