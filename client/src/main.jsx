import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import App from './App.jsx'

import reducers from './reducers/index.js';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import './index.css'

const store = createStore(reducers, {}, applyMiddleware(thunk));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
