import './App.css';
import Loader from 'react-loader-spinner';
import { useEffect, useState } from 'react';

function App() {
  const [request, setRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:3010')
      .then(response => response.json())
      .then(data => {
        setTimeout(() => {
          setRequest(data);
          setIsLoading(false);
        }, 2000);
      })
  }, [])

  const content = request ? (<p>The returned consumer key is {request.consumer_key}</p>) : null;
  const loading = (
      <p>
        <Loader type="Oval" height="100" width="100" color="#2BAD60"/>
      </p>)
  return (
    <div className="App">
      {content}
      {isLoading && loading}
    </div>
  );
}

export default App;
