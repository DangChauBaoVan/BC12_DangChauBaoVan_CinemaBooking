import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'jquery/dist/jquery';
import 'popper.js/dist/umd/popper';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store, persistor } from 'store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import * as signalR from '@microsoft/signalr';

export const connection = new signalR.HubConnectionBuilder().withUrl("http://movieapi.cyberlearn.vn/DatVeHub").configureLogging(signalR.LogLevel.Information).build();
connection.start().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
  
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}).catch(errors =>{
  console.log("LỗiCÀI ĐẶT")
})



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
