import Loader from 'react-loader-spinner';
import { useEffect, useState } from 'react';

import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [itemsApp, setItemsApp] = useState();
  const [testReady, setTestReady] = useState(false);

  const initLearnosity = (security) => {
    setItemsApp(window.LearnosityItems.init(security));
    console.log({itemsApp})
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
  // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (itemsApp) {
      itemsApp.on('test:ready', () => {
        setTestReady(true);
      })
    }
  }, [itemsApp])

  const renderLoading = () => {
    console.log('renderLoading')
    return (<Loader type="ThreeDots" className="loader" height="100" width="100" color="gray"/>)
  }

  const seeModal = () =>{
    const itemsCount = Object.keys(itemsApp.getItems()).length;
    const attemptedLength = itemsApp.attemptedItems().length;
   
    itemsApp.assessApp().dialogs().custom.show({
      "header": "How far to go!!!!",
      "body": `${itemsCount - attemptedLength} of ${itemsCount} items have not been attempted`,
      "buttons": [
          {
              "button_id": "my_primary_button",
              "label": "Keep going!",
              "is_primary": true
          }
      ]
    });

    itemsApp.assessApp().on('button:my_primary_button:clicked', function () {
      itemsApp.assessApp().dialogs().custom.hide();
    });
  }

  if (isLoading) return renderLoading();
  return (
    <div className="App">
      <h1>
        Sample assessment
        {testReady ? (<div>
          <button onClick={seeModal}>See a modal</button>
        </div>) : null}
      </h1>
      <div id="learnosity_assess"></div>
    </div>
  );
}

export default App;
