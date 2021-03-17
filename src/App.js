import './App.css';
import { useState } from 'react';

function App() {
  const [request, setRequest] = useState(null);
  const sendRequest = (e) => {
    fetch('http://localhost:3000')
      .then(response => response.json())
      .then(data => setRequest(data))
  }
  return (
    <div className="App">
      <button onClick={sendRequest}>Send a request</button>
      {request && (<p>The returned consumer key is {request.consumer_key}</p>)}
    </div>
  );
}

export default App;
