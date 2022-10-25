import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import App from './App'
import reducers from './reducers'
import './index.css'
// import {GoogleOAuthProvider} from '@react-oauth/google'

const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
   <Provider store={store}>
      {/* skipping google auth for now */}
      {/* <GoogleOAuthProvider clientId={`${process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>    */}
         <App/>
      {/* </GoogleOAuthProvider> */}
   </Provider>,
document.getElementById('root')
);
