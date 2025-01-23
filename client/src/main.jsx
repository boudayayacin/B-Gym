import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css' 
import 'bootstrap/dist/js/bootstrap.bundle.js' 
import './index.css'
import { Provider } from 'react-redux'
import {store} from './store'
ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
    <App />
    </Provider>
)
