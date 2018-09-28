import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import App from './App';
import stepsApp from './reducers';
import registerServiceWorker from './registerServiceWorker';

let store = createStore(stepsApp)

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
registerServiceWorker();