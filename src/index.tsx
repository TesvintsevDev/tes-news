import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@app/common.css';
import { initializeAPI } from '@app/api';
import { App } from '@app/components/App/App';
import { AuthContextProvider } from '@features/auth/AuthContextProvider';
import { store } from '@app/store';
import { NetworkStatusContextProvider } from '@features/networkStatus/NetworkStatusContextProvider';
const firebaseApp = initializeAPI();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/sw.js?')
      .then(function () {
        console.log('Service Worker Registered!!');
      })
      .catch((e) => console.error('cant register SW', e));
  });
}

ReactDOM.render(
  <Provider store={store}>
    <NetworkStatusContextProvider>
      <AuthContextProvider firebaseApp={firebaseApp}>
        <Router>
          <App />
        </Router>
      </AuthContextProvider>
    </NetworkStatusContextProvider>
  </Provider>,
  document.getElementById('root')
);
