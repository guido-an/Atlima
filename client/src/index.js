import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter} from 'react-router-dom'
import { AuthStore } from './contexts/AuthContext';
import { PostContext } from './contexts/PostContext';
import './App.scss';

ReactDOM.render(<AuthStore><PostContext><BrowserRouter><App /></BrowserRouter></PostContext></AuthStore>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
