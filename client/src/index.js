import './App.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import { AuthStore } from './contexts/AuthContext'
import { PostContext } from './contexts/PostContext'
import { CategoryContext } from './contexts/CategoryContext'
// Time ago
import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
JavascriptTimeAgo.locale(en)

ReactDOM.render(<AuthStore><CategoryContext><PostContext><BrowserRouter><App /></BrowserRouter></PostContext></CategoryContext></AuthStore>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
